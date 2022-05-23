import { Link } from "react-router-dom";


import book2 from "../assets/videos/book2.mp4";
import book3 from "../assets/videos/book3.mp4";
import books8 from "../assets/videos/books8.mp4";
import book6 from "../assets/videos/book6.mp4";
import book7 from "../assets/videos/book7.mp4";


function LandingPage() {
  return (
    <div className=" text-white">
      <div className="flex flex-col lg:flex-row justify-center">
        <div className="self-center  text-center">
          <h1 className="text-4xl tracking-tight font-extrabold  sm:text-5xl md:text-6xl">
            <span className="block ">
              <span style={{ fontFamily: "Niconne" }}>
                {" "}
                Welcome to the Book_Store
              </span>
            </span>
          </h1>
          <p className="mt-3  text-lg ">
            A new home of thousands of Books, including all the latest
            Published
          </p>
          <span className="mt-10 flex flex-row space-x-10 justify-center">
            <button
              type="button"
              className=" drop-shadow-2xl inline-block  px-6 py-2.5 bg-purple-800 text-white  text-lg leading-tight uppercase rounded-full  hover:bg-purple-700 hover:shadow-lg hover:text-white focus:bg-purple-700  active:bg-purple-800  transition duration-150 ease-in-out"
            >
              <Link to="/app/login"> Login</Link>
            </button>
            <button
              type="button"
              className=" drop-shadow-2xl inline-block  px-6 py-2.5 bg-purple-800 text-white  text-lg leading-tight uppercase rounded-full  hover:bg-purple-700 hover:shadow-lg hover:text-white focus:bg-purple-700  active:bg-purple-800  transition duration-150 ease-in-out"
            >
              <Link to="/app/register"> SingUp</Link>
            </button>
          </span>
        </div>

        <span className="" data-aos="fade-down">
          <video
            src={book3}
            autoPlay
            loop
            muted
            className="mt-8 flex-1 object-cover rounded-full"
          >
            Your browser does not support the video tag.
          </video>
        </span>
      </div>
      <div className="havent-rented  flex flex-row justify-center m-10  space-x-16">
        <p className="self-center flex flex-row  space-x-5">
          <span> Haven't Rented Out Book Yet? Start Renting </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-arrow-right"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z"
            />
          </svg>
        </p>

        <button
          type="button"
          className=" drop-shadow-2xl inline-block  px-6 py-2.5 bg-purple-800 text-white  text-lg leading-tight uppercase rounded-full  hover:bg-purple-700 hover:shadow-lg hover:text-white focus:bg-purple-700  active:bg-purple-800  transition duration-150 ease-in-out"
        >
          <Link to="/app/rental"> Rent Out</Link>
        </button>
      </div>
      <div className="container-fluid flex flex-col md:flex-row xl:flex-row lg:flex-row p-8 mt-10 ">
        <span className="" data-aos="fade-down">
          <video
            src={book2}
            autoPlay
            loop
            muted
            className=" h-96  w-96 ml-32 flex-1 object-cover rounded-full"
          >
            Your browser does not support the video tag.
          </video>
        </span>

        <span
          className="text-white text-lg text-center self-center "
          data-aos="fade-down"
        >
          <p className=" ml-8 ">
            Now you can start renting — Personalized Book at a go! — <br />
            lets start renting
            <button
              type="button"
              className="ml-4 drop-shadow-2xl inline-block  px-6 py-2.5 bg-purple-600 text-white  text-lg leading-tight uppercase rounded-full  hover:bg-purple-700 hover:shadow-lg hover:text-white focus:bg-purple-700  active:bg-purple-800  transition duration-150 ease-in-out"
            >
              <Link to="/app/login"> Login</Link>
            </button>
          </p>
        </span>
      </div>
    
       
      <div className="flex justify-between">
      <div className="">
      <span className="" data-aos="fade-down">
          <video
            src={book6}
            autoPlay
            loop
            muted
            className=" w-96 h-96 flex-1 object-cover rounded-square"
          >
            Your browser does not support the video tag.
          </video>
        </span>
        </div>
      <div>
      <span className="" data-aos="fade-down">
          <video
            src={book7}
            autoPlay
            loop
            muted
            className=" w-96 h-96 flex-1 object-cover rounded-square"
          >
            Your browser does not support the video tag.
          </video>
        </span>
        </div>
      <div>
      <span className="" data-aos="fade-down">
          <video
            src={books8}
            autoPlay
            loop
            muted
            className=" w-96 h-96 flex-1 object-cover rounded-square"
          >
            Your browser does not support the video tag.
          </video>
        </span>
        </div>
       
     
    </div>
    </div>
  );
}
export default LandingPage;
