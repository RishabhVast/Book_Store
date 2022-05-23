import axios from "../axios/axios-common";

const create = (data) => {
  return axios.post("/users", data);
};

const registerService = {
  create,
};
export default registerService;
