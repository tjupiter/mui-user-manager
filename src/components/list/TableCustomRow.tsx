import { useState, MouseEvent } from "react";
//mui
import { IconButton, TableRow, TableCell, MenuItem } from "@mui/material";
// components
import { AlertDialog, Iconify } from "..";
// utils
import useToggle from "../../utils/custom-hooks/useToggle";
// types
import { User } from "../../types";
import TableMoreMenu from "./TableMoreMenu";

interface Props {
  row: User;
  onDeleteRow: VoidFunction;
  onEditRow: VoidFunction;
}

export default function TableCustomRow({ row, onDeleteRow, onEditRow }: Props) {
  const { firstName, lastName, age, email, phone, company } = row;

  const RowHoverSx = {
    px: 10,
    "&:hover": {
      backgroundColor: "lightblue",
    },
  };

  // ==================================
  //            3DOT MENU
  // ==================================

  const [openMenu, setOpenMenuActions] = useState<HTMLElement | null>(null);

  const handleOpenMenu = (event: MouseEvent<HTMLElement>) => {
    setOpenMenuActions(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setOpenMenuActions(null);
  };

  // ==================================
  //           DIALOG STATES
  // ==================================
  const {
    toggle: isDialogOpen,
    onOpen: openDialog,
    onClose: closeDialog,
  } = useToggle();
  // ==================================
  // ==================================
  return (
    <>
      {isDialogOpen && (
        <AlertDialog
          dialogTitle='Delete user'
          dialogText={`Are you sure you want to delete this user ${firstName} ${lastName}`}
          dialogAgree={onDeleteRow}
          dialogDisagree={closeDialog}
          isDialogOpen={isDialogOpen}
          handleCloseDialog={closeDialog}
          agreeButtonText='Delete'
          disagreeButtonText='Cancel'
          agreeButtonColor='error'
          disagreeButtonColor='inherit'
        />
      )}

      <TableRow sx={RowHoverSx}>
        <TableCell>
          {firstName} {lastName}
        </TableCell>
        <TableCell>{age}</TableCell>
        <TableCell>{email}</TableCell>
        <TableCell>{phone}</TableCell>
        <TableCell>{company.name}</TableCell>
        <TableCell>{company.department}</TableCell>
        <TableCell>
          <TableMoreMenu
            open={openMenu}
            onOpen={handleOpenMenu}
            onClose={handleCloseMenu}
            actions={
              <>
                <MenuItem
                  onClick={() => {
                    onEditRow();
                    handleCloseMenu();
                  }}
                >
                  <Iconify icon={"material-symbols:edit-outline-rounded"} />
                  Edit
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    openDialog();
                    handleCloseMenu();
                  }}
                  sx={{ color: "error.main" }}
                >
                  <Iconify icon={"ph:trash-duotone"} />
                  Delete
                </MenuItem>
              </>
            }
          />
        </TableCell>
      </TableRow>
    </>
  );
}
