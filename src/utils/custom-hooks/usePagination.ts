import { useState } from "react";

export type UsePaginationProps = {
  dense: boolean;
  page: number;
  setPage: React.Dispatch<React.SetStateAction<number>>;
  rowsPerPage: number;
  //
  onChangePage: (event: unknown, newPage: number) => void;
  onChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChangeDense: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export type Props = {
  defaultDense?: boolean;
  defaultRowsPerChange?: number;
  defaultCurrentPage?: number;
};

export default function usePagination(props?: Props) {
  const [dense, setDense] = useState(props?.defaultDense ?? false);
  const [page, setPage] = useState(props?.defaultCurrentPage || 0);
  const [rowsPerPage, setRowsPerPage] = useState(
    props?.defaultRowsPerChange || 5
  );
  const onChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };
  const onChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  const onChangeDense = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDense(event.target.checked);
  };

  return {
    dense,
    page,
    rowsPerPage,
    setPage,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
  };
}
