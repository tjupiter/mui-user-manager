import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
// mui
import {
  Box,
  Card,
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
  TableNoData,
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
        departments.unshift("All");
        setDepartmentOptions(departments);
      } catch (error) {
        console.error(error);
        enqueueSnackbar(
          `Whops, something went wrong here: fetchUsers() \n ${error}`
        );
      }
    }
    fetchUsers().finally(() => loadingFinished());
  }, []);

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
    { id: "3dot-menu" },
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

  const isNotFound = filteredData.length === 0;

  // ===========================================
  //                EDIT / DELETE
  // ===========================================

  const handleEditRow = (id: number) =>
    window.alert("This function is not available, yet.");

  const handleDeleteRow = (id: number) => {
    const filteredRows = users.filter((user) => user.id !== id);
    setUsers(filteredRows);
    enqueueSnackbar("Succesfully deleted");
    // api call
    // try {
    //   await deleteUser(id);
    //   enqueueSnackbar("Succesfully deleted");
    // } catch (error) {
    //   console.error(error);
    //   enqueueSnackbar(`Something went wrong here: ${error}`, {
    //     variant: "error",
    //   });
    // }
  };

  return (
    <Box sx={{ px: 5 }}>
      <HeaderBreadCrumbs heading='User Management' breadcrumbs={BREADCRUMBS} />
      <Card
        sx={{
          borderRadius: ".7rem",
          boxShadow: "-2px 7px 20px rgba(0, 0, 0, 0.2)",
          p: 3,
        }}
      >
        <TableContainer>
          {isLoading ? (
            <Skeleton height={300} width={500}></Skeleton>
          ) : (
            <>
              <TableToolBar
                sx={{ p: 2, mb: 3 }}
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
                    <TableCustomRow
                      row={user}
                      key={user.id}
                      onEditRow={() => handleEditRow(user.id)}
                      onDeleteRow={() => handleDeleteRow(user.id)}
                    />
                  ))}
                  {isNotFound && <TableNoData title='Not Found' />}
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
      </Card>
    </Box>
  );
}
