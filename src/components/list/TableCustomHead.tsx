import { TableHead, TableRow, TableCell } from "@mui/material";
// types
interface Props {
  headLabel: any[];
}

export default function TableCustomHead({ headLabel }: Props) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
