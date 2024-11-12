const mongoose = require('mongoose');
const menu_schema = new mongoose.Schema({
    image:{type:String,require:true},
    title: { type: String, required: true },
    content: { type: String, required: true },
    price: { type: Number, required: true },
});

module.exports = mongoose.model('menu', menu_schema);
    