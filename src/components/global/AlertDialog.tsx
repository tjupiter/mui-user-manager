// mui
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
// type
import { ButtonColors } from "../../types";

type Props = {
  dialogTitle: string;
  dialogText: string;
  dialogDisagree: VoidFunction;
  dialogAgree: VoidFunction;
  handleCloseDialog: (
    // eslint-disable-next-line
    event?: {},
    reason?: "backdropClick" | "escapeKeyDown"
  ) => void;
  isDialogOpen: boolean;
  agreeButtonText?: string;
  disagreeButtonText?: string;
  agreeButtonColor?: ButtonColors;
  disagreeButtonColor?: ButtonColors;
};

// ===================================

export default function AlertDialog({
  dialogTitle,
  dialogText,
  dialogDisagree,
  dialogAgree,
  handleCloseDialog,
  isDialogOpen,
  agreeButtonText,
  disagreeButtonText,
  agreeButtonColor,
  disagreeButtonColor,
}: Props) {
  const handleDisagree = () => {
    handleCloseDialog();
    dialogDisagree();
  };
  const handleAgree = () => {
    handleCloseDialog();
    dialogAgree();
  };

  // ===================================

  return (
    <Dialog
      open={isDialogOpen}
      onClose={handleCloseDialog}
      aria-labelledby='alert-dialog-title'
      aria-describedby='alert-dialog-description'
      fullWidth
      maxWidth='sm'
    >
      <Box>
        <DialogTitle id='alert-dialog-title'>
          <Typography fontWeight={700} fontSize={22}>
            {dialogTitle}
          </Typography>
        </DialogTitle>

        <DialogContent>
          <DialogContentText id='alert-dialog-description'>
            {dialogText}
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button onClick={handleDisagree} color={disagreeButtonColor}>
            {disagreeButtonText ? disagreeButtonText : "Disagree"}
          </Button>
          <Button
            onClick={handleAgree}
            variant='contained'
            color={agreeButtonColor}
            autoFocus
          >
            {agreeButtonText ? agreeButtonText : "Agree"}
          </Button>
        </DialogActions>
      </Box>
    </Dialog>
  );
}
