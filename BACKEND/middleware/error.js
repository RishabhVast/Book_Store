const winston = require("winston");
module.exports = function (error, req, res, next) {
  console.log(`this is `,error);
  winston.error(`${error.message}, error caught at : ${Date()}`);
  res.status(400).send(`Somthing went wrong, ${error.message}`);
};
