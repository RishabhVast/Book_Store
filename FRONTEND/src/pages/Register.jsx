import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch, useSelector } from "react-redux";
import { createRegister } from "../resources/users/registerSlice";
const schema = yup.object().shape({
  name: yup.string().min(2).max(50).required(),
  email: yup.string().email().required(),
  password: yup.string().min(5).max(255).required(),
  confirmPass: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match"),
  isAdmin: yup.boolean(),
});

const Register = () => {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });
  const dispatch = useDispatch();
  const onSubmitHandler = (data) => {
    dispatch(createRegister(data));
    navigate("/app/login");
  };

  return (
    <div className="register-container flex justify-center m-10">
      <div className="block p-6 rounded-lg shadow-lg bg-white max-w-md ">
        <span className="flex flex-row justify-center">
          Let's Start Exploring Together
        </span>

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
              placeholder="user name"
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
              id="email"
              placeholder="Email address"
              {...register("email")}
            />
            <p className="text-red-900">{errors.email?.message}</p>
          </div>
          <div className="form-group mb-6">
            <input
              type="password"
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
              id="password"
              placeholder="password"
              {...register("password")}
            />
            <p className="text-red-900">{errors.password?.message}</p>
          </div>
          <div className="form-group mb-6">
            <input
              type="password"
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
              id="confirmPass"
              placeholder="Confirm Password"
              {...register("confirmPass")}
            />
            <p className="text-red-900">{errors.confirmPass?.message}</p>
          </div>
          <div className="form-group form-check  mb-6">
            <input
              type="checkbox"
              className="form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain mr-2 cursor-pointer"
              id="isAdmin"
              {...register("isAdmin")}
            />
            <label
              className="form-check-label inline-block text-gray-800"
              htmlFor="exampleCheck25"
            >
              is Admin
            </label>
            <p className="text-red-900">{errors.isAdmin?.message}</p>
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
            Sign up
          </button>
          <div className="mt-7">
            <div className="flex justify-center items-center">
              <label className="mr-2">Existing User ?</label>

              <Link to="/app/login">Sign in</Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;
