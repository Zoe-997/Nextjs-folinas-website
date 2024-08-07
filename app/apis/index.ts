import axios from "axios";
import { constants as c } from "@/app/libs/constant";

export const callApi = (endPoint: string, method: string, body?: any) => {
  try {
    return axios({
      method,
      url: `${c.API_URL}${endPoint}`,
      data: body,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${c.API_TOKEN}`,
      },
    });
  } catch (error: any) {
    if (error.response) {
      console.error("Server Error:", error.response.status);
    } else if (error.request) {
      console.error("No response received from server");
    } else {
      console.error("Error setting up request:", error.message);
    }
  }
};
