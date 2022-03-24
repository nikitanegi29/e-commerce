const knex = require("../controller/database")
const router = require('express').Router()

//API to get all attributes
router.get("/attributes", (req, res) => {
    knex.select("*").from("attribute").then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})


//API to get all attributes by id
router.get("/attributes/:id", (req, res) => {
    knex.select("*").from("attribute").where("attribute_id", req.params.id).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

//API to get attribute value from attributes
router.get("/attributes/values/:id", (req, res) => {
    knex.select("attribute_value_id", "value").from("attribute_value")
        .where("attribute_value_id", req.params.id).then((data) => {
            res.send(data)
        }).catch((err) => {
            console.log(err)
        })
})

//API to get attributes by product-id
router.get("/attributes/product/:id", (req, res) => {
    knex.select("attribute.name","attribute_value.attribute_value_id","attribute_value.value")
        .from("attribute_value")

        .join("attribute", function () {
            this.on("attribute.attribute_id", "=", "attribute_value.attribute_id")
        })
        .join("product_attribute", function () {
            this.on("attribute_value.attribute_value_id", "=", "product_attribute.attribute_value_id")
        }).where("product_attribute.product_id", req.params.id).then((data) => {
            res.send(data)

        }).catch((err) => {
            console.log(err)
        })
})

module.exports = router