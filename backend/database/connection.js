const mongoose = require("mongoose");

require("dotenv").config();

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((db) => console.log("db is connected"))
  .catch((err) => console.error(err));

module.exports = mongoose;
