import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Tooltip } from "@mui/material";
import { Transaction } from "../types/Transactions.types";
import classes from "./TransactionsTable.module.css";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";

interface TransactionsTablePropos {
  rows: Transaction[];
  handleDeleteTransaction: (row: Transaction) => void;
}

const columns = [
  {
    id: "1",
    name: "Id",
  },
  {
    id: "2",
    name: "Amount",
  },
  {
    id: "3",
    name: "Beneficiary",
  },
  {
    id: "4",
    name: "Account",
  },
  {
    id: "5",
    name: "Addres",
  },
  {
    id: "6",
    name: "Date",
  },
  {
    id: "7",
    name: "Description",
  },
  {
    id: "8",
    name: "",
  },
];

export const TransactionsTable: React.FC<TransactionsTablePropos> = ({ rows, handleDeleteTransaction }) => {
  return (
    <>
      <TableContainer className={classes.table}>
        <Table>
          <TableHead className={classes.tableHead}>
            <TableRow className={classes.headerRow}>
              {columns.map((column) => (
                <TableCell key={column.id} className={classes.headerCell}>
                  {column.name}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => {
              return (
                <TableRow key={row.id}>
                  <>
                    {Object.values(row).map((value) => (
                      <TableCell key={value} className={classes.bodyCell}>
                        <p>{value}</p>
                      </TableCell>
                    ))}
                    <Tooltip title="Delete transaction">
                      <DeleteOutlinedIcon
                        sx={{ color: "grey", fontSize: "18px", margin: "25px 10px", cursor: "pointer" }}
                        onClick={() => {
                          handleDeleteTransaction(row);
                        }}
                      />
                    </Tooltip>
                  </>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {!rows.length && <div className={classes.noResult}>No records</div>}
    </>
  );
};
