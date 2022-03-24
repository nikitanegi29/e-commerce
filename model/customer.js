const knex = require("../controller/database")
const router = require('express').Router()
const jwt = require("jsonwebtoken")

//API to register into customer
router.post("/customer", (req, res) => {
    add_data = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        credit_card: req.body.credit_card,
        address_1: req.body.address_1,
        address_2: req.body.address_2,
        city: req.body.city,
        region: req.body.region,
        postal_code: req.body.postal_code,
        country: req.body.country,
        shipping_region_id: req.body.shipping_region_id,
        day_phone: req.body.day_phone,
        eve_phone: req.body.eve_phone,
        mob_phone: req.body.mob_phone
    }
    if (add_data.name === undefined || add_data.email === undefined || add_data.password === undefined) {
        console.log({ "Suggetion": "name, email and password all are required" });
        res.send({ "Suggetion": "name, email and password all are required" });
    } else {
        // var accessToken = jwt.sign(req.body, "123", { expiresIn: "24h" })
        // console.log(accessToken );
        // res.send({"Token": accessToken})
        knex
            .select('*')
            .from('customer')
            .where({ "email": add_data.email })
            .then((data) => {
                // console.log(data);
                if (data.length < 1) {
                    knex('customer').insert(add_data)
                        .then((result) => {

                            res.send(add_data);
                        })
                        .catch((err) => {
                            console.log(err);
                        })
                } else {
                    res.send({
                        "exist": "this user alredy exists.."
                    })
                }
            })
    }
})

//API for customer login
router.post("/login",(req,res)=>{
    details={
        email:req.body.email,
        password:req.body.password
    }
    knex.select("*").from("customer").where({"email":details.email,}).where("password",details.password).then((data)=>{
        if(data[0].email === details.email && data[0].password === details.password){
            // return res.send("Login success")
            var accessToken = jwt.sign(details.password, "123", { expiresIn: "24h" })
            console.log(accessToken)
            return res.send("Login success")

        }
        else{
            return res.send("Incorrect email or password")
        }
    }).catch((err)=>{
        res.send(err)
    })
})


module.exports = router;

