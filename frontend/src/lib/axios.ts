import axios, { AxiosRequestConfig, isAxiosError } from "axios";
import { baseUrl } from './../utils/baseUrl';

const fetchApi = async (
  method: "GET" | "POST" | "PUT" | "DELETE",
  endpoint: string,
  body?: object,
  headers?: object
) => {
  const config: AxiosRequestConfig = {
    method,
    url: baseUrl+endpoint,
    data: body,
    headers,
  };
  try {
    const res = await axios(config);
    return res.data;
  } catch (error) {
    if (isAxiosError(error)) {
      throw error?.response?.data ? error?.response?.data : error.message;
    } else throw error;
  }
};

export default fetchApi;
