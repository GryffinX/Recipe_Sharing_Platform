import "./RecipeViewCard.css";

export default function RecipeViewCard(props){
    return (
        <>
            <div className="viewContainer">
                <button className="viewButton" onClick={()=>{props.onBack()}}>Back</button>
                <div className="viewImage">
                    <img src={props.recipe.image} alt={props.recipe.name} />
                </div>
                <div className="viewBody">
                    <h4 className="viewName">{props.recipe.name}</h4>
                    <p className="viewHead">Ingredients Used Are:</p>
                    <p className="viewIngredients">{props.recipe.ingredients}</p>
                    <p className="viewHead">Process :</p>
                    <p className="viewProcess">{props.recipe.process}</p>
                </div>
            </div>
        </>
    )
}