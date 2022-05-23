import { Link } from "react-router-dom";
import { useEffect } from "react";
import avatar from "../../assets/svg/avatar.svg";
import { loadLogout } from "../../resources/login/loginSlice";
import { useDispatch } from "react-redux";

function NavBar() {
  useEffect(() => {
    const navLinks = document.querySelectorAll(".nav-item");
    for (var i = 0; i < navLinks.length; i++) {
      navLinks[i].addEventListener("click", function () {
        var current = document.getElementsByClassName("nav-item-active");
        current[0].className = current[0].className.replace(
          " nav-item-active",
          ""
        );
        this.className += " nav-item-active";
      });
    }
  });
  const dispatch = useDispatch();
  return (
    <div>
      <nav
        className="
  relative
  w-full
  flex flex-wrap
  items-center
  justify-between
  py-4
  bg-gray-100
  text-gray-500
  hover:text-gray-700
  focus:text-gray-700
  shadow-lg
  navbar navbar-expand-lg navbar-light
  "
      >
        <div className="container-fluid w-full flex flex-wrap items-center justify-between px-6">
          <button
            className="
      navbar-toggler
      text-gray-500
      border-0
      hover:shadow-none hover:no-underline
      py-2
      px-2.5
      bg-transparent
      focus:outline-none focus:ring-0 focus:shadow-none focus:no-underline
    "
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <svg
              aria-hidden="true"
              focusable="false"
              data-prefix="fas"
              data-icon="bars"
              className="w-6"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path
                fill="currentColor"
                d="M16 132h416c8.837 0 16-7.163 16-16V76c0-8.837-7.163-16-16-16H16C7.163 60 0 67.163 0 76v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16zm0 160h416c8.837 0 16-7.163 16-16v-40c0-8.837-7.163-16-16-16H16c-8.837 0-16 7.163-16 16v40c0 8.837 7.163 16 16 16z"
              ></path>
            </svg>
          </button>
          <div
            className="collapse navbar-collapse "
            id="navbarSupportedContent"
          >
            <Link
              className="
        flex
        items-center
        text-gray-900
        hover:text-gray-900
        focus:text-gray-900
        mt-2
        lg:mt-0
        mr-1
      "
              to={"/"}
            >
              <span className="header-font">Book_Store</span>
            </Link>

            <ul className="navbar-nav parentLink flex flex-col pl-0 list-style-none mr-auto">
              <li className="nav-item p-2 nav-item-active">
                <Link className={`nav-link text-gray-500 `} to={"/app/genre"}>
                  Genres
                </Link>
              </li>
              <li className="nav-item p-2">
                <Link className="nav-link text-gray-500 " to={"/app/book"}>
                  Books
                </Link>
              </li>
              <li className="nav-item p-2">
                <Link className="nav-link text-gray-500 " to={"/app/customer"}>
                 Customers
                </Link>
              </li>
              <li className="nav-item p-2">
                <Link className="nav-link text-gray-500" to={"/app/rental"}>
                 Rentals
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="flex items-center logoutFixed">
        <div className="dropdown relative">
          <Link
            className=" flex items-center hidden-arrow"
            to={"#"}
            id="dropdownMenuButton2"
            role="button"
            data-bs-toggle="dropdown"
            aria-expanded="false"
          >
            <img
              src={avatar}
              className="rounded-full"
              style={{ height: "25px", width: "25px" }}
            />
          </Link>
          <ul
            className="
    dropdown-menu
    min-w-max
    absolute
    hidden
    bg-white
    text-base
    z-50
    sm:float-right
    md:float-right
    py-2
    list-none
    text-right
    rounded-lg
    shadow-lg
    mt-1
    m-0
    bg-clip-padding
    border-none
    
    right-0
  "
          >
            <li>
              <Link
                className="
                  float-right
        dropdown-item
        text-sm
        py-2
        px-4
        font-normal
        block
        w-full
        whitespace-nowrap
        bg-transparent
        text-gray-700
        hover:bg-gray-100
      "
                to={"/"}
                onClick={() => dispatch(loadLogout())}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default NavBar;
