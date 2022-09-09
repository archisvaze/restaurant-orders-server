# Restaurant Orders Server

### URL https://archis-restaurants.herokuapp.com/

### All Endpoints except /auth require: 
- Headers: {"Authorization": "Bearer TOKEN"}
### Auth Endpoints: 
- /auth/signup
- /auth/login


## Endpoint: /restaurants

### POST /restaurants/ : Creates new restaurant
- Headers: {"Content-Type": "application/json"}
- Body: (example)
```
{
    "name": "Starbucks"
}
```

### Get /restaurants/ : List all restaurants
- Response : (example)
```
[
    {
        "_id": "63199ed7500dcf0d6e0ea192",
        "name": "McDonalds",
        "dishes": [
            {
                "_id": "63199ef2500dcf0d6e0ea194",
                "name": "McChicken",
                "price": 150
            },
        ],
        "orders": [],
        "__v": 0
    },
    {
        "_id": "6319b2798d7ea5f5559d14fd",
        "name": "Starbucks",
        "dishes": [],
        "orders": [],
        "__v": 0
    }
]
```

### Get /restaurants/:id : Details of restaurants with all dishes offered

### POST /restuarants/:id/add-dish: Add new dish for a restaurant
- Headers: {"Content-Type": "application/json"}
- Body: (example)
```
{
    "name": "Vanilla Latte",
    "price": 200
}
```
- Response : (example)
```
{
    "message": "Dish added to restaurant with id: 6319b2798d7ea5f5559d14fd"
}
```

### GET /restaurants/:id/orders: Get all orders of a restaurant,filter by passing ?status=pending or status=complete
- Response : (example)
```
[
    {
        "_id": "6319b2ed8d7ea5f5559d1508",
        "items": [
            {
                "_id": "6319b2b08d7ea5f5559d14ff",
                "name": "Vanilla Latte",
                "price": 200,
                "__v": 0
            },
            {
                "_id": "6319b2b08d7ea5f5559d14ff",
                "name": "Vanilla Latte",
                "price": 200,
                "__v": 0
            }
        ],
        "status": "pending",
        "total": 400
    }
]
```

### GET /restaurants/:id/revenue?start_date=2022-09-08: Get revenue of a restaurant for given time range. end_date default would be today's date
- Query (example) restaurants/63199ed7500dcf0d6e0ea192/revenue?start_date=2022-09-08
- Response : (example)
```
{
    "startDate": "2022-09-08",
    "revenue": 520
}
```


## Endpoint: /orders

### POST orders/ : Creates new Order
- Headers: {"Content-Type": "application/json"}
- Body: (example)
```
{
    "restaurantID" : "6319b2798d7ea5f5559d14fd",
    "items": ["6319b2b08d7ea5f5559d14ff", "6319b2b08d7ea5f5559d14ff"],
    "status": "pending"
}
```
- Response : (example)
```
{
    "message": "Order Created for restaurant: 6319b2798d7ea5f5559d14fdwith OrderID 6319b2ed8d7ea5f5559d1508"
}
```

### GET /orders/:id: Get details of any order

### POST /orders/:id/update: Change status of any order
- Headers: {"Content-Type": "application/json"}
- Body: (example)
```
{
    "status": "complete"
}
```
- Response : (example)
```
{
    "message": "Order Updated with status: complete"
}
```
