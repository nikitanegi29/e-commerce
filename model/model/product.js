const { Knex } = require("knex")
const knex = require("../controller/database")
const router = require('express').Router()

//API to get all products
router.get("/products", (req, res) => {
    knex.select("*").from("product").then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

//API to get products by id
router.get("/products/:id", (req, res) => {
    knex.select("*").from("product").where("product_id", req.params.id).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

//API to search product by name
// router.get("/products/:search",(req,res)=>{
//     knex.select("*").from("product").whereLike("name",`%${req.params.search}%`).then((data)=>{
//         res.send(data)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })
// router.get("products/search",(req,res)=>{
//     search1 = {
//         name: req.query.name
//     }
//     knex.select("*").from("product").whereLike("name",`${search1}`).then((data)=>{
//         res.send(data)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

//API to get product by category-id
router.get("/product/category/:id", (req, res) => {
    knex.select("*").from("product").join("product_category", function () {
        this.on("product.product_id", "=", "product_category.product_id")
    }).where("product_category.category_id", req.params.id).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

//API to get product by department-id
router.get("/product/department/:id", (req, res) => {
    knex.select("*").from("product").join("department", function () {
        this.on("product.product_id", "=", "department.department_id")
    }).where("department.department_id", req.params.id).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

//API to get product details with specific columns
router.get("/products/details/:id", (req, res) => {
    knex.select("product_id", "name", "description", "price", "discounted_price", "image", "image_2").from("product").where("product_id", req.params.id).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})

router.get("/product/location/:id", (req, res) => {
    knex.select("category.category_id", "category.name", "department.department_id", "department.name  ")
        .from("category")

        .join("product_category", function () {
            this.on("category.category_id", "=", "product_category.category_id")
        })
        .join("department", function () {
            this.on("category.department_id", "=", "department.department_id")
        }).where("product_category.product_id", req.params.id).then((data) => {
            res.send(data)

        }).catch((err) => {
            console.log(err)
        })

})

router.post("/product/reviews/:id", (req, res) => {
    let data = {
        review_id: req.body.review_id,
        customer_id: req.body.customer_id,
        review: req.body.review,
        rating: req.body.rating,
        created_on: new Date()
    }
    knex.select("*").from("review")
        .insert(data).then(() => {
            knex.select("product_id", "review_id", "customer_id", "review", "rating", "created_on").from("review")
                .join("product", function () {
                    this.on("review.product_id", "=", "product.product_id")
                })
                .where("product.product_id", req.params.id).then((info) => {
                    res.send(info)
                }).catch((err) => {
                    console.log(err)
                })

        })
})

//API to get location of product by product-id
router.get("/product/location/:productid", (req, res) => {
    knex.select("category.category_id", "category.name", "department.department_id", "department.name").from("category").join("product_category", function () {
        this.on("category.category_id", "=", "product_attribute.category_id")
    }).join("department", function () {
        this.on("category.department_id", "=", "department.department_id")
    }).where("product_category.product_id", req.params.productid).then((data) => {
        res.send(data)
    }).catch((err) => {
        console.log(err)
    })
})


//API to post data into reviews
router.post("/product/reviews/:productid", (req, res) => {
    var productid = req.params.productid
    knex.select().from("product").where("product_id", productid).then((data) => {
        res.send(data)

        knex("review").insert({
            //     "customer_id": req.body.customer_id,
            //     'product_id':productid ,
            //     "review": req.body.review,
            //     "rating": req.body.rating,
            //     "created_on": new Date()

        }).then(() => {
            knex.select("*").from("review").then((data) => {
                res.send(data)
            })
        }).catch((err) => {
            console.log(err)
        })
    })

})




router.post("/product1/reviews/:productid", (req, res) => {
    
    var productid = req.params.productid
    knex.select().from("product").where("product_id", productid).then((data) => {
        // res.send(data)
        knex("review").insert({
            "customer_id": text,
            'product_id': productid,
            "review": req.body.review,
            "rating": req.body.rating,
            "created_on": new Date()

        }).then((data) => {
            knex.select("*").from("review").then((data) => {
                res.send(data)
            })
        }).catch((err) => {
            res.send(err)
        })



    }).catch((err) => {
        console.log(err)

    })
})


//API to get all reviews
router.get('/reviews/:productid',(req,res)=>{
    knex.select("*").from("review").where("product_id",req.params.productid).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})
module.exports = router