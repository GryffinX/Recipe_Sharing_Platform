import "./RecipeCard.css";


export default function RecipeCard(props){
    return (
        <>
            <div className="cardContainer">
                <div className="cardImage">
                    <img src={props.recipe.image} alt={props.recipe.name} />
                </div>
                <div className="cardBody">
                    <h4 className="cardName">{props.recipe.name}</h4>
                    <p className="cardPrepTime">Preparation Time: {props.recipe.preparationTime}</p>
                    <button className="cardButton" onClick={()=>{props.onView(props.recipe)}}>View Recipe</button>
                </div>
            </div>
        </>
    )
}