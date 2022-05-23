import { Link } from "react-router-dom";
function Footer() {
  return (
    <footer className="bg-slate-800  p-2  footer text-center">
      <span className="text-sm text-white sm:text-center">
        © 2022{" "}
        <Link to={"www.movierental.com"} className="hover:underline">
          movie rental
        </Link>
        . All Rights Reserved.
      </span>
      <ul className="space-x-10 text-white">
        <Link to="movie" className="text-sm text-white">
          About
        </Link>
        <Link to="movie" className="text-sm text-white">
          Contact
        </Link>
        <Link to="movie" className="text-sm text-white">
          Address
        </Link>
      </ul>
    </footer>
  );
}

export default Footer;
