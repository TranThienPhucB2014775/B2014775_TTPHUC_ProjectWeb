const express = require("express");
const carts = require("../controllers/cart.controller");

const router = express.Router();

router.route("/")
    .delete(carts.deleteAll)
    .post(carts.create)
    .put(carts.update)
    router.route("/find") 
    .post(carts.findAll)
module.exports = router;