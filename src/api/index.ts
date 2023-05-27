import axios from "axios";
import { User, Settings } from "../types";

export async function getUsers(): Promise<User[]> {
  const {
    data: { users },
  } = await axios.get("https://dummyjson.com/users");
  return users;
}

export async function getSingleUser(id: number): Promise<User> {
  const { data } = await axios.get(`https://dummyjson.com/users/${id}`);
  return data;
}

export async function getSettings(): Promise<Settings> {
  const {
    data: { settings },
  } = await axios.get(
    "https://mui-userstable-db-default-rtdb.europe-west1.firebasedatabase.app/settings.json"
  );
  return settings;
}
