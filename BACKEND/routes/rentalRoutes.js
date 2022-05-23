const express = require("express");
const router = express.Router();
const { Rentals, rentalInputValidation } = require("../models/rentalModel");
const { Customer } = require("../models/customerModel");
const { Book } = require("../models/bookModel")

const auth = require("../middleware/auth");
const adminAuth = require("../middleware/adminAuth");
const validateObjectId = require("../middleware/validateObjectId");

router.get("/", async (req, res) => {
  const rentals = await Rentals.find({});
  if (!rentals || rentals.length == 0) {
    return res.status(404).send("unable to find");
  }
  res.send(rentals);
});
router.get("/:id", validateObjectId, async (req, res) => {
  const _id = req.params.id;
  const rental = await Rentals.findById({ _id });
  if (!rental) {
    return res.status(404).send("unable to find");
  }
  res.send(rental);
});
router.post("/", auth, async (req, res) => {
  const { error } = rentalInputValidation(req.body);
  if (error) {
    return res.status(404).send(error.details[0].message);
  }
  const book = await Book.findById(req.body.book);
  const customer = await Customer.findById(req.body.customer);
  if (!book || !customer) {
    return res.status(400).send("book or customer not found");
  }
  if (book.numberInStocks == 0)
    return res.status(400).send("Book out of stock");

  const rental = new Rentals({
    customer: {
      name: customer.name,
      phone: customer.phone,
      _id: customer._id,
    },
    book: {
      title: book.title,
      dailyRentalRate: book.dailyRentalRate,
      _id: book._id,
    },
    rentalFee: book.dailyRentalRate * 10,
  });

  const session = await Rentals.startSession();
  session.startTransaction();

  try {
    await rental.save();
    await Book.findByIdAndUpdate(book._id, {
      $inc: { numberInStocks: -1 },
    });
    session.commitTransaction();
    session.endSession();
    res.send(rental);
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    return res.status(500).send("Something failed", error);
  }
});

//router.patch("/:id", validateObjectId, auth, async (req, res) => {
router.patch("/:id", async (req, res) => {
  const session = await Rentals.startSession();
  session.startTransaction();
  try {
    const rental = await Rentals.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          dateIn: new Date().getTime(),
        },
      },
      { new: true }
    );
    if (!rental) {
      return res.status(400).send("No movie found to patch");
    }
    const _id = rental.book._id;
    await Book.findByIdAndUpdate(_id, {
      $inc: { numberInStocks: 1 },
    });

    session.commitTransaction();
    session.endSession();
    res.send(rental);
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    return res.status(500).send(error);
  }
});

router.delete("/:id", validateObjectId, auth, adminAuth, async (req, res) => {
  const session = await Rentals.startSession();
  session.startTransaction();
  try {
    const rental = await Rentals.findByIdAndDelete(req.params.id);
    if (!rental) {
      return res.status("404").send("Rental details not found to delete");
    }
    await Book.findByIdAndUpdate(rental.book._id, {
      $inc: { numberInStocks: 1 },
    });
    session.abortTransaction();
    session.endSession();
    res.send(rental);
  } catch (error) {
    res.send(error);
    session.abortTransaction();
    session.endSession();
  }
});
module.exports = router;
