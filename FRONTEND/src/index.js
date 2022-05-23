import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./style/index.css";
import App from "./container/App";
import Customer from "./pages/Customer";
import Genre from "./pages/Genre";
import Login from "./pages/Login";
import Book from "./pages/Book";
import Register from "./pages/Register";
import Rental from "./pages/Rental";
import reportWebVitals from "./report/reportWebVitals";
import Landing from "./container/Landing";
import GenreForm from "./components/Forms/GenreForm";
import BookForm from "./components/Forms/BookForm";
import RentalForm from "./components/Forms/RentalForm";
import CustomerForm from "./components/Forms/CustomerForm";
import { Provider, useSelector } from "react-redux";
import { store } from "./store/store";
const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/" element={<Landing />}></Route>
        <Route path="/app" element={<App />}>
          <Route path="/app/book" element={<Book />} />
          <Route path="/app/genre" element={<Genre />} />
          <Route path="/app/rental" element={<Rental />} />
          <Route path="/app/rental/new" element={<RentalForm />} />
          <Route path="/app/customer" element={<Customer />} />
          <Route path="/app/customer/new" element={<CustomerForm />} />
          <Route path="/app/customer/:customerId" element={<CustomerForm />} />
          <Route path="/app/login" element={<Login />} />
          <Route path="/app/register" element={<Register />} />
          <Route path="/app/genre/new" element={<GenreForm />} />
          <Route path="/app/genre/:genreId" element={<GenreForm />} />
          <Route path="/app/genre/book" element={<BookForm />} />
          <Route path="/app/book/new" element={<BookForm />} />
        </Route>
      </Routes>
    </Router>
  </Provider>
);

export default Router;
reportWebVitals();
