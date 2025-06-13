const mongoose= require('mongoose');

const recipeSchema= new mongoose.Schema({
    dishName: {
        type: String,
        required: true
    }, 
    timeTaken: {
        type: String,
        required: true
    },
    ingredients: {
        type: [String],
        required: true
    },
    process: {
        type: [String],
        required: true
    },
    imageURL: {
        type: String
    }
})

const Recipes= mongoose.model('recipes', recipeSchema);

module.exports= Recipes;