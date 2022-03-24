const router = require("express").Router();
// const express = require("express");
// const path = require("path");
router.use("/departments", require("../model/departments"));
router.use("/categories", require("../model/categories"));
router.use("/attributes", require("../model/attributes"));
router.use("/product", require("../model/product"));
router.use("/customer", require("../model/customer"));





module.exports = router;