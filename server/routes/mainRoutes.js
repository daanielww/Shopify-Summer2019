const mongoose = require('mongoose')
const Product = mongoose.model('product')

module.exports = (app) => {
    app.get('/api/demo', async (req,res) => {
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

    app.get('/api/products/single/:id', async (req,res) =>{
        console.log("asd")
        var item = await Product.findOne({ title: req.params.id })
        if (!item){
            res.status(400).send({error:'cannot find product'})
        } else {
            res.send(item)
        }
    });

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
}