const knex = require("../controller/database")
const router = require('express').Router()

//API to get all shipping-region
router.get("/shipping/region",(req,res)=>{
    knex.select("*").from("shipping_region").then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})

//API to get shipping-region by id
router.get("/shipping/region/:id",(req,res)=>{
    knex.select("*").from("shipping_region").where("shipping_region_id",req.params.id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
}) 

module.exports=router