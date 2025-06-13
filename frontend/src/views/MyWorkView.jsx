import './MyWorkView.css'
import { useState } from 'react';

export default function MyWorkView() {
    // const [recipe, setRecipe] = useState([])
     const [recipeName, setRecipeName] = useState('')
     const [recipeTime, setRecipeTime] = useState('')
     const [recipeSteps, setRecipeSteps] = useState('')
     const [recipeIngrediants, setRecipeIngrediants] = useState('')
     const [showModal, setShowModal] = useState(false)
     const [modalType, setModalType] = useState('create')
     const [currentRecipe, setCurrentRecipe] = useState(null)
    
    const handleCreate = () => {
        setModalType('create');
        setCurrentRecipe(null);
        setRecipeName('');
        setShowModal(true)
    }

    const handleSubmit = () => {
        setShowModal(false);
        setRecipeName('');
        setCurrentRecipe(null);
    }
 
    return (
        <>
            <div id = "ancestorContainer" className = "ancestorContainer">
                <div id = "header" className = 'header'>
                    My Work
                </div>
                <button onClick={handleCreate} className='createRecipeButton'>Create Recipe</button>
            </div>
            {showModal && (
                <div id = 'modalOverlay' className='modalOverlay'>
                    <div id='modalContent' className='modalContent'>
                        <h2>{modalType === 'edit' ? 'Edit Recipe' : 'Create Your Favourite Recipe'}</h2>
                        <input
                            type="text"
                            value={recipeName}
                            onChange={(e) => setRecipeName(e.target.value)}
                            placeholder="Name of your recipe"
                        />
                        <input
                            type="text"
                            value={recipeTime}
                            onChange={(e) => setRecipeTime(e.target.value)}
                            placeholder="Preparation time"
                        />
                        <textarea
                            value={recipeIngrediants}
                            onChange={(e) => setRecipeIngrediants(e.target.value)}
                            placeholder="Ingrediants for the recipe"
                        />
                        <textarea
                            value={recipeSteps}
                            onChange={(e) => setRecipeSteps(e.target.value)}
                            placeholder="Enter the steps for the recipe"
                        />
                        <div id="modalButtons" className='modlaButtons'>
                            <button onClick={handleSubmit} id='modalButton' className='modalButton'>Save</button>
                            <button onClick={() => setShowModal(false)} id='modalButton' className='modalButton'>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}