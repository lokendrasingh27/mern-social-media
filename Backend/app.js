const dotenv=require('dotenv');
dotenv.config();
const express=require('express');

const app=express();
const cors=require('cors');

app.use(cors());

app.get('/',(req, res) => {
    res.send('Hello World');
})

const MONGO_URI = process.env.MONGO_URI;


module.exports = app;