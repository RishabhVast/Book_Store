import axios from "../axios/axios-common";

const login = (data) => {
  return axios.post("/login", data);
};

export default login;
