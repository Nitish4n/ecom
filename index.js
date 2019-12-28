const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();
const uuidv1 = require('uuid/v1');

const AuthRoute = require('./routes/auth');

require('dotenv').config();

//middleware
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(cookieParser());


//api routes
app.use('/api/auth', AuthRoute);

//routes
app.get('/', (req, res) => {
    res.send('Express running');
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
    console.log(`PORT is running on ${port}`)
})


mongoose.connect(process.env.DBURL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Mongoose connected')
}).catch(err => {
    console.log('Wrong credentials')
})