// @mui
import { MenuItem, Stack, SxProps, TextField } from "@mui/material";
// custom component
import { Iconify } from "..";

interface Props {
  selectOptions: string[];
  sx?: SxProps;
  searchFieldValue: string;
  filterDropdownValue: string;
  handleFilterDropdown: (selectedDept: string) => void;
  handleSearchfield: (fieldValue: string) => void;
}
export default function TableToolBar({
  selectOptions,
  sx,
  searchFieldValue,
  filterDropdownValue,
  handleFilterDropdown,
  handleSearchfield,
}: Props) {
  return (
    <Stack spacing={2} direction={{ xs: "column", md: "row" }} sx={{ ...sx }}>
      <TextField
        sx={{ minWidth: "25%" }}
        label='Department'
        placeholder='Department'
        value={filterDropdownValue}
        defaultValue='All'
        onChange={(e) => handleFilterDropdown(e.target.value)}
        select
      >
        {selectOptions.map((dept, index) => (
          <MenuItem value={dept} key={index}>
            {dept}
          </MenuItem>
        ))}
      </TextField>

      <TextField
        fullWidth
        label='Search...'
        placeholder='Search...'
        value={searchFieldValue}
        onChange={(e) => handleSearchfield(e.target.value)}
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
