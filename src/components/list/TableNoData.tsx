import { TableRow, TableCell, Typography } from "@mui/material";

export default function TableNoData({ title }: { title: string }) {
  return (
    <TableRow>
      <TableCell colSpan={9} align='center'>
        <Typography fontWeight={800} fontSize={32} letterSpacing={2}>
          {title}
        </Typography>
      </TableCell>
    </TableRow>
  );
}
