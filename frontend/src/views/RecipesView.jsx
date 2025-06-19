import { useEffect, useState } from 'react';
import './RecipesView.css';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import RecipeViewCard from '../components/RecipeViewCard';




export default function RecipesView() {

    const navigate = useNavigate();
    const [Recipes, setRecipes] = useState([]);
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState(false);



    useEffect(() => {
        fetch("/public/Data.json")
            .then(async (res) => {
                const data = await res.json();
                setRecipes(data.recipes);
            })
        if (localStorage.getItem("user-access-token")) {
            setUserLoggedIn(true);
        }

    }, [])

    const handleSearch = (e) => {
        e.preventDefault();
        const results = Recipes.filter((recipe) =>
            recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredRecipes(results);
    };


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
        if(userLoggedIn){
           navigate('/MyWorkView');
        }
        else{
            navigate('/Login');
        }
        
    }
    const handleLogOut = () => {
        localStorage.removeItem("user-access-token");
        setUserLoggedIn(false);
    }
    

    return (
        <>
            <div className='navHeader'>
                <img className='logo' src="./public/images/logo.jpg" alt="logo" />
                <h1>Bite Book</h1>
                <div className='searchContainer'>
                    <input
                        className="search"
                        type="text"
                        placeholder='Search for recipe'
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />

                    <button className='searchButton' onClick={handleSearch}>
                        <img className='searchButton' src="./public/images/search.jpg" alt="search" />
                    </button>


                </div>
                <button className='headButton' onClick={handleMyRecipes}>My Recipes</button>

                {!userLoggedIn && <button onClick={handleLogin} className='headButton'>LogIn</button>}
                {!userLoggedIn && <button onClick={handleSignUp} className='headButton'>SignUp</button>}
                {userLoggedIn && <button onClick={handleLogOut} className='headButton'>LogOut</button>}
            </div>
            <div className='recipeContainer'>
                {
                    searchQuery ? (
                        filteredRecipes.length > 0 ? (
                            filteredRecipes.map((item, index) => (
                                <RecipeCard key={index} recipe={item} onView={handleViewRecipe} />
                            ))
                        ) : (
                            <p className="notFound">No recipes found.</p>
                        )
                    ) : (
                        Recipes.map((item, index) => (
                            <RecipeCard key={index} recipe={item} onView={handleViewRecipe} />
                        ))
                    )
                }



            </div>
            {currentRecipe && <RecipeViewCard key={currentRecipe.name} recipe={currentRecipe} onBack={() => setCurrentRecipe(null)} />}
        </>
    )
}