import axios from "axios";
import { User } from "../types";

export async function getUsers(): Promise<User[]> {
  const {
    data: { users },
  } = await axios.get("https://dummyjson.com/users");
  console.log(users);
  return users;
}
