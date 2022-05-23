const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectId = require("joi-objectid")(Joi);
const { number, string } = require("joi");
const { genreSchema } = require("./genreModel");
const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    minLength: 1,
    maxLength: 225,
    required: true,
    trim: true,
  },
  genre: { type: genreSchema, required: true },
  dailyRentalRate: {
    type: Number,
    min: 0,
    max: 255,
    required: true,
  },
  numberInStocks: {
    type: Number,
    minLength: 0,
    maxLength: 255,
    required: true,
  },
  liked: {
    type: Boolean,
    default: false,
  },
});
function bookInputValidation(input) { 
  const schema = Joi.object({
    title: Joi.string().min(1).max(255).required(),
    genreId: Joi.objectId().required(),
    dailyRentalRate: Joi.number().min(0).max(255).required(),
    numberInStocks: Joi.number().min(0).max(255).required(),
    liked: Joi.boolean().default(false),
  });
  return schema.validate(input);
}

const Book = mongoose.model("books", bookSchema);
module.exports.bookSchema = bookSchema;
module.exports.Book = Book;
module.exports.bookInputValidation = bookInputValidation;
