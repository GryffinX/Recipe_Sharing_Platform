import { useEffect, useState } from 'react';
import './RecipesView.css';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import RecipeViewCard from '../components/RecipeViewCard';




export default function RecipesView() {

    const navigate = useNavigate();
    const [Recipes, setRecipes] = useState([]);
    const [currentRecipe, setCurrentRecipe] = useState(null);


    useEffect(() => {
        fetch("/public/Data.json")
            .then(async (res) => {
                const data = await res.json();
                setRecipes(data.recipes);
            })

    }, [])

    const handleLogin = () => {
        navigate('/Login');
    }
    const handleViewRecipe = (recipe) => {
        setCurrentRecipe(recipe);
    }

    const handleSignUp = () => {
        navigate('/SignUp');
    }
    const handleMyRecipes = () => {
        navigate('/MyWorkView');
    }

    return (
        <>
            <div className='navHeader'>
                <h1>Bite Book</h1>
                <div className='searchContainer'>
                    <input className="search" type="text" placeholder='search for recipe' />
                    <button className='searchButton'><img className='searchButton' src="./public/images/search.jpg" alt="search" /></button>
                </div>
                <button className='headButton' onClick={handleMyRecipes}>My Recipes</button>
                <button onClick={handleLogin} className='headButton'>LogIn</button>
                <button onClick={handleSignUp} className='headButton'>SignUp</button>
            </div>
            <div className='recipeContainer'>
                {
                    Recipes ? Recipes.map((item, index) => (
                        <RecipeCard key={index} recipe={item} onView={handleViewRecipe} />
                    )
                    ) : <> </>
                }

            </div>
            {currentRecipe && <RecipeViewCard key={currentRecipe.name} recipe={currentRecipe} onBack={() => setCurrentRecipe(null)} />}
        </>
    )
}