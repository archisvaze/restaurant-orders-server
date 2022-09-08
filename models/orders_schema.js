const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
    restaurant: { type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" },
    items: [],
    status: {
        type: String,
        required: true
    },
    total: {
        type: Number
    }
},
    {
        timestamps: true,
    })

module.exports = mongoose.model("Order", OrderSchema)