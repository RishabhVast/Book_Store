import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Sort from "../components/Common/Sort";
import NotLoggedIn from "../components/Common/NotLoggedIn";
import Error from "../components/Common/Error";
import {
  deleteBook,
  retrieveBooksCount,
  retrievePaginatedBook,
} from "../resources/book/bookSlice";
import { retrieveGenres } from "../resources/genre/genreSlice";
import { useDispatch } from "react-redux";
import Pagination from "../components/Common/Pagination";
import Filter from "../components/Common/filter";



function Book() {
  let counter = 1;
  const dispatch = useDispatch();
  const totalBooksCount = useSelector((state) => state.bookReducer.count);
  let books = useSelector((state) => state.bookReducer.books);
  let error = useSelector((state) => state.bookReducer.error);
  const genres = useSelector((state) => state.genreReducer.genres);
  const [currentGenre, setCurrentGenre] = useState("all genre");
  const [currentItemToSort, setcurrentItemToSort] = useState("");
  const [sortBy, setSortBy] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const paginate = (pageNo) => {
    setCurrentPage(pageNo);
    const skipValue = 5 * (pageNo - 1);
    dispatch(
      retrievePaginatedBook({
        skip: skipValue,
        genre: currentGenre,
        currentItemToSort,
        sortBy,
      })
    );
  };
  const filterFunction = (genre) => {
    setCurrentGenre(genre);
    dispatch(retrieveBooksCount(genre));
    dispatch(retrievePaginatedBook({ genre }));
    dispatch(retrieveGenres());
  };
  let searchFunction = (title) => {
    dispatch(retrievePaginatedBook({ title }));
    dispatch(retrieveBooksCount(`titleSearch${title}`));
    setcurrentItemToSort(`titleSearch${title}`);
  };
  let sortFunction = (sort, itemToSort) => {
    dispatch(retrievePaginatedBook({ sort, itemToSort }));
    setcurrentItemToSort(itemToSort);
    setSortBy(sort);
    dispatch(retrieveBooksCount("all genre"));
  };
  let deleteFunction = (_id) => {
    dispatch(deleteBook(_id));
    if (books.length <= 1) {
      dispatch(retrievePaginatedBook());
      setCurrentGenre("all genre");
      dispatch(retrieveBooksCount(currentGenre));
    }
    if (currentGenre === "all genre") {
      dispatch(retrieveBooksCount("all genre"));
    }
    dispatch(retrieveBooksCount(currentGenre));
    setCurrentGenre("all genre");
  };

  let paginationProps = { totalBooksCount, paginate };
  let filterProps = { genres, filterFunction, searchFunction };
  let sortProps = {
    sortFunction,
  };

  useEffect(() => {
    dispatch(retrieveBooksCount("all genre"));
    const skip = {};
    skip.skip = 0;
    dispatch(retrievePaginatedBook({ skip }));
    dispatch(retrieveGenres());
  }, []);

  const permit = useSelector((state) => state.loginReducer.token);
  return !permit ? (
    <NotLoggedIn></NotLoggedIn>
  ) : error ? (
    <Error></Error>
  ) : (
    <div className="flex flex-col  justify-end  mt-10 bg-slate-50  shadow-2xl">
      <div className=" bg-slate-50 p-10 shadow-2xl">
        {/* offCanvas */}

        <div className="flex space-x-2">
          <div>
            <Link
              data-bs-toggle="offcanvas"
              to={"#offcanvasExample"}
              role="button"
              aria-controls="offcanvasExample"
            >
              <button
                className="flex flex-row space-x-1 px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg  focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out mr-1.5"
                type="button"
                data-bs-toggle="offcanvas"
                data-bs-target="#offcanvasRight"
                aria-controls="offcanvasRight"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  className="bi bi-gear"
                  viewBox="0 0 16 16"
                >
                  <path d="M8 4.754a3.246 3.246 0 1 0 0 6.492 3.246 3.246 0 0 0 0-6.492zM5.754 8a2.246 2.246 0 1 1 4.492 0 2.246 2.246 0 0 1-4.492 0z" />
                  <path d="M9.796 1.343c-.527-1.79-3.065-1.79-3.592 0l-.094.319a.873.873 0 0 1-1.255.52l-.292-.16c-1.64-.892-3.433.902-2.54 2.541l.159.292a.873.873 0 0 1-.52 1.255l-.319.094c-1.79.527-1.79 3.065 0 3.592l.319.094a.873.873 0 0 1 .52 1.255l-.16.292c-.892 1.64.901 3.434 2.541 2.54l.292-.159a.873.873 0 0 1 1.255.52l.094.319c.527 1.79 3.065 1.79 3.592 0l.094-.319a.873.873 0 0 1 1.255-.52l.292.16c1.64.893 3.434-.902 2.54-2.541l-.159-.292a.873.873 0 0 1 .52-1.255l.319-.094c1.79-.527 1.79-3.065 0-3.592l-.319-.094a.873.873 0 0 1-.52-1.255l.16-.292c.893-1.64-.902-3.433-2.541-2.54l-.292.159a.873.873 0 0 1-1.255-.52l-.094-.319zm-2.633.283c.246-.835 1.428-.835 1.674 0l.094.319a1.873 1.873 0 0 0 2.693 1.115l.291-.16c.764-.415 1.6.42 1.184 1.185l-.159.292a1.873 1.873 0 0 0 1.116 2.692l.318.094c.835.246.835 1.428 0 1.674l-.319.094a1.873 1.873 0 0 0-1.115 2.693l.16.291c.415.764-.42 1.6-1.185 1.184l-.291-.159a1.873 1.873 0 0 0-2.693 1.116l-.094.318c-.246.835-1.428.835-1.674 0l-.094-.319a1.873 1.873 0 0 0-2.692-1.115l-.292.16c-.764.415-1.6-.42-1.184-1.185l.159-.291A1.873 1.873 0 0 0 1.945 8.93l-.319-.094c-.835-.246-.835-1.428 0-1.674l.319-.094A1.873 1.873 0 0 0 3.06 4.377l-.16-.292c-.415-.764.42-1.6 1.185-1.184l.292.159a1.873 1.873 0 0 0 2.692-1.115l.094-.319z" />
                </svg>
                <span> Action</span>
              </button>
            </Link>

            <div
              className="offcanvas offcanvas-end fixed bottom-0 flex flex-col max-w-full bg-white invisible bg-clip-padding shadow-sm outline-none transition duration-300 ease-in-out text-gray-700 top-0 right-0 border-none w-96"
              tabIndex="-1"
              id="offcanvasRight"
              aria-labelledby="offcanvasRightLabel"
            >
              <div className="offcanvas-header flex flex-row justify-end p-5">
                <button
                  type="button"
                  className="btn-close box-content w-4 h-4 p-2 -my-5 -mr-2 text-black border-none rounded-none opacity-50 focus:shadow-none focus:outline-none focus:opacity-100 hover:text-black hover:opacity-75 hover:no-underline"
                  data-bs-dismiss="offcanvas"
                  aria-label="Close"
                ></button>
              </div>
              <div className="offcanvas-body  p-4 overflow-y-auto">
                <Filter {...filterProps}></Filter>
              </div>
            </div>
          </div>
        </div>
        {/* offCanvas */}

        {/* table content */}
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
              <div className="overflow-hidden">
                <table className="min-w-full text-center">
                  <thead className="border-b bg-gray-800">
                    <tr>
                      <th
                        scope="col"
                        className="text-sm font-bold text-white py-6"
                      >
                        #
                      </th>
                      <th scope="col" className="text-sm font-bold text-white ">
                        <span className="flex  flex-row justify-center space-x-2">
                          <span className="self-center">Title</span>
                          <span>
                            {" "}
                            <Sort porp1={sortProps} prop2={"title"}></Sort>
                          </span>
                        </span>
                      </th>
                      <th scope="col" className="text-sm font-bold text-white ">
                        <span className="flex  flex-row justify-center space-x-2">
                          <span className="self-center">Genre</span>
                          <span>
                            {" "}
                            <Sort porp1={sortProps} prop2={"genre.name"}></Sort>
                          </span>
                        </span>
                      </th>
                      <th scope="col" className="text-sm font-bold text-white ">
                        <span className="flex  flex-row justify-center space-x-2">
                          <span className="self-center">In Stocks</span>
                          <span>
                            {" "}
                            <Sort
                              porp1={sortProps}
                              prop2={"numberInStocks"}
                            ></Sort>
                          </span>
                        </span>
                      </th>
                      <th scope="col" className="text-sm font-bold text-white ">
                        <span className="flex  flex-row justify-center space-x-2">
                          <span className="self-center">Rate/-</span>
                          <span>
                            {" "}
                            <Sort
                              porp1={sortProps}
                              prop2={"dailyRentalRate"}
                            ></Sort>
                          </span>
                        </span>
                      </th>

                      <th scope="col" className="text-sm font-bold text-white ">
                        <span className="flex  flex-row justify-center space-x-2">
                          <span className="self-center">Liked</span>
                        </span>
                      </th>

                      <th scope="col" className="text-sm font-bold text-white ">
                        <span className="flex  flex-row justify-center space-x-2">
                          <span className="self-center">Action</span>
                        </span>
                      </th>
                    </tr>
                  </thead>

                  <tbody>
                    {books.map((b) => (
                      <tr
                        className="table-row shadow-md rounded-lg mt-6"
                        key={b._id}
                      >
                        <td>{counter++}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {b.title}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {b.genre.name}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {b.numberInStocks}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                          {b.dailyRentalRate}
                        </td>
                        <td className=" text-center flex justify-center">
                          {b.liked === true ? (
                            <span>
                              <svg
                                className="w-8 h-8 "
                                fill="red"
                                viewBox="0 0 20 20"
                              >
                                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                              </svg>
                            </span>
                          ) : (
                            <svg
                              className="w-8 h-8"
                              fill="black"
                              viewBox="0 0 20 20"
                            >
                              <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
                            </svg>
                          )}
                        </td>

                        <td>
                          <button
                            className="inline-block px-6 py-2.5 bg-gradient-to-r  hover:from-pink-500 hover:to-yellow-500  bg-red-600
                 text-white  rounded-full "
                            onClick={() => {
                              deleteFunction(b._id);
                            }}
                          >
                            Delete
                          </button>
                          {/* <button
                            className="inline-block px-6 py-2.5 bg-gradient-to-r  hover:from-pink-500 hover:to-yellow-500  bg-red-600
                 text-white  rounded-full "
                            onClick={() => {
                              dispatch(deleteBook(b._id));
                            }}
                          >
                            Delete
                          </button> */}
                        </td>
                      </tr>
                    ))}

                    <tr className="flex justify-center mt-5">
                      <td>
                        <button>
                          <Link to="/app/book/new">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              className="h-6 w-6"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="red"
                              strokeWidth={2}
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                          </Link>
                        </button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
        {/* table content */}
        <Pagination {...paginationProps}></Pagination>
      </div>
    </div>
  );
}
export default Book;
