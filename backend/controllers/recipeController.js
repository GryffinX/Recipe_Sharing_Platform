const Recipes= require('../models/recipeModel');


exports.getAllRecipes= async (req,res) => {
    try {
        const recipes= await Recipes.find();
        return res.status(200).send({recipes: recipes});
    } catch (error) {
        console.error("Error fetching all recipes", error.message);
        return res.status(500).send({ error: "Error fetching all recipes" });
    }
}

exports.getRecipeByName= async (req,res) => {
    const search = req.query.q;
    try {
        const recipes = await Recipes.find({
            dishName: { $regex: search, $options: 'i' }
        });
        if (!recipes || recipes.length === 0) {
            return res.status(404).send({ error: 'No recipes found' });
        }
        return res.status(200).send({ recipes: recipes });
    } catch (error) {
        console.error("Error fetching recipe", error.message);
        return res.status(500).send({error: "Error fetching recipe"});
    }
}

exports.createRecipe = async (req,res) => {
    const dishName= req.body.dishName;
    const timeTaken = req.body.timeTaken;
    const ingredients = req.body.ingredients;
    const process= req.body.process;
    const imageURL= req.body.imageURL;
    try {
        const newRecipe= new Recipes({
            dishName: dishName,
            timeTaken: timeTaken,
            ingredients: ingredients,
            process: process,
            imageURL: imageURL
        });
        const savedRecipe= await newRecipe.save();
        return res.status(201).send({ newRecipe: savedRecipe });
    } catch (error) {
        console.error("Error creating recipe", error.message);
        return res.status(500).send({error: "Error creating recipe"});
    }
}