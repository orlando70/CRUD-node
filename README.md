# CRUD-node

This is a simple express application that connects to database and performs CRUD operations

# Heroku URL
https://crud-database-with-node.herokuapp.com/

# App Routes
Register a new user: 
Create
POST - /create
payload { "name": "string here", "email":"string here", "country": "string here" }

Fetch a user: 
Read
findAll
GET - /users
FindOne
GET - /user/id

Update existing user: 
Update
PUT - /update/id
payload { "name": "string here", "email":"string here", "country": "string here" }

Delete existing user: 
Delete
DELETE - /delete/id
