require('dotenv').config();
const express=require('express');
const mongoConnection = require('./config/mongodb');
const cors = require('cors')
const recipeRouter= require('./routes/recipe');
const authRouter = require('./routes/auth');
const userRouter = require('./routes/user')
const {authenticate}= require('./middleware/authMiddleware');
const {requiredRole} = require('./middleware/verifyRoleMiddleware');


const app=express();
app.use(express.json());
app.use(cors({
    origin: '*'
}))


mongoConnection();

const PORT= process.env.PORT || 3000;

app.use('/recipes',recipeRouter);
app.use('/auth', authRouter);
app.use('/users', authenticate, requiredRole(['admin']), userRouter);

app.get('/', (req,res) => {
    return res.status(200).send({message: "Server is successfully running"});
})
app.listen(PORT, ()=> {
    console.log(`Server is running on port ${PORT}`);
})