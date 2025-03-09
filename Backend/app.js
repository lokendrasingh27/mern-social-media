const dotenv=require('dotenv');
dotenv.config();
const express =require('express');
const path=require('path');
const cors=require('cors');
const app = express();
const connectToDb=require('./db/db');
const authRoutes=require('./routes/authRoutes');
connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname,"public")))

app.use('/api/auth', authRoutes);



module.exports = app;