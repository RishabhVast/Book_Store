import { useSelector, useDispatch } from "react-redux";
import { deleteGenre, retrieveGenres } from "../resources/genre/genreSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import NotLoggedIn from "../components/Common/NotLoggedIn";
function Genre() {
  const genres = useSelector((state) => state.genreReducer.genres);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveGenres());
  }, []);
  let counter = 1;
  const permit = useSelector((state) => state.loginReducer.token);
  return !permit ? (
    <NotLoggedIn></NotLoggedIn>
  ) : genres.length === 0 ? (
    <div className="no-data-container text-center mt-5 bg-slate-50  shadow-2xl p-5">
      <p>No Genre Avaialbe</p>
      <p>would you like to add Genre?</p>
      <button>
        <Link to="/app/genre/new">
          <svg
            className="h-8 w-8 text-violet-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="red"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
            />
          </svg>
        </Link>
      </button>
    </div>
  ) : (
    <div className="flex flex-col  justify-end genre-container mt-10 bg-slate-50  shadow-2xl p-5">
      {/* <h1 className="underline">Genres</h1> */}
      {/* table content */}
      <div className=" bg-slate-50 p-10 shadow-2xl">
        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="py-4 inline-block min-w-full sm:px-6 lg:px-8">
            <div className="overflow-hidden">
              <table className="min-w-full text-center">
                <thead className="border-b bg-gray-800">
                  <tr>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      #
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Genre Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Remove
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {genres.map((g) => (
                    <tr
                      className="table-row shadow-md rounded-lg mt-6"
                      key={g._id}
                    >
                      <td>{counter++}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <Link to={`/app/genre/${g._id}`}>{g.name}</Link>{" "}
                      </td>
                      <td>
                        <button
                          className="inline-block px-6 py-2.5 bg-gradient-to-r  hover:from-pink-500 hover:to-yellow-500 p-2  bg-red-600
               text-white  rounded-full "
                          onClick={() => dispatch(deleteGenre(g._id))}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="mt-5">
                    <td>
                      <button>
                        <Link to="/app/genre/new">
                          <svg
                            className="h-8 w-8 "
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="red"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
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
    </div>
  );
}
export default Genre;
