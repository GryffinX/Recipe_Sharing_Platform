const recipeRouter= require('express').Router();
const recipeController= require('../controllers/recipeController');

recipeRouter.get('/recipes', recipeController.getAllRecipes);
recipeRouter.get('/recipes/:name', recipeController.getAllRecipes);
recipeRouter.post('/recipes', recipeController.createRecipe);

module.exports= recipeRouter;