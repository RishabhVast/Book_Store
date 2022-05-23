import React from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useDispatch } from "react-redux";
import { userLogin } from "../resources/login/loginSlice";
import { useNavigate } from "react-router-dom";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().min(5).max(255).required(),
});

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });
  const onSubmitHandler = (data) => {
    dispatch(userLogin(data));
    navigate("/app/genre");
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
            ></input>
            <p className="text-red-900">{errors.password?.message}</p>
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
            Sign In
          </button>
          <div className="mt-7">
            <div className="flex justify-center items-center">
              <label className="mr-2">New User ?</label>
              <Link
                to={"/app/register"}
                className=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105"
              >
                <Link to="/app/Register">Sign up</Link>
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
