const knex = require("../controller/database")
const router = require('express').Router()

//API to get categories
router.get("/categories", (req, res) => {
    knex.select("*").from("category").then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

//API to get categories by id
router.get("/categories/:id", (req, res) => {
    knex.select("*").from("category").where("category_id", req.params.id).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

//API to get categories by product-id
router.get("/category/product/:id", (req, res) => {
    knex.select("category.category_id", "department_id", "name")
    .from("category").join("product_category", function () {
            this.on("category.category_id", "product_category.category_id")
        })
        .where("product_category.product_id", req.params.id).then((data) => {
            res.send(data)

        }).catch((err) => {
            console.log(err)
        })
})

//API to get categories by department-id
router.get("/category/department/:id",(req,res)=>{
    knex.select("category.category_id", "category.description", "category.name","department.department_id")
    .from("category").join("department",function(){
        this.on("category.department_id","=","department.department_id")
    }).where("department.department_id",req.params.id).then((data) => {
        res.send(data)

    }).catch((err) => {
        console.log(err)
    })
})

module.exports = router;
