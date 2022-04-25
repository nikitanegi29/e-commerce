const knex = require("../controller/database")
const router = require('express').Router()



//API to generate unique-id for shopping cart
router.post("/generateUnique",(req,res)=>{
    var text=""
    var reference="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    for(var i=0;i<9;i++){
        text+=reference.charAt(Math.floor(Math.random() * reference.length))
    }
    var unique_id= text
    console.log(`Your unique Id is ${unique_id}`)
    res.send(unique_id)
    add_data={
        cart_id:unique_id,
        product_id:req.body.product_id,
        attributes:req.body.attributes,
        quantity: req.body.quantity,
        buy_now: req.body.buy_now,
        added_on:new Date()    
    }
    knex.select("*").from("shopping_cart").insert(add_data).then((data)=>{
        res.send(add_data)
    }).catch((err)=>{
        console.log(err)
    })
})


//API to get list ofproduct using cart-id
router.get("/products/:cartid",(req,res)=>{
    knex.select("shopping_cart.item_id","shopping_cart.product_id","shopping_cart.attributes","shopping_cart.quantity","product.name","product.price","product.image")
    .from("shopping_cart").join("product",function(){
        this.on("shopping_cart.product_id","=","product.product_id")
    }).where("shopping_cart.cart_id",req.params.cartid).then((data)=>{
        res.send(data)
    }).catch((err)=>{
        console.log(err)
    })
})


//API to update cart by item-id
// router.put("/update/:itemid",(req,res)=>{
//     update_data={
//         product_id:req.body.product_id,
//         attributes:req.body.attributes,
//         quantity: req.body.quantity,
//         buy_now: req.body.buy_now
//     }
//     knex.select("*").from("shopping_cart").update(update_data).where("item_id",req.params.itemid).then((data)=>{
//         res.send(update_data)
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// //API to delete cart-data by cart-id
// router.delete("/delete/:cartid",(req,res)=>{
//     knex.select("*").from("shopping_cart").where("cart_id",req.params.cartid).del().then((data)=>{
//         return res.send("Deletion successful")
//     }).catch((err)=>{
//         console.log(err)
//     })
// })

// //API to move product to save-for-later from shopping-cart by item id
// router.get('/saveForLater/:item_id', (req, res) => {
//     var item_id = req.params.item_id
//     knex.schema.hasTable('save_later')
//     .then((exists) => {
//         if(!exists){
//             return knex.schema.createTable('save_later', (table) => {
//                 table.integer('item_id', 100).primary();
//                 table.integer('product_id');
//                 table.string('cart_id', 30);
//                 table.string('attributes', 100);
//                 table.boolean('Item_Saved').default(1);
//             })
//         }
//         knex.select('cart_id', 'product_id', 'attributes')
//         .from('shopping_cart')
//         .where('item_id', item_id)
//         .then((data) => {
//             knex('save_later')
//             .insert({
//                 'item_id': item_id,
//                 'product_id' : data[0]['product_id'],
//                 'cart_id' : data[0]['cart_id'],
//                 'attributes' : data[0]['attributes']
//             })
//             .then(() => {
//                 knex.select('*').from('save_later')
//                 .then((data) => {
//                     res.json(data)
//                     knex('shopping_cart')
//                     .where('item_id', item_id)
//                     .del()
//                     .then(()=>{          
//                     })
//                 });
//             });    
//         });
//     });
// });

//API to move product to save-for-later from shopping-cart by cart-id
router.get('/saveForLater/:cart_id', (req, res) => {
    var cart_id = req.params.cart_id
    knex.schema.hasTable('save_later')
    .then((exists) => {
        if(!exists){
            return knex.schema.createTable('save_later', (table) => {
                table.integer('item_id', 100).primary();
                table.integer('product_id');
                table.string('cart_id', 30);
                table.string('attributes', 100);
                table.boolean('Item_Saved').default(1);
            })
        }
        knex.select('item_id','cart_id', 'product_id', 'attributes')
        .from('shopping_cart')
        .where('cart_id', cart_id)
        .then((data) => {
            knex('save_later')
            .insert({
                'cart_id': cart_id,
                'product_id' : data[0]['product_id'],
                'item_id' : data[0]['item_id'],
                'attributes' : data[0]['attributes']
            })
            .then(() => {
                knex.select('*').from('save_later')
                .then((data) => {
                    // res.json(data)
                    knex('shopping_cart')
                    .where('cart_id', cart_id)
                    .del()
                    .then(()=>{          
                    })
                });
            });    
        });
    });
});










module.exports = router