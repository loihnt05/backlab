// src/api.ts
import axios from "axios";

export async function fetchProtectedData(username: string, password: string) {
  const token = btoa(`${username}:${password}`);
  const res = await axios.get("http://localhost:3000/", {
    headers: {
      Authorization: `Basic ${token}`
    }
  });

  return res.data;
}
