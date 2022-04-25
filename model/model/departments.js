// const { default: knex } = require("knex")
const knex = require("../controller/database")
const router=require('express').Router()
// const router = express()


//API to get department 
router.get("/department",(req,res)=>{
    // res.send("hello")

    knex.select("*")
    .from("department")
    .then((data) => {
        res.send(data)
        console.log(data);
    }).catch((err) => {
        console.log(err);
    })
})


//API to get department from id
router.get("/department/:id", async (req,res)=>{
    await knex.select("*").from("department").where("department_id",req.params.id).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})



module.exports= router;