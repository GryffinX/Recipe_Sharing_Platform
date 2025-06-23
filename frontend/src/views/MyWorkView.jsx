import './MyWorkView.css'
import MyWorkCard from '../components/MyWorkCard';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function MyWorkView() {
    
    const navigate = useNavigate();
    const [recipe, setRecipe] = useState([])
    const [recipeName, setRecipeName] = useState('')
    const [recipeTime, setRecipeTime] = useState('')
    const [recipeSteps, setRecipeSteps] = useState('')
    const [recipeIngredients, setRecipeIngredients] = useState('')
    const [showModal, setShowModal] = useState(false)
    const [modalType, setModalType] = useState('create')
    const [currentRecipe, setCurrentRecipe] = useState(null)

    const getUser = () => {
        const userStr = localStorage.getItem('user');
        return userStr ? JSON.parse(userStr) : null;
    };   
    const getConfig = () => {
        const user = getUser();
        return {
             headers: {
                        Authorization: `Bearer ${user.token || ''}`,
             },
        };
    };

    useEffect(() => {
        
        const getSpecificRecipes = async () => {
            const user = getUser();
             
                if(!user?.token) {
                    setRecipe([]);
                    return;
                }

            try {
               
                const config = getConfig();
                const res = await axios.get(`${import.meta.env.VITE_API_URL}/recipes/my`, config);
                setRecipe(res?.data?.recipes || []);
            } catch (error) {
                console.error('Failed to show recipes: ', error.message);
                setRecipe([]);
            }
        };
        getSpecificRecipes();
    }, []);

    const handleCreate = () => {
        setModalType('create');
        setCurrentRecipe(null);
        setRecipeName('');
        setShowModal(true)
    }

    const handleEdit = (recipe) => {
        setModalType('edit');
        setShowModal(true);
        setCurrentRecipe(recipe);
        setRecipeName(recipe.dishName);
        setRecipeTime(recipe.timeTaken);
        setRecipeIngredients(Array.isArray(recipe.ingredients) ? recipe.ingredients.join(', ') : recipe.ingredients);
        setRecipeSteps(Array.isArray(recipe.process) ? recipe.process.join(', ') : recipe.process);
    }

    const handleDelete = async (recipe) => {
        try {
            const token = localStorage.getItem("user-access-token");

            const headers = {
                authorization: `Bearer ${token}`,
            };

            await axios.delete(`${import.meta.env.VITE_API_URL}/recipes/${recipe._id}`, { headers });
            setRecipe(prev => prev.filter(r => r._id !== recipe._id))
        } catch (error) {
            console.error("Error in deleting: ", error);
        }
    };

    const handleSubmit = async () => {

        if (!recipeName || !recipeTime || !recipeIngredients || !recipeSteps) {
            alert("All fields are required.");
            return;
        }

        const payload = {
            dishName: recipeName,
            timeTaken: recipeTime,
            ingredients: recipeIngredients,
            process: recipeSteps,
        };

        try {

            const token = localStorage.getItem('user-access-token');

        const config = {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        };


            if (currentRecipe && currentRecipe._id) {
                const res = await axios.patch(`${import.meta.env.VITE_API_URL}/recipes/${currentRecipe._id}`, payload, config);
                const updatedRecipe = res.data.updatedRecipe;
                
                setRecipe(prev => prev.map(r => r._id === updatedRecipe._id ? updatedRecipe : r));
                setCurrentRecipe(null);
            } else {
                const res = await axios.post(`${import.meta.env.VITE_API_URL}/recipes`, payload, config);
                console.log('New recipe response:', res.data);
                const newRecipe = res.data.newRecipe;
                setRecipe(prev => [...prev, newRecipe])
            }

            
            setRecipeName('');
            setRecipeTime('');
            setRecipeIngredients('');
            setRecipeSteps('');
            setCurrentRecipe(null);
            setShowModal(false);

        } catch (error) {
            console.error('Submit failed: ', error);
        }
    }

    const handleRecipes = () => {
        navigate('/');
    }


    return (
        <>
            <div id="ancestorContainer" className="ancestorContainer">
                 

                <div id="header" className='header'>

                    My Work
                </div>
                <button className='BackButton' onClick={handleRecipes}>Back</button>
                <button onClick={handleCreate} className='createRecipeButton'>Create Recipe</button>


                {Array.isArray(recipe) && recipe.length > 0 ? (
                    
                    recipe?.map((recipe) => (
                        <MyWorkCard key={recipe._id} recipe={recipe} onEdit={handleEdit} onDelete={handleDelete} />
                    ))
                ) : (
                    <div id='noRecipes' className='noRecipes'>No Recipes yet created!</div>
                )}
                {showModal && (
                    <div id='modalOverlay' className='modalOverlay'>
                        <div id='modalContent' className='modalContent'>
                            <h2>{modalType === 'edit' ? 'Edit Recipe' : 'Create Your Favourite Recipe'}</h2>
                            <input
                                type="text"
                                value={recipeName}
                                onChange={(e) => setRecipeName(e.target.value)}
                                placeholder="Name of your recipe"
                            />
                            <br />
                            <input
                                type="text"
                                value={recipeTime}
                                onChange={(e) => setRecipeTime(e.target.value)}
                                placeholder="Preparation time"
                            />
                            <br />
                            <textarea
                                value={recipeIngredients}
                                onChange={(e) => setRecipeIngredients(e.target.value)}
                                placeholder="Ingredients for the recipe"
                            />
                            <br />
                            <textarea
                                value={recipeSteps}
                                onChange={(e) => setRecipeSteps(e.target.value)}
                                placeholder="Enter the steps for the recipe"
                            />
                            <div id="modalButtons" className='modalButtons'>
                                <button onClick={handleSubmit} id='modalButton' className='modalButton'>Save</button>
                                <button onClick={() => setShowModal(false)} id='modalButton' className='modalButton'>Cancel</button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </>
    )
}