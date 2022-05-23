import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  createCustomer,
  updateCustomer,
} from "../../resources/customer/customerSlice";
import { useParams } from "react-router-dom";
const schema = yup.object().shape({
  name: yup.string().min(3).max(10).required(),
  phone: yup.string().min(10).max(10).required(),
  isGold: yup.boolean(),
});

const CustomerForm = () => {
  const customers = useSelector((state) => state.customerReducer.customers);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const params = useParams();
  useEffect(() => {
    const customerId = params.customerId;
    if (!customerId) return;
    const customer = customers.find((c) => c._id === params.customerId);
    if (!customer) return;
    setValue("name", customer.name);
    setValue("_id", customer._id);
    setValue("phone", customer.phone);
    setValue("isGold", customer.isGold);
  }, []);

  const onSubmitHandler = (data) => {
    if (!data._id) {
      dispatch(createCustomer(data));
    } else {
      dispatch(updateCustomer(data));
    }
    navigate("/app/customer");
  };

  return (
    <div className="register-container flex justify-center m-10">
      <div className="block p-6 rounded-lg   shadow-lg bg-white max-w-md ">
        <span className="flex justify-center">Add Customers</span>

        <form className="m-8" onSubmit={handleSubmit(onSubmitHandler)}>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="name"
              placeholder="Enter Name"
              {...register("name")}
            />
            <p className="text-red-900">{errors.name?.message}</p>
          </div>
          <div className="form-group mb-6">
            <input
              type="text"
              className="form-control block
        w-full
        px-3
        py-1.5
        text-base
        font-normal
        text-gray-700
        bg-white bg-clip-padding
        border border-solid border-gray-300
        rounded
        transition
        ease-in-out
        m-0
        focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
              id="phone"
              placeholder="Enter phone"
              {...register("phone")}
            />
            <p className="text-red-900">{errors.phone?.message}</p>
          </div>
          <div className="form-group mb-6">
            <div className="form-group form-check  mb-6">
              <input
                type="checkbox"
                className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
                id="isGold"
                {...register("isGold")}
              />
              <label
                className="form-check-label inline-block text-gray-800"
                htmlFor="isGold"
              >
                is Gold member
              </label>
            </div>
            <p className="text-red-900">{errors.isGold?.message}</p>
          </div>

          <button
            className="
      w-full
      px-6
      py-2.5
      bg-blue-600
      text-white
      font-medium
      text-xs
      leading-tight
      uppercase
      rounded
      shadow-md
      hover:bg-blue-700 hover:shadow-lg
      focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0
      active:bg-blue-800 active:shadow-lg
      transition
      duration-150
      ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default CustomerForm;
