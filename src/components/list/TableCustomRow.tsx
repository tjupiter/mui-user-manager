//mui
import { TableRow, TableCell, Tab } from "@mui/material";
// types
import { User } from "../../types";

interface Props {
  row: User;
}

export default function TableCustomRow({ row }: Props) {
  const { firstName, lastName, age, email, phone, company } = row;
  return (
    <TableRow>
      <TableCell>
        {firstName} {lastName}
      </TableCell>
      <TableCell>{age}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{phone}</TableCell>
      <TableCell>{company.name}</TableCell>
      <TableCell>{company.department}</TableCell>
    </TableRow>
  );
}
