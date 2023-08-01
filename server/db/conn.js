const mongoose = require("mongoose");

const DB = process.env.MONGO_URI;

mongoose
  .connect(DB, {
    socketTimeoutMS: 1000,
    w: "majority",
    authSource: "admin",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`Connected to daju mernstack`);
  })
  .catch((err) => {
    console.error(err);
  });
