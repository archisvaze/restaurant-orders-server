# Food Ordering App Backend

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
- Query (example) restaurants/63199ed7500dcf0d6e0ea192/revenue?start_date=2022-09-08
- Response : (example)
```
{
    "startDate": "2022-09-08",
    "revenue": 520
}
```


