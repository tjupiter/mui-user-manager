import { TableHead, TableRow, TableCell } from "@mui/material";
// types
interface Props {
  headLabel: any[];
}
const tableHeadSx = {
  backgroundColor: "lightblue",
  "& th:first-child": {
    borderRadius: "1em 0 0 0",
  },
  "& th:last-child": {
    borderRadius: "0 1em 0 0",
  },
};

export default function TableCustomHead({ headLabel }: Props) {
  return (
    <TableHead>
      <TableRow sx={tableHeadSx}>
        {headLabel.map((headCell, index) => (
          <TableCell key={index}>{headCell.label}</TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
