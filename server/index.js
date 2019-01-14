//all necessary require statements
const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const bodyParser = require('body-parser');
require('./models/Product')

mongoose.connect(keys.mongoURI); //connect to mongoDB database

const app = express(); //create instance of express application

app.use(bodyParser.json()); //bodyparser parses the JSON req body so that it can be easily used

require('./routes/mainRoutes')(app); //add the routes onto the app object

const PORT = keys.localHostPort; //retrieves the port from config file
app.listen(PORT); //starts up the server