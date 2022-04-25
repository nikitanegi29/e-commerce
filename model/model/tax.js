const knex = require("../controller/database")
const router = require('express').Router()


//API to get all taxes
router.get("/tax",(req,res)=>{
    knex.select("*").from("tax").then((data)=>{
        res.send(data)
        console.log(data)
    }).catch((err)=>{
        console.log(err)
    })
})

//API to get tax by tax-id
router.get("/tax/:id",(req,res)=>{
    knex.select("*").from("tax").where("tax_id",req.params.id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})

module.exports = router