const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const cookieSession = require('cookie-session');

const keys = require('./config/keys');
require('./models/user');
require('./services/passport');

// Connecting to mlab mongodb
mongoose.connect(keys.mongoURI);

const app = express();

app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 60 * 1000,
    keys: [ keys.cookieSession ]
  })
);
app.use(passport.initialize());
app.use(passport.session());

// Routes
require('./routes/authRoute')(app);

const PORT = process.env.PORT || 5000;
app.listen(PORT);
