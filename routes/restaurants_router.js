const express = require("express");
const Restaurants_Collection = require("../models/restaurants_schema");
const Dishes_Collection = require("../models/dish_schema")

let router = express.Router();

//create new restaurant 
router.post("/", async (req, res) => {
    let { name } = req.body;
    console.log("Creating new restaurant called " + name);

    let newRestaurant = new Restaurants_Collection({
        name
    });
    try {
        let savedRestaurant = await newRestaurant.save();
        return res.status(200).json(savedRestaurant)
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})


//get all restaurant

router.get("/", async (req, res) => {
    console.log("Getting all restaurants in database...");
    try {
        let restaurants = await Restaurants_Collection.find({})
            .populate("dishes", "name price")
            .populate("orders", "status total items")
        return res.status(200).json(restaurants);
    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }

})

//get Details of a restaurant by id
router.get("/:id", async (req, res) => {
    console.log("Getting Resturant Info...");
    try {
        let restaurant = await Restaurants_Collection.findById(req.params.id)
            .populate("dishes", "name price")
            .populate("orders", "status total items");
        return res.status(200).json(restaurant)

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})


//add new dish to a restaurant
router.post("/:id/add-dish", async (req, res) => {
    let { name, price } = req.body;

    try {
        let newDish = new Dishes_Collection({
            name, price: price
        });
        let savedDish = await newDish.save();
        let restaurant = await Restaurants_Collection.findById(req.params.id);
        let updatedRestaurant = JSON.parse(JSON.stringify(restaurant));
        updatedRestaurant["dishes"].push(savedDish._id);

        let response = await Restaurants_Collection.findOneAndReplace(
            { _id: req.params.id },
            updatedRestaurant
        )
        if (response) {
            return res.status(200).json({ message: "Dish added to restaurant with id: " + req.params.id })
        } else {
            return res.status(400).json({ error: "Cannot add Dish" })
        }

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})



//get all orders for a restaurant

router.get("/:id/orders", async (req, res) => {
    console.log("Getting all Orders for Restaurant with Id " + req.params.id)
    let query = req.query.status;
    let requiredOrders = [];
    try {

        let restaurant = await Restaurants_Collection.findById(req.params.id)
            .populate("dishes", "name price")
            .populate("orders", "status total items")

        if (query != undefined || query != null) {
            for (let order of restaurant.orders) {
                if (order?.status == query) {
                    requiredOrders.push(order);
                }
            }
            return res.status(200).json(requiredOrders)
        }
        else {
            return res.status(200).json(restaurant.orders)
        }

    } catch (error) {
        return res.status(400).json({
            error: error.message
        })
    }
})


module.exports = router;


