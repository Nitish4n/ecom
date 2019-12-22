const express = require('express');
const mongoose = require('mongoose');
const app = express();

require('dotenv').config();

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