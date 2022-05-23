const express = require("express");
const router = express.Router();
const { Genre } = require("../models/genreModel");
const auth = require("../middleware/auth");
const {
  Book,
  bookSchema,
  bookInputValidation,
} = require("../models/bookModel");
const { append } = require("express/lib/response");
const req = require("express/lib/request");
const adminAuth = require("../middleware/adminAuth");
const validateObjectId = require("../middleware/validateObjectId");


router.get("/", async (req, res) => {
  const books = await Book.find({});
  if (books && books.length == 0) {
    return res.status("404").send("No data found");
  }
  res.send(books);
});
router.get("/:id", validateObjectId, async (req, res) => {
  const _id = req.params.id;
  const book = await Book.findById({ _id });
  if (!book) return res.status(404).send("book not found");
  res.send(book);
});

router.post("/", auth, async (req, res) => {
  const { error } = bookInputValidation(req.body);

  if (error) {
    return res.status(400).send(error.details[0].message);
  }

  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Please check genreId");
  const book = new Book({
    title: req.body.title,
    genre: {
      name: genre.name,
      _id: genre._id,
    },
    dailyRentalRate: req.body.dailyRentalRate,
    numberInStocks: req.body.numberInStocks,
    liked: req.body.liked,
  });
  await book.save();
  res.send(book);
});
//pagination route
router.post("/pfs", async (req, res) => {
  let args = {};
  let sortArgs = {};
  if (req.body.genre && req.body.genre != "all genre") {
    args["genre.name"] = req.body.genre;
  }
  if (req.body.title) {
    args["title"] = new RegExp(`^${req.body.title}`, "i");
  }
  if (req.body.sort) {
    sort = req.body.sort;
    itemToSort = req.body.itemToSort;
    sortArgs[itemToSort] = sort;
  }

  if (req.body.currentItemToSort) {
    sort = req.body.sortBy;
    itemToSort = req.body.currentItemToSort;
    sortArgs[itemToSort] = sort;
  }
  const books = await Book.find(args)
    .skip(req.body.skip)
    .limit(5)
    .sort(sortArgs);

  res.send(books);
});
//booksCount route
router.get("/count/books", async (req, res) => {
  const { genreName } = req.query;
  let query = {};
  let isTitleSearch = false;
  if (genreName.substring(0, 11) == "titleSearch") {
    query["title"] = new RegExp(
      `^${genreName.substring(11, genreName.length)}`,
      "i"
    );

    isTitleSearch = true;
  }

  if (
    (!isTitleSearch && genreName && genreName != "all genre") ||
    genreName == undefined
  ) {
    query["genre.name"] = genreName;
  }
  const booksCount = await Book.find(query).count();
  res.send({ count: booksCount });
});

router.put("/:id", validateObjectId, auth, async (req, res) => {
  const _id = req.params.id;
  const { error } = bookInputValidation(req.body);
  if (error) {
    return res.status(400).send(error);
  }
  const genre = await Genre.findById(req.body.genreId);
  if (!genre) return res.status(400).send("Please check genreId");
  const book = await Book.findByIdAndUpdate(
    _id,
    {
      $set: {
        title: req.body.title,
        genre: {
          name: genre.name,
          _id: genre._id,
        },
        dailyRentalRate: req.body.dailyRentalRate,
        numberInStocks: req.body.numberInStocks,
        liked: req.body.liked,
      },
    },
    { new: true }
  );
  if (!book) {
    return res.send("book not found to update");
  }
  res.send(book);
});
router.delete("/:id", validateObjectId, auth, adminAuth, async (req, res) => {
  const _id = req.params.id;
  const book = await Book.findByIdAndDelete(_id);
  if (!book) {
    return res.status(400).send("book not found to delete");
  }
  res.send(book);
});
module.exports = router;
