const mongoose = require('mongoose')
const {Schema} = mongoose

//MongoDB Product model
const productSchema = new Schema({
    owner: String,
    products: [{
        title : String,
        amount : Number
    }],
    total_price: { type: String, default: 0 }
});

mongoose.model('cart', productSchema)