const recipeRouter= require('express').Router();
const recipeController= require('../controllers/recipeController');

recipeRouter.get('/', recipeController.getAllRecipes);
recipeRouter.get('/:name', recipeController.getAllRecipes);
recipeRouter.post('/', recipeController.createRecipe);

module.exports= recipeRouter;