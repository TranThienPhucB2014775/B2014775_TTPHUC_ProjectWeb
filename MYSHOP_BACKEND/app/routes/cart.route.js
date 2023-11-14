const express = require("express");
const carts = require("../controllers/cart.controller");

const router = express.Router();

router.route("/")
    .post(carts.create)
    .put(carts.update)
router.route("/find") 
    .post(carts.findAll)
router.route("/delete") 
    .post(carts.delete)
router.route("/deleteall") 
    .post(carts.deleteAll)
module.exports = router;