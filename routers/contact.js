const express = require("express");
const router = express.Router();
const { contact

} = require("../controllers/contact");

const { auth, isAdmin } = require("../middleware/auth")

// 👉 Admin Routes
router.post("/contact", contact);


module.exports = router;
