const express = require("express");
const genresRouter = require("../routes/genresRoutes");
const customerRouter = require("../routes/customerRoutes");
const booksRouter = require("../routes/bookRoutes");
const rentalRouter = require("../routes/rentalRoutes");
const userRouter = require("../routes/userRoutes");
const loginRouter = require("../routes/loginRoute");
const error = require("../middleware/error");
module.exports = function (app) {
  app.use(express.json());
  app.use("/api/genres", genresRouter);
  app.use("/api/customers", customerRouter);
  app.use("/api/books", booksRouter);
  app.use("/api/rentals", rentalRouter);
  app.use("/api/users", userRouter);
  app.use("/api/login", loginRouter);
  app.use(error);
};
