import { useEffect, useState } from 'react';
import './RecipesView.css';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import RecipeViewCard from '../components/RecipeViewCard';




export default function RecipesView() {

    const navigate = useNavigate();
    const [Recipes, setRecipes] = useState([]);
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [searchType, setSearchType] = useState("name");
    const [searchQuery, setSearchQuery] = useState('');
    const [filteredRecipes, setFilteredRecipes] = useState([]);
    const [userLoggedIn, setUserLoggedIn] = useState(false);



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

    const handleSearch = async (e) => {
        e.preventDefault();
        if (searchType === "name"){
            try{
                const response = await axios.get('/recipes/search', {
                    params: { dishName: searchQuery }
                });
                setFilteredRecipes(response.data.recipes);
            } catch (error) {
                alert("Search failed");
            }
        } else if (searchType === "ingredients") {
        
            try {
                const response = await axios.get('/recipes/searchByIngredients', {
                    params: { ingredients: searchQuery }
                });
                setFilteredRecipes(response.data.recipes);
            } catch (error) {
                alert("Search failed");
            }
        }
        // const results = Recipes.filter((recipe) =>
        //     recipe.name.toLowerCase().includes(searchQuery.toLowerCase())
        // );
        // setFilteredRecipes(results);
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


    return (
        <>
            <div className='navHeader'>
                <img className='logo' src="./public/images/logo.jpg" alt="logo" />
                <h1>Bite Book</h1>

                <select
                        className="searchTypeDropdown"
                        value={searchType}
                        onChange={e => setSearchType(e.target.value)}
                        style={{ height: "32px", marginLeft: "8px" }}
                    >
                        <option value="name">Search by Recipe Name</option>
                        <option value="ingredients">Search by Ingredients</option>
                </select>
                
                <div className='searchContainer'>
                    <input
                        className="search"
                        type="text"
                        placeholder={
                            searchType === "name"
                                ? "Search for recipe"
                                : "Search by ingredients (comma separated)"
                        }
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