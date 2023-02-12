// mui
import { Box, Link, Typography } from "@mui/material";
import { Breadcrumbs, BreadcrumbsProps } from "@mui/material";

interface Props {
  heading: string;
  breadcrumbs?: any[];
}

export default function HeaderBreadCrumbs({
  heading,
  breadcrumbs = [],
}: Props) {
  return (
    <Box>
      <Box>
        <Typography>{heading}</Typography>
      </Box>
      <Breadcrumbs separator='>' aria-label='breadcrumb'>
        {breadcrumbs}
      </Breadcrumbs>
    </Box>
  );
}
