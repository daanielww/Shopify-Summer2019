const mongoose = require('mongoose')
const Product = mongoose.model('product')
const Cart = mongoose.model('cart')

module.exports = (app) => {
    
    //route to setup demo database
    app.post('/api/demo', async (req,res) => {
        await Product.collection.drop()

        const apple = new Product({
            title: "apple",
            price: 1,
            inventory_count: 10
        })

        const orange = new Product({
            title: "orange",
            price: 5,
            inventory_count: 25
        })

        const grape = new Product({
            title: "grape",
            price: 10,
            inventory_count: 0
        })

        await apple.save()
        await orange.save()
        await grape.save()

        res.send({success:"demo database setup complete"})
    });
    
    //api route for retrieving all or only available items
    app.get('/api/products/:option', async (req,res) => {
        const option = req.params.option
        if (option == "available"){
            var query = Product.find({inventory_count: { $gt: 0 }})
        } else if (option == "all") {
            var query = Product.find({})
        } else {
            res.status(400).send({error:'invalid command'})
        }
        products = await query.exec()
        res.send(products)
    });

    //api route for getting single item by id
    app.get('/api/products/single/:id', async (req,res) =>{
        var item = await Product.findOne({ title: req.params.id })
        if (!item){
            res.status(400).send({error:'cannot find product'})
        } else {
            res.send(item)
        }
    });

    //api route for item purchases
    app.post('/api/products/:id/purchase', async (req,res) =>{
        var item = await Product.findOne({ title: req.params.id })
        if (!item) {
            res.status(400).send({error: "cannot find item"})
        } else if (item.inventory_count == 0){
            res.status(400).send({error:'cannot purchase, not enough inventory'}) 
        } else {
            item.inventory_count -= 1;
            const newItem = await item.save();
            res.send({success:'purchase complete', product: newItem})
        }
    });

    //api route to add to cart
    app.post('/api/products/:id/:number/add', async (req, res) => {
        var item = await Product.findOne({ title: req.params.id })
        if (!item){
           return res.status(400).send({error:'cannot find product'})
        } else if (item.inventory_count < req.params.number){
           return res.status(400).send({error:'cannot add to cart, not enough inventory'})
        }
        cost = req.params.number * item.price
        var shopCart = await Cart.findOne({ owner: "admin" })
        if (!shopCart) {
            const newCart = new Cart({
                owner: "admin",
                products:[{
                    title: req.params.id,
                    amount: req.params.number
                }],
                total_price: cost
            })

            shopCart = newCart
        } else {
            var found = false;
            productsList = shopCart.products
            for(var i = 0; i < productsList.length; i++) {
                if (productsList[i].title == req.params.id) {
                    newValue = parseInt(productsList[i].amount) + parseInt(req.params.number)
                    if (item.inventory_count < newValue){
                        return res.status(400).send({error:'cannot add to cart, not enough inventory'})
                    }
                    
                    productsList[i].amount = newValue
                    found = true
                    break;
                }
            }
            if (!found){
                productsList.push({
                    title: req.params.id,
                    amount: req.params.number
                })
            }
            shopCart.total_price = parseInt(shopCart.total_price) + parseInt(cost)
        }
        const completedCart = await shopCart.save();
        res.send({success:'item added to cart', cart: completedCart})
    });

    //api route to checkout the cart
    app.post('/api/checkout', async (req,res) => {
        var shopCart = await Cart.findOne({ owner: "admin" })
        if (!shopCart) {
            return res.status(400).send({error:'Unable to Checkout; no cart created. Please add items to cart'})
        }


        shopCart.products.forEach(async (x) => {
            await Product.findOneAndUpdate({title: x.title}, {$inc: {inventory_count: -(x.amount)}}).exec()
        });

        await Cart.deleteOne({ owner: "admin" })

        Product.find({}, function (err, docs) {
            res.send({success:'checkout completed', remainingProducts: docs})
        })
        
    })

    //api route to get the cart
    app.get('/api/cart', async (req,res) => {
        var shopCart = await Cart.findOne({ owner: "admin" })
        if (!shopCart) {
            res.status(400).send({error:'Unable to find cart'})
        } else{
            res.send({success:'found cart', cart: shopCart})
        }

    })

    //root route
    app.get('/', (req, res) => {
        res.send('<h1>Daniel Wang Shopify Summer 2019 Back-end Challenge</h1>')
    });
}