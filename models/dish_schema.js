const mongoose = require("mongoose");

const DishSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    }

})

module.exports = mongoose.model("Dish", DishSchema)