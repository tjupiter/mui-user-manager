import { useState } from "react";
// @mui
import { Box, InputLabel, Stack, SxProps, TextField } from "@mui/material";
import Select, { SelectChangeEvent } from "@mui/material/Select";
// custom component
import { Iconify } from "..";

interface Props {
  selectOptions: string[];
  sx?: SxProps;
}

export default function TableToolBar({ selectOptions, sx }: Props) {
  const [department, setDepartment] = useState<string>("");

  const handleSelectChange = (event: SelectChangeEvent) => {
    setDepartment(event.target.value);
  };

  return (
    <Stack spacing={2} direction={{ xs: "column", md: "row" }} sx={{ ...sx }}>
      <Box>
        <InputLabel id='department-select-label'>Department</InputLabel>
        <Select
          labelId='department-select-label'
          label='Department'
          value={department}
          onChange={handleSelectChange}
        ></Select>
      </Box>
      <TextField
        fullWidth
        label='Search...'
        placeholder='Search...'
        InputProps={{
          startAdornment: (
            <Iconify
              icon='carbon:search'
              width={30}
              height={30}
              sx={{ pr: 2 }}
            />
          ),
        }}
      />
    </Stack>
  );
}
