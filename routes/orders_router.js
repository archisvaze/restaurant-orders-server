const express = require("express");
const Restaurants_Collection = require("../models/restaurants_schema");
const Dishes_Collection = require("../models/dish_schema");
const Orders_Collection = require("../models/orders_schema");

let router = express.Router();


//create new order

router.post("/", async (req, res) => {
    let { restaurantID, items, status } = req.body;
    console.log("Creating new Order for " + restaurantID);
    let total = 0;
    let itemDetails = [];
    for (let dishID of items) {
        let dish = await Dishes_Collection.findById(dishID)
            .populate("name", "price");
        itemDetails.push(dish)
        total += Number(dish.price);
    }
    let newOrder = new Orders_Collection({
        restaurant: restaurantID,
        items: [...itemDetails],
        status,
        total
    })
    try {
        let savedOrder = await newOrder.save();
        let respectiveRestaurant = await Restaurants_Collection.findById(restaurantID);
        updatedRestaurant = JSON.parse(JSON.stringify(respectiveRestaurant));
        updatedRestaurant["orders"].push(savedOrder._id)

        let response = await Restaurants_Collection.findOneAndReplace(
            { _id: restaurantID },
            updatedRestaurant
        )
        if (response) {
            return res.status(200).json({ message: "Order Created for restaurant: " + restaurantID + "with OrderID " + savedOrder._id })
        } else {
            return res.status(400).json({ error: "Cannot create Order" })
        }

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})


//get details of order by id

router.get("/:id", async (req, res) => {
    console.log("Getting Order Info...");
    try {
        let order = await Orders_Collection.findById(req.params.id)
            .populate("restaurant", "name")

        return res.status(200).json(order)

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})

//update status of an order

router.post("/:id/update", async (req, res) => {
    console.log("Updating Order with Id " + req.params.id);
    try {

        let order = await Orders_Collection.findById(req.params.id);
        let updatedOrder = JSON.parse(JSON.stringify(order));
        updatedOrder["status"] = req.body.status;

        let response = await Orders_Collection.findOneAndReplace(
            { _id: req.params.id },
            updatedOrder
        )
        if (response) {
            return res.status(200).json({ message: "Order Updated with status: " + req.body.status })
        } else {
            return res.status(400).json({ error: "Cannot Update Order" })
        }

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})








module.exports = router;