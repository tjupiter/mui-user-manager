import { TableHead, TableRow, TableCell } from "@mui/material";
// types
interface Props {
  headLabel: any[];
}
const tableHeadSx = {
  backgroundColor: "rgba(192, 228, 245, 1)",
  "& th:first-of-type": {
    borderRadius: "1em 0 0 0",
  },
  "& th:last-of-type": {
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
