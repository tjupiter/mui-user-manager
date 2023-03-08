// mui
import { Breadcrumbs, Stack, Typography } from "@mui/material";
// components
import Iconify from "../global/Iconify";
// type

interface Props {
  heading: string;
  breadcrumbs?: any[];
}

export default function HeaderBreadCrumbs({
  heading,
  breadcrumbs = [],
}: Props) {
  return (
    <Stack spacing={1} sx={{ py: 1, mb: 3 }}>
      <Typography fontSize={24} fontWeight={700}>
        {heading}
      </Typography>

      <Breadcrumbs
        separator={<Iconify icon='uil:angle-double-right' />}
        aria-label='breadcrumb'
      >
        {breadcrumbs}
      </Breadcrumbs>
    </Stack>
  );
}
