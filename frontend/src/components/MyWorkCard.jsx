import './MyWorkCard.css'

export default function MyWorkCard(props) {
    const { recipe, onEdit } = props;

    return (
        <div className='recipeCard'>
            <div className='recipeNameContainer'>
                <span id='recipeName'>{props.recipe.name}</span>
            </div>
            <div className='cardActions'>
                <button onClick={() => onEdit(recipe)} className='actionButton'>Edit recipe</button>
            </div>
        </div>
    )
}