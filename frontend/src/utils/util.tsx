export const hostName = "localhost";
export const port = "6600";
import axios from "axios";

export async function fetchJSON(url: string) {
  const response = await axios.get(url);
  if (response.status === 200 && response.data.ret === "ok")
    return response.data;
  throw new Error(response.data.msg);
}
