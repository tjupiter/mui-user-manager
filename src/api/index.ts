import axios from "axios";
import { User } from "../types";

export async function getUsers(): Promise<User[]> {
  const {
    data: { users },
  } = await axios.get("https://dummyjson.com/users");
  return users;
}

export async function getDepartments(): Promise<string[]> {
  const { data } = await axios.get(
    "https://mui-userstable-db-default-rtdb.europe-west1.firebasedatabase.app/departments.json"
  );
  return data;
}
