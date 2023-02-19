import { TablePagination } from "@mui/material";
import { useEffect, useState } from "react";

interface PaginationPropos {
  totalCount: number;
  getPage: (currentPage: number, rowsPerPage: number) => void;
}

export const Pagination: React.FC<PaginationPropos> = ({ totalCount, getPage }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(20);

  const handleChangePage = ( event: React.MouseEvent<HTMLButtonElement> | null, newPage: number) => {
    setCurrentPage(newPage);
  };

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setRowsPerPage(parseInt(event.target.value));
    setCurrentPage(0);
  };

  useEffect(() => {
    getPage(currentPage, rowsPerPage)
  }, [currentPage, rowsPerPage, getPage])

  return (
    <TablePagination
      rowsPerPageOptions={[10, 20, 50, 100]}
      component="div"
      count={totalCount}
      page={currentPage}
      rowsPerPage={rowsPerPage}
      onPageChange={handleChangePage}
      onRowsPerPageChange={handleChangeRowsPerPage}
    />
  );
};
