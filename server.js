const express = require("express");
const app = express();
const cors = require("cors");
const jwt = require("jsonwebtoken")
require("dotenv").config();
app.use(express.urlencoded({ extended: false }));
//connect to mongoDB

const mongoose = require("mongoose");
const url = process.env.URL;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
};
mongoose
    .connect(url, connectionParams)
    .then(() => {
        console.log("Connected to database " + url);
    })
    .catch((err) => {
        console.log("Error connecting to DB")
    })


const server = app.listen(process.env.PORT || 8000, () => {
    const port = server.address().port;
    console.log(`Express is working on port ${port}`)
})

app.use(cors());
app.use(express.static("public"));
app.use(express.json());

//routes
const authRouter = require("./routes/auth_router")
app.use('/auth', authRouter)

//call middleware
app.use(authenticateMiddleware)

const restaurantRouter = require("./routes/restaurants_router")
app.use('/restaurants', restaurantRouter)

const orderRouter = require("./routes/orders_router")
app.use('/orders', orderRouter);



function authenticateMiddleware(req, res, next) {
    const authHeader = req.headers["authorization"];

    if (authHeader === undefined) {
        return res.status(400).json({ error: "No token was provided" })
    }

    const token = authHeader.split(" ")[1];
    if (token === undefined) {
        return res.status(400).json({ error: "Proper token was provided" })
    }

    try {
        const payload = jwt.verify(token, process.env.ACCESS_TOKEN);
        console.log(payload)
        next()
    } catch (error) {
        return res.status(400).json({ error: error })
    }
}