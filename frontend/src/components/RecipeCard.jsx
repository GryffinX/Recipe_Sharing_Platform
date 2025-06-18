import "./RecipeCard.css";

export default function RecipeCard(props) {
    const { dishName, timeTaken } = props.recipe;
    return (
        <div className="cardContainer">
            <div className="cardBody">
                <h4 className="cardName">{dishName}</h4>
                <p className="cardPrepTime">Preparation Time: {timeTaken}</p>
                <button className="cardButton" onClick={() => { props.onView(props.recipe) }}>View Recipe</button>
            </div>
        </div>
    );
}
