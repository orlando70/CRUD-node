const express = require('express');
const app = express();
const mongoose = require('mongoose');
const {Schema} = mongoose;

const PORT = process.env.PORT || 5000
const connectionString = 'mongodb+srv://ogudoro1:ogudoro1@zuricrud.s1vju.mongodb.net/appDB?retryWrites=true&w=majority'

mongoose.connect(connectionString, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useFindAndModify: false
})

// Create Schema
const userSchema = new Schema({
    name: String,
    email: String,
    country: String
})

// Create a model from Schema
const Users = mongoose.model('users', userSchema);

// Initializing POST middleware
app.use(express.json())

// App homepage
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/public/routes.html')
})

// Redirect to postman if create link is used with a get request
app.get('/users/register', (req, res) => {
    res.status(200).json({message: "Kindly use postman to test this link."})
})

// Fetch users from database
app.get('/users', (req, res) => {
    Users.find({}, (err, user) => {
        if(err) {
            res.status(500).json({message: err});
        }
            return res.status(200).json({message: 'Successful', users: user})
    })
})

// Fetch one user from database
app.get('/users/:id', (req, res) => {
    Users.findById(req.params.id, (err, user) => {
        if(!user) {
            res.status(404).json({message: 'User not found'});
        }
        if(err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({message: 'Successful', user: user})
        }
    })
})

// Create and add a new user
app.post('/users/register', (req, res) => {
    Users.create({
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    }, (err, user) => {
        if(err) {
            res.status(500).json({message: err})
        } else {
            return res.status(200).json({message: 'New user added successfully', user: user})
        }
    })
    
})

// Update user
app.put('/users/update/:id', (req, res) => {
    Users.findOneAndUpdate({_id: req.params.id}, {
        name: req.body.name,
        email: req.body.email,
        country: req.body.country
    }, (err, user) => {
        if(!user) {
            res.status(500).json({message: 'User not found'})
        }
        if(err) {
            return res.status(400).json({message: err})
        } else {
            user.save((err, data) => {
                if(err) {
                    return res.status(500).json({message: err.message})
                } else {
                return res.status(200).json({message: 'New user updated successfully', user:data})
            }
            })
        }
    })
})

// Delete a user
app.delete('/users/delete/:id', (req, res) => {
    Users.findOneAndDelete({_id: req.params.id}, 
        (err, user) => {
        if(!user) {
            res.status(404).json({message: 'User not found'})
        } if(err) {
            return res.status(500).json({message: err})
        } else {
            return res.status(200).json({message: 'User deleted successfully', user:user})
        }
    })
    
})


app.listen(PORT, () => {
    console.log('server is running')
}) 