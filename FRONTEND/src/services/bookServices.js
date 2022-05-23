import axios from "../axios/axios-common";
const getAll = () => {
  return axios.get("/books");
};
const getBookCount = (data) => {
  const res = axios.get("/books/count/books/?genreName=" + data);
  return res;
};
const pfs = (data) => {
  const res = axios.post("/books/pfs", data);
  return res;
};
const get = (id) => {
  return axios.get(`/books/${id}`);
};
const create = (data, token) => {
  return axios.post(
    "/books",
    {
      title: data.title,
      genreId: data.genreId,
      dailyRentalRate: data.dailyRentalRate,
      numberInStocks: data.numberInStocks,
      liked: data.liked,
    },
    { headers: { "x-auth-token": token } }
  );
};
const update = (id, data, token) => {
  return axios.put(`/books/${id}`, data, {
    headers: { "x-auth-token": token },
  });
};
const remove = (_id, token) => {
  return axios.delete(`/books/${_id}`, { headers: { "x-auth-token": token } });
};

const bookServices = {
  getAll,
  get,
  create,
  update,
  remove,
  pfs,
  getBookCount,
};
export default bookServices;
