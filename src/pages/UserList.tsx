import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
// mui
import {
  Box,
  Link,
  Skeleton,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
// custom components
import { TableToolBar } from "../components";
// hooks
import useIsLoading from "../hooks/useIsLoading";
// API
import { getUsers, getDepartments } from "../api";
// utils
import { filterTableData } from "../utils";
// types
import { User } from "../types";
// components
import {
  HeaderBreadCrumbs,
  TableCustomHead,
  TableCustomRow,
} from "../components";

export default function UserList() {
  const { isLoading, loadingStarted, loadingFinished } = useIsLoading();
  const [users, setUsers] = useState<User[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<string[]>(["All"]);

  const [department, setDepartment] = useState<string>("All");
  const [searchfieldValue, setSearchfieldValue] = useState<string>("");

  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const [users, departments] = await Promise.all([
          getUsers(),
          getDepartments(),
        ]);
        setUsers(users);
        const depOpts = departmentOptions.concat(departments);
        setDepartmentOptions(depOpts);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(
          `Whops, something went wrong here: fetchUsers() \n ${error}`
        );
      }
    }
    fetchUsers().finally(() => loadingFinished());
  }, []);

  console.log(departmentOptions);

  // ===========================================
  //                BREADCRUMBS
  // ===========================================

  function handleClick(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>) {
    event.preventDefault();
    console.info("You clicked a breadcrumb.");
  }

  const BREADCRUMBS = [
    <Link
      underline='hover'
      key='1'
      color='inherit'
      href='#'
      onClick={handleClick}
    >
      Home
    </Link>,
    <Link
      underline='hover'
      key='2'
      color='inherit'
      href='/user-management'
      onClick={handleClick}
    >
      Users Management
    </Link>,
    <Typography key='3' color='text.primary'>
      Users
    </Typography>,
  ];

  // ===========================================
  //         TABLE CONSTS AND FUNCTIONS
  // ===========================================

  const TABLE_HEAD = [
    { id: "firstName", label: "Name", align: "left" },
    { id: "age", label: "Age", align: "left" },
    { id: "email", label: "Email", align: "left" },
    { id: "phone", label: "Phone", align: "left" },
    { id: "company_name", label: "Company Name", align: "left" },
    { id: "company_department", label: "Company Department", align: "left" },
  ];

  // ===========================================
  //                  FILTERING
  // ===========================================

  const handleFilterDropdown = (selectedDept: string) => {
    setDepartment(selectedDept);
  };

  const handleSearchfield = (fieldValue: string) => {
    setSearchfieldValue(fieldValue);
  };

  const filteredData = filterTableData({
    tableData: users,
    searchFieldValue: searchfieldValue,
    department: department,
  });

  return (
    <Box sx={{ px: 5 }}>
      <HeaderBreadCrumbs heading='User Management' breadcrumbs={BREADCRUMBS} />
      <TableContainer>
        {isLoading ? (
          <Skeleton height={300} width={500}></Skeleton>
        ) : (
          <>
            <TableToolBar
              sx={{ p: 2 }}
              selectOptions={departmentOptions}
              searchFieldValue={searchfieldValue}
              filterDropdownValue={department}
              handleFilterDropdown={handleFilterDropdown}
              handleSearchfield={handleSearchfield}
            />
            <Table>
              <TableCustomHead headLabel={TABLE_HEAD} />
              <TableBody>
                {filteredData.map((user) => (
                  <TableCustomRow row={user} key={user.id} />
                ))}
              </TableBody>
            </Table>
          </>
        )}
      </TableContainer>
      <TablePagination
        component='div'
        rowsPerPage={10}
        page={1}
        count={users.length}
        rowsPerPageOptions={[5, 10, 20]}
        onPageChange={() => console.log("onpagechange")}
      />
    </Box>
  );
}
