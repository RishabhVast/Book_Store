import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import NotLoggedIn from "../components/Common/NotLoggedIn";
import {
  deleteCustomer,
  retrieveCustomers,
} from "../resources/customer/customerSlice";
import { useEffect } from "react";
function Customer() {
  let counter = 1;
  const dispatch = useDispatch();
  const customers = useSelector((state) => state.customerReducer.customers);
  useEffect(() => {
    dispatch(retrieveCustomers());
  }, []);

  const permit = useSelector((state) => state.loginReducer.token);
  return !permit ? (
    <NotLoggedIn></NotLoggedIn>
  ) : customers.length === 0 ? (
    <div className="no-data-container text-center mt-5 bg-slate-50  shadow-2xl p-5">
      <p>No Customer Avaialbe</p>
      <p>would you like to add customer?</p>
      <button className="add-customer-btn mt-5 ">
        <Link to="/app/customer/new">
          <svg
            className="h-8 w-8    hover:text-lg add-user-svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="red"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
            />
          </svg>
        </Link>
      </button>
    </div>
  ) : (
    <div className="flex flex-col  justify-end  mt-10 bg-slate-50  shadow-2xl p-5">
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
                      Name
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      Phone
                    </th>
                    <th
                      scope="col"
                      className="text-sm font-medium text-white px-6 py-4"
                    >
                      isGold
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
                  {customers.map((c) => (
                    <tr
                      className="table-row shadow-md rounded-lg mt-6"
                      key={c._id}
                    >
                      <td>{counter++}</td>
                      <td>
                        <Link
                          to={`/app/customer/${c._id}`}
                          className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"
                        >
                          {c.name}
                        </Link>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {c.phone}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {c.isGold.toString() == "true" ? "Yes" : "No"}
                      </td>
                      <td>
                        <button
                          className="inline-block px-6 py-2.5 bg-gradient-to-r  hover:from-pink-500 hover:to-yellow-500  bg-red-600
             text-white  rounded-full "
                          onClick={() => {
                            dispatch(deleteCustomer(c._id));
                          }}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                  <tr className="mt-5">
                    <td>
                      <button className="add-customer-btn mt-5 ">
                        <Link to="/app/customer/new">
                          <svg
                            className="h-8 w-8   hover:text-lg add-user-svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="red"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
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
export default Customer;
