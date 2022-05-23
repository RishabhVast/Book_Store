import axios from "../axios/axios-common";
const getAll = () => {
  return axios.get("/genres");
};
const get = (id) => {
  return axios.get(`/genres/${id}`);
};
const create = (data, token) => {
  return axios.post("/genres", data, { headers: { "x-auth-token": token } });
};
const update = (_id, data, token) => {
  return axios.put(`/genres/${_id}`, data, {
    headers: { "x-auth-token": token },
  });
};
const remove = (_id, token) => {
  return axios.delete(`/genres/${_id}`, { headers: { "x-auth-token": token } });
};

const genreServices = {
  getAll,
  get,
  create,
  update,
  remove,
};
export default genreServices;
