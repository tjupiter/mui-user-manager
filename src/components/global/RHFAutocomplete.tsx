import { ReactNode } from "react";
// form
import { useFormContext, Controller } from "react-hook-form";
// mui
import {
  Autocomplete,
  AutocompleteGetTagProps,
  AutocompleteRenderOptionState,
  Avatar,
  Input,
  InputAdornment,
  SxProps,
  TextField,
} from "@mui/material";
// types

type TextFieldVariants = "filled" | "outlined" | "standard" | undefined;

interface Props {
  name: string;
  label: string;
  options: string[];
  defaultValue: string | string[];
  renderOption?: (
    props: React.HTMLAttributes<HTMLLIElement>,
    option: any,
    state: AutocompleteRenderOptionState
  ) => ReactNode;
  renderTags?: (
    value: any[],
    getTagProps: AutocompleteGetTagProps
  ) => ReactNode;
  placeHolder?: string;
  disableCloseOnSelect?: boolean;
  filterSelectedOptions?: boolean;
  limitTags?: number;
  filterOptions?: any;
  multiple?: boolean;
  isOptionEqualToValue?: any;
  renderInput?: any;
  noOptionsText?: string;
  getOptionLabel?: any;
  avatarIcon?: string;
  textFieldVariant?: TextFieldVariants;
  sx: SxProps;
}

export default function RHFAutocomplete({
  name,
  label,
  disableCloseOnSelect = true,
  filterOptions,
  filterSelectedOptions = true,
  limitTags = -1,
  multiple = false,
  defaultValue = multiple ? [] : "",
  options,
  renderOption,
  renderTags,
  placeHolder,
  isOptionEqualToValue = (option: { id: number }, value: { id: number }) =>
    option.id === value.id,
  renderInput,
  noOptionsText = "No such option",
  getOptionLabel,
  avatarIcon,
  sx,
  textFieldVariant = "standard",
  ...other
}: Props) {
  const { control } = useFormContext();
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <Autocomplete
          isOptionEqualToValue={isOptionEqualToValue}
          filterOptions={filterOptions}
          fullWidth
          multiple={multiple}
          limitTags={limitTags}
          disableCloseOnSelect={disableCloseOnSelect}
          filterSelectedOptions={filterSelectedOptions}
          options={options}
          onChange={(e, newValue) => onChange(newValue)}
          renderOption={renderOption}
          renderTags={renderTags}
          value={value}
          noOptionsText={noOptionsText}
          getOptionLabel={getOptionLabel}
          sx={{ ...sx }}
          renderInput={(params) => {
            !!params.inputProps.value &&
              !!avatarIcon &&
              !!value &&
              (params.InputProps.startAdornment = (
                <>
                  <InputAdornment position='start'>
                    <Avatar src={value[avatarIcon]} />
                  </InputAdornment>{" "}
                </>
              ));
            return (
              <TextField
                {...params}
                error={!!error}
                helperText={error?.message}
                label={label}
                placeholder={placeHolder}
                variant={textFieldVariant}
                fullWidth
              />
            );
          }}
        />
      )}
    />
  );
}
