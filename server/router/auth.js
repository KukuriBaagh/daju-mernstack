const express = require("express");
const router = express.Router();

const User = require("../model/userSchema");
const bcrypt = require("bcryptjs/dist/bcrypt");
const jwt = require("jsonwebtoken");

// hompage
router.get("/", (req, res) => {
  res.send("Hello From Router js");
});

/** Register New User */
router.post("/register", async (req, res) => {
  /** Destructure the re.body to specific fields described in user Schema */
  const { name, email, phone, work, password, cpassword } = req.body;

  /** Check if any data is not been filled */
  if (!name || !email || !phone || !work || !password || !cpassword) {
    return res.status(422).json({ error: "Please Fill the form Properly...?" });
  }

  try {
    const userExist = await User.findOne({ email: email });

    if (userExist) {
      return res.status(422).json({ error: "Email already Exists !" });
    } else if (password != cpassword) {
      return res.status(422).json({ error: "confirm password failed" });
    } else {
      const user = new User({ name, email, phone, work, password, cpassword });

      await user.save();

      res.status(201).json({ message: "user registered successfully" });
    }
  } catch (err) {
    console.log(err);
  }
});

/** Login User */

router.post("/signin", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "plz fill the data" });
    }

    const userLogin = await User.findOne({ email: email });

    // console.log(isEmailExists);

    if (userLogin) {
      const isMatch = await bcrypt.compare(password, userLogin.password);

      const token = await userLogin.generateAuthToken();
      console.log(token);

      if (!isMatch) {
        res.status(400).json({ error: "invalid credentials" });
      } else {
        res.json({ message: "user signin successfull" });
      }
    } else {
      res.status(400).json({ error: "invalid credentials" });
    }
  } catch (err) {
    console.log(err);
  }
});

module.exports = router;
