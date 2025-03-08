const dotenv=require('dotenv');
dotenv.config();
const express =require('express');
const cors=require('cors');
const app = express();
const connectToDb=require('./db/db');
const authRoutes=require('./routes/authRoutes');
connectToDb();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);



module.exports = app;