import "./RecipeViewCard.css";

export default function RecipeViewCard(props) {
    const { dishName, ingredients, process, timeTaken } = props.recipe;

    return (
        <div className="viewContainer">
            <button className="viewButton" onClick={() => { props.onBack() }}>Back</button>
            <div className="viewBody">
                <h4 className="viewName">{dishName}</h4>
                <p className="viewHead">Preparation Time: {timeTaken}</p>
                <p className="viewHead">Ingredients Used Are:</p>
                <ul className="viewIngredients">
                    {Array.isArray(ingredients)
                        ? ingredients.map((ing, i) => <li key={i}>{ing}</li>)
                        : <li>{ingredients}</li>
                    }
                </ul>
                <p className="viewHead">Process :</p>
                <ol className="viewProcess">
                    {Array.isArray(process)
                        ? process.map((step, i) => <li key={i}>{step}</li>)
                        : <li>{process}</li>
                    }
                </ol>
            </div>
        </div>
    );
}
