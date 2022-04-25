const knex = require("../controller/database")
const router = require('express').Router()

router.post("/addOrders",(req,res)=>{
    add_data={
        total_amount:req.body.total_amount,
        created_on:new Date(),
        shipped_on:new Date(),
        status:req.body.status,
        comments:req.body.comments,
        customer_id:req.body.customer_id,
        auth_code:req.body.auth_code,
        reference:req.body.reference,
        shipping_id:req.body.shipping_code,
        tax_id:req.body.tax_id
    }
    knex.select("*").from("orders").insert(add_data).then((data)=>{
        res.send(add_data)
    }).catch((err)=>{
        console.log(err)
    })
})

//API to get orders by order-id
router.get("/orders/:id",(req,res)=>{
    knex.select("*").from("orders").where("order_id",req.params.id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})


//API to get orders by customer
router.get("/orders/customers/:id",(req,res)=>{
    knex.select("*").from("orders")
    .join("customer",function(){
        this.on("orders.customer_id","=","customer.customer_id")
    }).where("customer.customer_id",req.params.id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})


router.get("/order/:email",(req,res)=>{
    knex("orders")
    .join('customer','customer.customer_id','orders.customer_id')
    .where('customer.email',req.params.email)
    .then((ordersData)=>{
        if (ordersData.length != 0) {
            return res.send(ordersData)
        }
        res.status(400).send({
            "code": "USR_02",
            "message": "The field example is empty.",
            "field": "example",
            "status": "500"
        })
    })
    .catch((ar)=>{
        console.log(ar);
    })
})

//API to get specific data from orders table
router.get("/orderDetails",(req,res)=>{
    knex.select("order_id","total_amount","status").from("orders").then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})


module.exports = router