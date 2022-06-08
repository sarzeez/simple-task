import axios from "axios";
import qs from "qs";

import { signinProps } from "../types/authTypes";
import { boardGetListProps } from "../types/boardTypes";

export const url = (type?: string) => {
  return `https://${type || "subdomain"}.ox-sys.com`;
};

const request = {
  auth: {
    signin: ({ username, password, subdomain }: signinProps) =>
      axios.post(
        `${url(subdomain)}/security/auth_check`,
        qs.stringify({
          _username: username,
          _password: password,
          _subdomain: subdomain,
        }),
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
          },
        }
      ),
    saveToken: (token: string) =>
      localStorage.setItem("accessToken", `Bearer ${token}`),
  },
  board: {
    getList: ({ size = 100, page = 1 }: boardGetListProps) =>
      axios.get(`${url("toko")}/variations`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: localStorage.getItem("accessToken") || false,
        },
        params: {
          size: size,
          page,
        },
      }),
  },
};

export default request;
