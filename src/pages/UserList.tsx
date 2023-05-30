import { useState, useEffect } from "react";
import { useSnackbar } from "notistack";
import { useNavigate, Link as RouterLink } from "react-router-dom";
// mui
import {
  Box,
  Button,
  Card,
  Divider,
  Link,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableContainer,
  TablePagination,
  Typography,
} from "@mui/material";
// custom components
import {
  Iconify,
  HeaderBreadCrumbs,
  TableCustomHead,
  TableCustomRow,
  TableNoData,
  TableToolBar,
} from "../components";
// hooks
import useIsLoading from "../hooks/useIsLoading";
import usePagination from "../hooks/usePagination";
// context + providers
import { useUserAuth } from "../contexts-providers/UserAuthContext";
// API
import { getUsers, getSettings } from "../api";
// redux
import { useDispatch } from "react-redux";
import { setSettingsData } from "../redux/settingsSlice";
// utils + hooks
import { filterTableData } from "../utils";
// types
import { User } from "../types";
// components

export default function UserList() {
  const { isLoading, loadingStarted, loadingFinished } = useIsLoading();

  const [users, setUsers] = useState<User[]>([]);
  const [departmentOptions, setDepartmentOptions] = useState<string[]>(["All"]);
  const [department, setDepartment] = useState<string>("All");
  const [searchfieldValue, setSearchfieldValue] = useState<string>("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const { logOut } = useUserAuth();

  const { page, rowsPerPage, setPage, onChangePage, onChangeRowsPerPage } =
    usePagination();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const [users, settings] = await Promise.all([
          getUsers(),
          getSettings(),
        ]);
        setUsers(users);
        settings.departments.unshift("All");
        setDepartmentOptions(settings.departments);
        dispatch(setSettingsData(settings));
      } catch (error) {
        console.error(error);
        enqueueSnackbar(
          `Whoops, something went wrong here: fetchUsers() \n ${error}`
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
      underline="hover"
      key="1"
      color="inherit"
      href="#"
      onClick={handleClick}
    >
      Home
    </Link>,
    <Link
      underline="hover"
      key="2"
      color="inherit"
      href="/"
      onClick={handleClick}
    >
      Users Management
    </Link>,
    <Typography key="3">Users</Typography>,
  ];

  // ===================================
  //     TABLE CONSTS AND FUNCTIONS
  // ===================================

  const TABLE_HEAD = [
    { id: "firstName", label: "Name", align: "left" },
    { id: "age", label: "Age", align: "left" },
    { id: "email", label: "Email", align: "left" },
    { id: "phone", label: "Phone", align: "left" },
    { id: "company_name", label: "Company Name", align: "left" },
    { id: "company_department", label: "Company Department", align: "left" },
    { id: "3dot-menu" },
  ];

  // ===================================
  //              FILTERING
  // ===================================

  const handleFilterDropdown = (selectedDept: string) => {
    setDepartment(selectedDept);
  };

  const handleSearchfield = (fieldValue: string) => {
    setSearchfieldValue(fieldValue);
    setPage(0);
  };

  const filteredData = filterTableData({
    tableData: users,
    searchFieldValue: searchfieldValue,
    department: department,
  });

  const isNotFound = filteredData.length === 0;

  // ===================================
  //           EDIT / DELETE
  // ===================================

  const handleEditRow = (id: number) => navigate(`/user/${id}/edit`);

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

  // ===================================
  //               LOGOUT
  // ===================================

  const handleLogOut = async () => {
    try {
      await logOut();
      enqueueSnackbar(`Succesfully logged out`);
      navigate("/");
    } catch (error) {
      console.error(error);
      enqueueSnackbar(`Couldn't log out`, { variant: "error" });
    }
  };

  // ===================================

  return (
    <Box sx={{ px: 5 }}>
      <Stack direction="row" alignItems="center" justifyContent="flex-end">
        <Button onClick={() => handleLogOut()}>
          <Iconify icon="eva:power-outline" sx={{ pr: 1 }} />
          Log out
        </Button>
      </Stack>
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <HeaderBreadCrumbs
          heading="User Management"
          breadcrumbs={BREADCRUMBS}
        />
        <Button
          variant="contained"
          component={RouterLink}
          to="/user-management/new"
          startIcon={<Iconify icon={"eva:plus-fill"} />}
        >
          New user
        </Button>
      </Stack>
      <Card
        sx={{
          borderRadius: ".7rem",
          boxShadow: "-2px 7px 20px rgba(0, 0, 0, 0.2)",
          p: 3,
        }}
      >
        <TableContainer>
          {isLoading ? (
            <>
              <Skeleton height={120} width={"100%"}></Skeleton>
              <Divider sx={{ mb: 2 }} />
              {[...new Array(10)].map((_, i) => (
                <Skeleton height={30} width={"100%"} key={i}></Skeleton>
              ))}
            </>
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
                  {filteredData
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((user) => (
                      <TableCustomRow
                        row={user}
                        key={user.id}
                        onEditRow={() => handleEditRow(user.id)}
                        onDeleteRow={() => handleDeleteRow(user.id)}
                      />
                    ))}
                  {isNotFound && <TableNoData title="Not Found" />}
                </TableBody>
              </Table>
            </>
          )}
        </TableContainer>
        <TablePagination
          component="div"
          page={page}
          count={filteredData.length}
          rowsPerPage={rowsPerPage}
          rowsPerPageOptions={[5, 10, 20]}
          onPageChange={onChangePage}
          onRowsPerPageChange={onChangeRowsPerPage}
        />
      </Card>
    </Box>
  );
}
