import { useState, useEffect } from "react";
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
// hooks
import useIsLoading from "../hooks/useIsLoading";
// API
import { getUsers } from "../api";
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

  useEffect(() => {
    async function fetchUsers() {
      try {
        const users = await getUsers();
        setUsers(users);
        loadingFinished();
      } catch (error) {
        console.error(error);
      }
    }
    fetchUsers();
  }, []);

  const TABLE_HEAD = [
    { id: "firstName", label: "First Name", align: "left" },
    { id: "age", label: "Age", align: "left" },
    { id: "email", label: "Email", align: "left" },
    { id: "phone", label: "Phone", align: "left" },
    { id: "company_name", label: "Company Name", align: "left" },
    { id: "company_department", label: "Company Department", align: "left" },
  ];

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

  return (
    <Box sx={{ maxWidth: "80%", mx: "auto" }}>
      <HeaderBreadCrumbs heading='User Management' breadcrumbs={BREADCRUMBS} />
      <TableContainer>
        {isLoading ? (
          <Skeleton height={300} width={500}></Skeleton>
        ) : (
          <Table>
            <TableCustomHead headLabel={TABLE_HEAD} />
            <TableBody>
              {users.map((user) => (
                <TableCustomRow row={user} key={user.id} />
              ))}
            </TableBody>
          </Table>
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
