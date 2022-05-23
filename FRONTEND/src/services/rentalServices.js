import axios from "../axios/axios-common";
const getAll = () => {
  return axios.get("/rentals");
};
const get = (id) => {
  return axios.get(`/rentals/${id}`);
};
const create = (data, token) => {
  return axios.post(
    "/rentals",
    {
      customer: data.customerId,
      book: data.bookId,
    },
    {
      headers: {
        "x-auth-token": token,
      },
    }
  );
};
const update = (_id, token) => {
  return axios.patch(`/rentals/${_id}`, { headers: { "x-auth-token": token } });
};
const remove = (_id, token) => {
  return axios.delete(`/rentals/${_id}`, {
    headers: { "x-auth-token": token },
  });
};

const rentalServices = {
  getAll,
  get,
  create,
  update,
  remove,
};
export default rentalServices;
