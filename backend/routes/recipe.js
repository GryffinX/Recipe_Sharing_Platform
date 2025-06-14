const recipeRouter= require('express').Router();
const recipeController= require('../controllers/recipeController');
const {authenticate} = require('../middleware/authMiddleware');

recipeRouter.get('/', recipeController.getAllRecipes);

recipeRouter.get('/search', recipeController.getRecipeByName);

recipeRouter.post('/', authenticate, recipeController.createRecipe);

recipeRouter.patch('/:id', authenticate, recipeController.editRecipe);

recipeRouter.delete('/:id', authenticate, recipeController.deleteRecipe);

module.exports= recipeRouter;