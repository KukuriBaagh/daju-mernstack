const express = require('express');
const router = express.Router();

// hompage
router.get('/', (req, res) => {
    res.send("Hello From Router js");
});

router.post('/register', (req, res) => {
    console.log(req.body);
    res.json({ msg: req.body })
});

module.exports = router;