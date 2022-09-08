const mongoose = require("mongoose");

const RestaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    dishes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Dish" }],
    orders: [{ type: mongoose.Schema.Types.ObjectId, ref: "Order" }]
})

module.exports = mongoose.model("Restaurant", RestaurantSchema)