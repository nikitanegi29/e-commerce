const router = require("express").Router();
// const express = require("express");
// const path = require("path");
router.use("/departments", require("../model/departments"));
router.use("/categories", require("../model/categories"));
router.use("/attributes", require("../model/attributes"));
router.use("/product", require("../model/product"));
// router.use("/customer", require("../model/customer"));
router.use("/orders", require("../model/orders"));
router.use("/shoppingCart", require("../model/shopping_cart"));
router.use("/tax", require("../model/tax"));
router.use("/shippingRegion", require("../model/shipping_region"));
router.use("/stripe", require("../model/stripe"));
router.use("/demo", require("../demo"));
router.use("/demo1", require("../demo1"));









module.exports = router;