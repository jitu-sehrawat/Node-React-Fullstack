const express = require('express');
const mongoose = require('mongoose');
const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

// Connecting to mlab mongodb
mongoose.connect(keys.mongoURI);

const app = express();

// Routes
require('./routes/authRoute')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
