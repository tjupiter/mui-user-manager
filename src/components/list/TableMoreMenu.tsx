import { MouseEvent, ReactNode } from "react";
// mui
import { IconButton } from "@mui/material";
// components
import { Iconify, MenuPopOver } from "..";
// type

interface Props {
  actions: ReactNode;
  open?: HTMLElement | null;
  onClose?: VoidFunction;
  onOpen?: (event: MouseEvent<HTMLElement>) => void;
}

export default function TableMoreMenu({
  actions,
  open,
  onClose,
  onOpen,
}: Props) {
  return (
    <>
      <IconButton onClick={onOpen}>
        <Iconify icon={"eva:more-vertical-fill"} width={15} height={15} />
      </IconButton>

      <MenuPopOver
        open={Boolean(open)}
        anchorEl={open}
        onClose={onClose}
        anchorOrigin={{ vertical: "top", horizontal: "left" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        arrow='right-top'
        sx={{
          mt: -1,
          width: 160,
          "& .MuiMenuItem-root": {
            px: 1,
            typography: "body2",
            borderRadius: 0.75,
            "& svg": { mr: 2, width: 20, height: 20 },
          },
        }}
      >
        {actions}
      </MenuPopOver>
    </>
  );
}
