import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { retrieveGenres } from "../../resources/genre/genreSlice";
import { useDispatch, useSelector } from "react-redux";
import { createBook } from "../../resources/book/bookSlice";
import { useNavigate } from "react-router-dom";
// import BookGenreNotSelected from "../alerts/BookGenreNotSelected";



const schema = yup.object().shape({
  title: yup.string().min(3).max(10).required(),
  genreId: yup.string().min(2).max(24).required(),
  numberInStocks: yup.number().required(),
  dailyRentalRate: yup.number().required(),
});

const BookForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(retrieveGenres());
  }, []);
  const genres = useSelector((state) => state.genreReducer.genres);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmitHandler = (data) => {
    if (data.genreId == "genre") {
      {
        alert("Please select valid genre ");
      }
    } else {
      dispatch(createBook(data));
      navigate("/app/book");
    }
  };
  return (
    <div className="register-container flex justify-center m-10">
      <div className="block p-6 rounded-lg   shadow-lg bg-white max-w-md ">
        <span className=" flex justify-center">Add Book</span>

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
              id="title"
              placeholder="Enter book title"
              {...register("title")}
            />
            <p className="text-red-900">{errors.title?.message}</p>
          </div>
          <div className="form-group mb-6">
            <select
              defaultValue={"genre"}
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
              id="genreId"
              placeholder="Enter GenreId"
              {...register("genreId")}
            >
              <option value="genre" disabled>
                Select Genre
              </option>
              {genres.map((g) => (
                <option key={g._id} value={g._id}>
                  {g.name}
                </option>
              ))}
            </select>
            <p className="text-red-900">{errors.title?.message}</p>
          </div>

          <div className="form-group mb-6">
            <input
              type="number"
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
              id="numberInStocks"
              placeholder="Enter number in stock"
              {...register("numberInStocks")}
            />
            <p className="text-red-900">{errors.numberInStock?.message}</p>
          </div>
          <div className="form-group mb-6">
            <input
              type="number"
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
              id="dailyRentalRate"
              placeholder="Daily rental rate in Rs"
              {...register("dailyRentalRate")}
            />
            <p className="text-red-900">{errors.dailyRentalRate?.message}</p>
          </div>
          <div className="form-group mb-6">
            <div className="flex justify-start">
              <div>
                <div className="form-check">
                  <input
                    className=" form-check-input appearance-none h-4 w-4 border border-gray-300 rounded-sm bg-white checked:bg-blue-600 checked:border-blue-600 focus:outline-none transition duration-200 mt-1 align-top bg-no-repeat bg-center bg-contain float-left mr-2 cursor-pointer"
                    type="checkbox"
                    value=""
                    id="liked"
                    {...register("liked")}
                  />
                  <label className="form-check-label inline-block  text-gray-700">
                    Liked
                  </label>
                </div>
              </div>
            </div>
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

export default BookForm;
