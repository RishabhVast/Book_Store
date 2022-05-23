import { Link } from "react-router-dom";
import React from "react";
import manWorking from "../../assets/svg/man_working.svg";
const NotLoggedIn = () => {
  return (
    <div className="not-logged-in-page h-screen  b2">
      <div className="  container-fluid  flex flex-col md:flex-row  h-3/4 justify-center md:space-x-40">
        <div className="not-logged-in-button-section text-white flex flex-row justify-center self-center ">
          <div className="not-logged-in-section flex flex-col ">
            <span className="flex flex-col text-center justify-center space-x-5 ">
              <h2 className="font-semibold text-3xl m-5 text-center">
                Create Your Account
              </h2>{" "}
              <Link to="/app/register">
                <button
                  type="button"
                  className=" inline-block  px-6 py-2.5 bg-purple-600 text-white  text-lg leading-tight uppercase rounded-full  hover:bg-purple-700 hover:shadow-lg hover:text-white focus:bg-purple-700  active:bg-purple-800  transition duration-150 ease-in-out"
                >
                  Signup
                </button>
              </Link>
            </span>
            <hr className="my-6 border-gray-300" />
            <span className="flex flex-col text-center justify-center space-x-5 ">
              <h2 className="font-semibold text-3xl m-5 text-center">
                Aleady have an account
              </h2>{" "}
              <Link to="/app/login">
                <button
                  type="button"
                  className=" inline-block  px-6 py-2.5 bg-purple-600 text-white  text-lg leading-tight uppercase rounded-full  hover:bg-purple-700 hover:shadow-lg hover:text-white focus:bg-purple-700  active:bg-purple-800  transition duration-150 ease-in-out"
                >
                  Login
                </button>
              </Link>
            </span>
          </div>
        </div>
        <div className="not-logged-in-img flex flex-col justify-center self-center  h-3/4 ">
          <img src={manWorking} alt="" srcSet="" className="h-3/4" />
        </div>
      </div>
    </div>
  );
};

export default NotLoggedIn;
