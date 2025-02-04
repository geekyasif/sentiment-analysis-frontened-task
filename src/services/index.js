import axios from "axios";
import { config } from "../config";

export async function fetchNews(params) {
  try {
    const { data } = await axios.get(config.api_end_point + "news", { params });

    if (data.success === false) {
      throw new Error("Something went wrong!");
    }

    return data.data;
  } catch (error) {
    throw error;
  }
}
