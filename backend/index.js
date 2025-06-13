require('dotenv').config();
const express=require('express');
const mongoConnection = require('./config/mongodb');
const recipeRouter= require('./routes/recipe');


mongoConnection();


const app=express();
app.use(express.json());

const PORT= process.env.PORT || 3000;

app.use('/',recipeRouter);

app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})