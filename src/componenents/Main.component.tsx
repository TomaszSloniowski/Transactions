import { Grid } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { TransactionsTable } from "./TransactionsTable.component";
import { AlertType, Transaction } from "../types/Transactions.types";
import { Searchbar } from "./Searchbar.component";
import { AddTransaction } from "./AddTransaction";
import { Pagination } from "./Pagination.component";
import { AlertSnackbar } from "./Alert.components";
import classes from "./Main.module.css";

export const Main = () => {
  const [data, setData] = useState<Transaction[]>([]);
  const [filteredData, setfilteredData] = useState<Transaction[]>([]);
  const [rows, setRows] = useState<Transaction[]>([]);
  const [beneficiary, setBeneficiary] = useState<string>("");
  const [isAlertSnackbarOpen, seIsAlertSnackbarOpen] = useState<boolean>(false);
  const [alertType, setAlertType] = useState<AlertType | undefined>(undefined);

  const getTransactions = () => {
    fetch("http://localhost:3000/transactions")
      .then((response) => response.json())
      .then(
        (data) => {
          if (data) {
            setData(data);
          }
        },
        () => {
          setAlertType(AlertType.error);
        }
      );
  };

  const addTransaction = (value: Transaction) => {
    fetch("http://localhost:3000/transactions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(value),
    })
      .then(
        (data) => {
          if (data) {
            setAlertType(AlertType.success);
            getTransactions();
          }
        },
        () => {
          setAlertType(AlertType.error);
        }
      )
      .finally(() => {
        seIsAlertSnackbarOpen(true);
      });
  };

  const deleteTransaction = (value: Transaction) => {
    fetch(`http://localhost:3000/transactions/${value.id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then(
        () => {
          setAlertType(AlertType.success);
          getTransactions();
        },
        () => {
          setAlertType(AlertType.error);
        }
      )
      .finally(() => {
        seIsAlertSnackbarOpen(true);
      });
  };

  useEffect(() => {
    getTransactions();
  }, []);

  const handleChangeBeneficiary = (value: string) => {
    setBeneficiary(value);
  };

  const handleAddTransaction = (value: Transaction) => {
    console.log(value);
    value.id = data.length.toString();
    addTransaction(value);
  };

  const handleDeleteTransaction = (row: Transaction) => {
    deleteTransaction(row);
  };

  useEffect(() => {
    if (beneficiary !== "") {
      const filteredTransactions = data.filter(
        (e) => e.beneficiary && e.beneficiary.toLowerCase().includes(beneficiary)
      );
      setfilteredData(filteredTransactions);
    } else setfilteredData(data);
  }, [beneficiary, filteredData, data]);

  const getPage = useCallback(
    (currentPage: number, rowsPerPage: number) => {
      setRows([...filteredData]);
      const firstRow = currentPage === 0 ? currentPage : currentPage * rowsPerPage;
      const page = filteredData.slice(firstRow, firstRow + rowsPerPage);
      setRows(page);
    },
    [filteredData]
  );

  const getTotalCount = (): number => {
    return filteredData.length ? filteredData.length : rows.length ? data.length : 0;
  };

  return (
    <div className={classes.mainDiv}>
      <Grid container xs={12}>
        <Grid item xs={4} className={classes.filterContainer}>
          <Searchbar onChange={handleChangeBeneficiary} value={beneficiary} />
        </Grid>
        <Grid item xs={8} className={classes.formContainer}>
          <AddTransaction onChange={handleAddTransaction} value={beneficiary} />
        </Grid>
        <Grid item xs={12} className={classes.tableContainer}>
          <TransactionsTable rows={rows} handleDeleteTransaction={handleDeleteTransaction} />
        </Grid>
        <Grid item xs={12} className={classes.pagination}>
          <Pagination getPage={getPage} totalCount={getTotalCount()} />
        </Grid>
      </Grid>
      <AlertSnackbar open={isAlertSnackbarOpen} onClose={() => seIsAlertSnackbarOpen(false)} type={alertType} />
    </div>
  );
};
