const mongoose = require("mongoose");

const ManagerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    restaurants: [{ type: mongoose.Schema.Types.ObjectId, ref: "Restaurant" }]
}, {
    timestamps: true,
})

module.exports = mongoose.model("Manager", ManagerSchema)