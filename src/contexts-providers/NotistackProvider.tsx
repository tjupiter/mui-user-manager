import { useRef, ReactNode } from "react";
import { SnackbarKey, SnackbarProvider } from "notistack";
// mui
import { IconButton } from "@mui/material";
// components
import { Iconify } from "../components";
// types

type Props = {
  children: ReactNode;
};
console.log("lsddfasdf");
export default function NotistackProvider({ children }: Props) {
  const notistackRef = useRef<any>(null);

  const onClose = (key: SnackbarKey) => {
    notistackRef.current.closeSnackbar(key);
  };

  return (
    <SnackbarProvider
      ref={notistackRef}
      dense
      maxSnack={3}
      variant="info"
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      iconVariant={{
        info: <Iconify icon={"eva:info-fill"} sx={{ pr: 1 }} />,
        success: (
          <Iconify
            icon={"eva:checkmark-circle-2-fill"}
            color="success"
            sx={{ pr: 1 }}
          />
        ),
        warning: (
          <Iconify
            icon={"eva:alert-triangle-fill"}
            color="warning"
            sx={{ pr: 1 }}
          />
        ),
        error: (
          <Iconify
            icon={"eva:alert-circle-fill"}
            color="error"
            sx={{ pr: 1 }}
          />
        ),
      }}
      action={(key) => (
        <IconButton onClick={() => onClose(key)}>
          <Iconify
            icon={"eva:close-fill"}
            width={20}
            height={20}
            color="#fff"
          />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
}
