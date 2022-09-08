# Food Ordering App Backend

## Endpoint: /restaurants

- POST /restaurants/ : Creates new restaurant
- Headers: {"Content-Type": "application/json"}
- Body: (example)
```
{
    "name": "Starbucks"
}
```

- Get /restaurants/ : List all restaurants
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
            {
                "_id": "63199efc500dcf0d6e0ea198",
                "name": "Coca-Cola",
                "price": 70
            },
            {
                "_id": "63199f0c500dcf0d6e0ea19c",
                "name": "Mac Maharaja",
                "price": 300
            },
            {
                "_id": "63199f18500dcf0d6e0ea1a0",
                "name": "Water",
                "price": 20
            }
        ],
        "orders": [
            {
                "_id": "63199fee3be7287d16e85860",
                "total": 520,
                "status": "pending",
                "items": [
                    {
                        "_id": "63199ef2500dcf0d6e0ea194",
                        "name": "McChicken",
                        "price": 150,
                        "__v": 0
                    },
                    {
                        "_id": "63199efc500dcf0d6e0ea198",
                        "name": "Coca-Cola",
                        "price": 70,
                        "__v": 0
                    },
                    {
                        "_id": "63199f0c500dcf0d6e0ea19c",
                        "name": "Mac Maharaja",
                        "price": 300,
                        "__v": 0
                    }
                ]
            }
        ],
        "__v": 0
    },
    {
        "_id": "6319b2798d7ea5f5559d14fd",
        "name": "Starbucks",
        "dishes": [
            {
                "_id": "6319b2b08d7ea5f5559d14ff",
                "name": "Vanilla Latte",
                "price": 200
            }
        ],
        "orders": [
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
        ],
        "__v": 0
    }
]
```