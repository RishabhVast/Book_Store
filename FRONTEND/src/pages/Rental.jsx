import { useSelector, useDispatch } from "react-redux";
import NotLoggedIn from "../components/Common/NotLoggedIn";
import {
  deleteRentals,
  retrieveRentals,
  updateRentals,
} from "../resources/rentals/rentalSlice";
import { retrieveBooks } from "../resources/book/bookSlice";
import { useEffect } from "react";
import { Link } from "react-router-dom";
function Rentals() {
  let counter = 1;
  const rentals = useSelector((state) => state.rentalReducer.rentals);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(retrieveRentals());
    dispatch(retrieveBooks());
  }, []);
  const permit = useSelector((state) => state.loginReducer.token);

  return !permit ? (
    <NotLoggedIn></NotLoggedIn>
  ) : rentals.length != 0 ? (
    <div className="flex flex-col  justify-end  mt-10 bg-slate-50  shadow-2xl p-5">
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
                      Customer
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Book
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      <span>&#8377;</span>/day
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Date Out
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Date In
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                     
                    >
                      Return
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
                  {rentals.map((r) => (
                    <tr
                      className="table-row shadow-md rounded-lg mt-6"
                      key={r._id}
                    >
                      <td>{counter++}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {r.customer.name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {r.book.title}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {r.rentalFee}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {r.dateOut.slice(0, 10)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {r.dateIn ? r.dateIn.slice(0, 10) : "NA"}
                      </td>
                      <td>
                        <button
                          className="inline-block px-6 py-2.5 bg-gradient-to-r  hover:from-pink-500 hover:to-yellow-500 p-2  bg-red-600
               text-white  rounded-full "
                          onClick={() => {
                            console.log("in the button");
                            dispatch(updateRentals(r._id, this))}}
                          key={r._id}
                        >
                          Return
                        </button>
                      </td>
                      <td>
                        <button
                          className="inline-block px-6 py-2.5 bg-gradient-to-r  hover:from-pink-500 hover:to-yellow-500 p-2  bg-red-600
               text-white  rounded-full "
                          onClick={() => dispatch(deleteRentals(r._id))}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}

                  <tr className=" border-b">
                    <td>
                      <button className="mt-5 ">
                        <Link to="/app/rental/new">
                          <svg
                            className="h-8 w-8  rounded-ful"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="red"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            {" "}
                            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />{" "}
                            <polyline points="16 17 21 12 16 7" />{" "}
                            <line x1="21" y1="12" x2="9" y2="12" />
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
  ) : (
    <div className="no-data-container text-center mt-5 bg-slate-50 p-10 shadow-2xl ">
      <p>Nothing Rented Out</p>
      <p>Start Renting</p>
      <button className="add-customer-btn mt-5 ">
        <Link to="/app/rental/new">
          <svg
            className="h-8 w-8  rounded-ful"
            viewBox="0 0 24 24"
            fill="none"
            stroke="red"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {" "}
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />{" "}
            <polyline points="16 17 21 12 16 7" />{" "}
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
        </Link>
      </button>
    </div>
  );
}
export default Rentals;
