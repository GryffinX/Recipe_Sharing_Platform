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
    const [currentPage, setCurrentPage] = useState(1);
    const recipesPerPage = 10;




    useEffect(() => {
        let tempRecipes = [];
        fetch("/public/Data.json")
            .then(async (res) => {
                const data = await res.json();
                data.recipes.forEach((element) => {
                    tempRecipes.push({ id: element.id, name: element.name, preparationTime: element.preparationTime, ingredients: element.ingredients, process: element.process, image: element.image })
                });
                fetch("http://localhost:3000/recipes")
                    .then(async (res) => {
                        const data = await res.json();
                        data.recipes.forEach((element) => {
                            tempRecipes.push({ id: element._id, name: element.dishName, preparationTime: element.timeTaken, ingredients: element.ingredients, process: element.process, image: "/public/images/Dummy.jpeg" })
                        });
                        setRecipes(tempRecipes);
                    })
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
        if (userLoggedIn) {
            navigate('/MyWorkView');
        }
        else {
            navigate('/Login');
        }

    }
    const handleLogOut = () => {
        localStorage.removeItem("user-access-token");
        setUserLoggedIn(false);
    }

    const indexOfLastRecipe = currentPage * recipesPerPage;
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage;
    const currentRecipes = (searchQuery ? filteredRecipes : Recipes).slice(indexOfFirstRecipe, indexOfLastRecipe);

    const handleNextPage = () => {
        setCurrentPage((prev) => prev + 1);
    };

    const handlePrevPage = () => {
        setCurrentPage((prev) => prev - 1);
    };



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
                    currentRecipes.length > 0 ? (
                        currentRecipes.map((item, index) => (
                            <RecipeCard key={index} recipe={item} onView={handleViewRecipe} />
                        ))
                    ) : (
                        <p className="notFound">No recipes found.</p>
                    )
                }
            </div>
            <div className="paginationControls">
                {currentPage > 1 && (
                    <button onClick={handlePrevPage} className="paginationButton">← Prev</button>
                )}
                {indexOfLastRecipe < (searchQuery ? filteredRecipes.length : Recipes.length) && (
                    <button onClick={handleNextPage} className="paginationButton">Next →</button>
                )}
            </div>

            {currentRecipe && <RecipeViewCard key={currentRecipe.name} recipe={currentRecipe} onBack={() => setCurrentRecipe(null)} />}
        </>
    )
}