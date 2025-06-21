import './MyWorkCard.css'

export default function MyWorkCard(props) {
    const { recipe, onEdit, onDelete } = props;
    if(!recipe){
        return null;
    }
    return (
        <div className='recipeCard'>
            <div className='recipeNameContainer'>
                {/* <button className="viewButton" onClick={()=>{props.onBack()}}>Back</button> */}
                <h2><b>{recipe.dishName}</b></h2>
            </div>
            
            <div className='recipeDetails'>
                <p><b><i>Time Taken: </i></b> {recipe.timeTaken} minutes only is needed to prepare this!</p>
                
                <p><b><i>Ingredients: </i></b> </p>
                    <ul>
                        {(Array.isArray(recipe.ingredients) ? recipe.ingredients : [recipe.ingredients]).map((item, i) => (
                            <li key={i}>{item}</li>
                        ))}
                    </ul>
                
                <p><b><i>Process: </i></b></p>
                <ol>
                    {(Array.isArray(recipe.process) ? recipe.process : [recipe.process]).map((step, i) => (
                            <li key={i}>{step}</li>
                        ))}
                </ol>
            </div>

            <div className='cardActions'>
                <button onClick={() => onEdit(recipe)} className='actionButton'>Edit recipe</button>
                <button onClick={() => onDelete(recipe)} className='actionButton deleteButton'>Delete recipe</button>
            </div>
        </div>
    )
}