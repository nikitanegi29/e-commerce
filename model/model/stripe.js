const knex = require("../controller/database")
const router = require('express').Router()
const stripe= require('stripe')("sk_test_51KixrYSJsnficQ1WHWhId8uQVtLsKCFm5Xwvt4BwlCWqw3OhskyVWStJXRDsucKN4JJ7C2bHmslLhmpY0co70nMb00fWXSYgTO")


router.get("/stripeTable", (req, res) => {
    knex.schema.hasTable('Transaction')
        .then((exists) => {
            if (!exists) {
                return knex.schema.createTable('Transaction', (table) => {
                    table.integer('transaction_id', 100).primary();
                    table.integer('card_number', 13);
                    table.integer('Amount');
                    table.integer('Date');
                })
            }
        })
        const publishiable_key="pk_test_51KixrYSJsnficQ1WtN9mVk2O4bYobjSNMaEUIL62ifsQFHj3YVPLZ65g9gwikmX7uCFo99PSeQlYxQ1G3kpJNgIS00vc5c6wQP"
        res.send(publishiable_key)
})

router.post("/payment",(req,res)=>{
    var token;
    stripe.Transaction({
        "token":req.headers.authorization,
        "card_number": req.body.card_number,
        "Amount":req.body.Amount,
        "Date": new Date()
    }).then((customer)=>{
        return stripe.charges.create({
            amount:5000,
            description:"e-commerce product",
            currency:"Rupee",
            customer: customer.id
        })
    }).then((charge)=>{
        console.log(charge)
        res.send("Success")

    }).catch((err)=>{
        res.send(err)
    })
})


module.exports = router;