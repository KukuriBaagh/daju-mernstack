const mongoose = require("mongoose");

const DB = process.env.MONGO_URI;

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log(`connection successful`);
  })
  .catch((err) => console.error(err));

//   mongoose
// .connect(DB, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log(`connection successful`))
// .catch((err) => {
//   console.log(err);
// });
