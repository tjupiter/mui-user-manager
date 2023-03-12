// form
import { useFormContext, Controller } from "react-hook-form";
// mui
import { TextField, TextFieldProps } from "@mui/material";

interface Props {
  name: string;
}

export default function RHFTextField({
  name,
  ...other
}: Props & TextFieldProps) {
  const { control } = useFormContext();
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          fullWidth
          error={!!error}
          helperText={error?.message}
          {...other}
        />
      )}
    />
  );
}
