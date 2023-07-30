const express = require('express');
const router = express.Router();

const User = require('../model/userSchema');


// hompage
router.get('/', (req, res) => {
    res.send("Hello From Router js");
});

router.post('/register', (req, res) => {

    /** Destructure the re.body to specific fields described in user Schema */
    const { name, email, phone, work, password, cpassword } = req.body ;

    /** Check if any data is not been filled */
    if (!name || !email || !phone || !work || !password || !cpassword) {
        return res.status(422).json({ error: "Please Fill the form Properly...?"});
    }

    User.findOne({ email: email})
    .then((userExist) => {
        if (userExist) {
            return res.status(422).json({ error: "Email already exist !" });
        }

        const user = new User({name, email, phone, work, password, cpassword});

        user.save().then(() => {
            res.status(201).json({ msg: "user regsitered successfully." })
        }).catch((err) => {
            res.status(500).json({ error: "Failed to register !" })
        })

    }).catch((err) => {
        res.status(500).json(err)
    });

});

module.exports = router;