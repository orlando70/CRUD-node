# CRUD-node

This is a simple express application that connects to database and performs CRUD operations

# Heroku URL
https://crud-database-with-node.herokuapp.com/

# App Routes
Register a new user: 
Create
POST - /users/register,
payload 
{ "name",
"email", 
"country"
}
#
Fetch all users: 
Read
findAll
GET - /users
#
Fetch a user: 
Read
FindOne
GET - /users/id
#
Update existing user: 
Update
PUT - /users/update/id,
payload { "name", "email", "country" }
#
Delete existing user: 
Delete
DELETE - /users/delete/id
