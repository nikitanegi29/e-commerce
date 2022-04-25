// const knex = require("../controller/database")
// const router = require('express').Router()
// const jwt = require("jsonwebtoken")
// const passport = require('passport')
// const FacebookStrategy = require('passport-facebook').Strategy
// const session=require('express-session')

// //API to register into customer
// router.post("/customer", (req, res) => {
//     add_data = {
//         name: req.body.name,
//         email: req.body.email,
//         password: req.body.password,
//         credit_card: req.body.credit_card,
//         address_1: req.body.address_1,
//         address_2: req.body.address_2,
//         city: req.body.city,
//         region: req.body.region,
//         postal_code: req.body.postal_code,
//         country: req.body.country,
//         shipping_region_id: req.body.shipping_region_id,
//         day_phone: req.body.day_phone,
//         eve_phone: req.body.eve_phone,
//         mob_phone: req.body.mob_phone
//     }
//     if (add_data.name === undefined || add_data.email === undefined || add_data.password === undefined) {
//         console.log({ "Suggetion": "name, email and password all are required" });
//         res.send({ "Suggetion": "name, email and password all are required" });
//     } else {
//         // var accessToken = jwt.sign(req.body, "123", { expiresIn: "24h" })
//         // console.log(accessToken );
//         // res.send({"Token": accessToken})
//         knex
//             .select('*')
//             .from('customer')
//             .where({ "email": add_data.email })
//             .then((data) => {
//                 // console.log(data);
//                 if (data.length < 1) {
//                     knex('customer').insert(add_data)
//                         .then((result) => {

//                             res.send(add_data);
//                         })
//                         .catch((err) => {
//                             console.log(err);
//                         })
//                 } else {
//                     res.send({
//                         "exist": "this user alredy exists.."
//                     })
//                 }
//             })
//     }
// })

// //API for customer login
// router.post("/login", (req, res) => {
//     var email = req.body.email
//     // var password = req.body.password
//     knex.select("*").from("customer").where("email", email).then((data) => {
//         if (data.length > 0) {

//             if (data[0].email == req.body.email) {
//                 if (data[0].password == req.body.password) {
//                     let accessToken = jwt.sign({ email: data.email }, 'nikita', { expiresIn: "24h" })
//                     res.cookie('nikita', accessToken)
//                     delete data[0].email
//                     let token = req.headers.cookie
//                     console.log(token)
//                     res.send("Login")

//                 }
//                 else {
//                     res.send("password incorrect")
//                 }
//             }

//         } else {
//             res.send("Password or email is invalid")
//         }
//     }).catch((err) => {
//         console.log(err)
//     })
// })

// //API to update a customer
// router.patch("/update/:id", (req, res) => {
//     knex.select("*").from("customer").update(req.body)
//         .where("customer_id", req.params.id).then((data) => {
//             return res.send(data)
//         }).catch((err) => {
//             console.log(err)
//         })
// })

// //API to update customer address
// router.patch("/updateAddress", (req, res) => {

//     // let token=req.headers.cookies
//     // let c=token.slice(7)
//     // console.log(c)
//     var decoded = jwt.verify(req.headers.authorization, 'nikita')
//     knex.select("*").from("customer").update(req.body).where("email", decoded.email).then((data) => {
//         res.send("Data updated successfulyy")
//     }).catch((err) => {
//         res.send("updation unsuccessful")
//         console.log(err)
//     })
// })


// //API to update customer credit card
// router.patch("/updateCreditcard", (req, res) => {

//     // let token=req.headers.cookies
//     // let c=token.slice(7)
//     // console.log(c)
//     var decoded = jwt.verify(req.headers.authorization, 'nikita')
//     knex.select("*").from("customer").update(req.body).where("email", decoded.email).then((data) => {
//         res.send("Data updated successfulyy")
//     }).catch((err) => {
//         res.send("updation unsuccessful")
//         console.log(err)
//     })
// })


// router.use(session({
//     resave: false,
//     saveUninitialized: true,
//     secret: 'SECRET'
//   }));

// router.use(passport.initialize());
// router.use(passport.session())












// passport.serializeUser(function (user, done) {
//     done(null, user.id);
// });

// passport.deserializeUser(function (obj, done) {
//     done(null, obj);
// });

// passport.use(new FacebookStrategy({
//     clientID: "647654296535218",
//     clientSecret: "1b55503ce5320ec57fe2f56c76ca61ae",
//     callbackURL: "http://localhost:4500/facebook/callback",
//     profileFields: ['id', 'displayName', 'name', 'gender', 'email']
// },
//     function (accessToken, refreshToken, profile, done) {
//         process.nextTick(function () {
//             knex.select("*").from("customer").where("customer_id", profile.id).then((err, data) => {
//                 if (err) {
//                     return console.log(err)
//                 } else if (data && data.length === 0) {
//                     knex.select("*").from("customers")
//                     // .insert({
//                     //     "customer_id": req.body.customer_id,
//                     //     "name": req.body.name,
//                     //     "email": req.body.email,
//                     //     "password": req.body.password
//                     // })
//                     .then((result) => {
//                         res.send(result)
//                     })
//                 } else {
//                     console.log("User already exists in database")
//                 }
//             })
//             return done(null, profile);
//         });
//     }
// ));


// router.get('/auth/facebook/callback',(req,res)=>{
//   passport.authenticate('facebook',(data,err) {
//     res.send(data)

//   });

// })








 





// //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE2NDgxOTk5MjQsImV4cCI6MTY0ODI4NjMyNH0.uZS2JmLYrDL93lBCbtCmaISUUvvEWzCQBgTbJ3eB2b8
// module.exports = router;

