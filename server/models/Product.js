const mongoose = require('mongoose')
const {Schema} = mongoose

const productSchema = new Schema({
    title: String,
    price: Number,
    inventory_count: Number
});

mongoose.model('product', productSchema)