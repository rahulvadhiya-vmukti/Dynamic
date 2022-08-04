//Importing modules
const express = require('express');

const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const cors = require('cors');
const errorHandler = require('./build/error-handler')
const ejs = require('ejs');
const bodyParser = require('body-parser');
const session = require('express-session');
const passport = require('passport');
const flash = require('connect-flash');
const _ = require("lodash");
//Configuring the enviroments file and turning it to constant
require('dotenv/config');
const CS = process.env.CONNECTION_STRING;
const port = process.env.PORT || 5000;

// Passport Config
require('./build/passport')(passport);

//Importing all the routes
const shopRouter = require('./routers/shop');
// const adminRouter = require('./routers/admin');
const searchRouter = require('./routers/search');


//Middleware

app.use(express.json());
app.use(morgan('tiny'));
app.use(cors());
app.options('*', cors());
app.use(express.static(__dirname + '/public'));
app.use(express.static(__dirname + '/wp-content'));
app.use(errorHandler)

// EJS

app.set('view engine','ejs');
app.set('views','views'); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true
}))

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global variables
app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    next();
  });

//Using all the routes

app.use(`/`, shopRouter);
app.use(`/`, searchRouter);
// app.use(`/admin`, adminRouter);
// Routes
app.use('/', require('./routers/index.js'));
app.use('/users', require('./routers/users.js'));



//Listening to port
app.listen(port, () => {
    console.log(`The server is running on port ${port}`)
    
    //Check if the database is working fine
    mongoose.connect(CS)
    .then(() => {
        console.log('Database connection is running')
    })
    .catch((err) => {
        console.log(err);
    })
});