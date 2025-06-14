require('dotenv').config();
const express=require('express');
const mongoConnection = require('./config/mongodb');
const recipeRouter= require('./routes/recipe');
const authRouter = require('./routes/auth');


mongoConnection();


const app=express();
app.use(express.json());

const PORT= process.env.PORT || 3000;

app.use('/recipes',recipeRouter);
app.use('/auth', authRouter);

app.get('/', (req,res) => {
    return res.status(200).send({message: "Server is successfully running"});
})
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})