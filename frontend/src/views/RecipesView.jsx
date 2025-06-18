import { useEffect, useState } from 'react';
import './RecipesView.css';
import { useNavigate } from 'react-router-dom';
import RecipeCard from '../components/RecipeCard';
import RecipeViewCard from '../components/RecipeViewCard';

export default function RecipesView() {
    const navigate = useNavigate();
    const [recipes, setRecipes] = useState([]);
    const [currentRecipe, setCurrentRecipe] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (searchQuery.trim() === '') {
            setLoading(true);
            fetch("/recipes")
                .then(async (res) => {
                    const data = await res.json();
                    setRecipes(data.recipes || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
        }
    }, [searchQuery]);

    const handleSearch = () => {
        if (searchQuery.trim() === '') {
            setLoading(true);
            fetch("/recipes")
                .then(async (res) => {
                    const data = await res.json();
                    setRecipes(data.recipes || []);
                    setLoading(false);
                })
                .catch(() => setLoading(false));
            return;
        }
        setLoading(true);
        fetch(`/recipes/search?q=${encodeURIComponent(searchQuery)}`)
            .then(async (res) => {
                const data = await res.json();
                setRecipes(data.recipes || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    const handleLogin = () => {
        navigate('/Login');
    };
    const handleViewRecipe = (recipe) => {
        setCurrentRecipe(recipe);
    };
    const handleSignUp = () => {
        navigate('/SignUp');
    };
    const handleMyRecipes = () => {
        navigate('/MyWorkView');
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
                        placeholder='search for recipe'
                        value={searchQuery}
                        onChange={e => setSearchQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                    />
                    <button className='searchButton' onClick={handleSearch}>
                        <img className='searchButton' src="./public/images/search.jpg" alt="search" />
                    </button>
                </div>
                <button className='headButton' onClick={handleMyRecipes}>My Recipes</button>
                <button onClick={handleLogin} className='headButton'>LogIn</button>
                <button onClick={handleSignUp} className='headButton'>SignUp</button>
            </div>
            <div className='recipeContainer'>
                {loading && <div>Loading...</div>}
                {!loading && recipes && recipes.length > 0 ? (
                    recipes.map((item, index) => (
                        <RecipeCard key={index} recipe={item} onView={handleViewRecipe} />
                    ))
                ) : !loading && (
                    <div>No recipes found.</div>
                )}
            </div>
            {currentRecipe && <RecipeViewCard key={currentRecipe.name} recipe={currentRecipe} onBack={() => setCurrentRecipe(null)} />}
        </>
    );
}
