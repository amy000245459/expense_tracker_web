# Simple Expense Tracker
This is simple web to track daily expense.
The web is built with Express.js + Bootstrap

# DB
this web is connected to local mongo DB. To start server, one needs to create `.env` file which incudle:
```
MONGODB_URI= YOUR_MONGODB_API_KEY

PORT= YOUR_PORT_NUMBER (1025 to 65536,)
```

# Models
- Record
  - date
  - amount
  - user
  - category 
- Category
  - name 
- User
  - name
  - password   
