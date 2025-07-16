import "./RecipeDetails.css";
import type {Recipe} from "./data/data-model.ts";
import type {ActiveView} from "./App.tsx";

interface RecipeDetailsProps {
    currentRecipe: Recipe | null;
    onChangeView: (view: ActiveView) => void;
    onChangeUser: (user: string) => void;
}

export function RecipeDetails({currentRecipe, onChangeView, onChangeUser}: RecipeDetailsProps) {

    function handleUserClick() {
        if (currentRecipe) {
            onChangeUser(currentRecipe.author);
            onChangeView('User Recipes');
        }
    }

    return (<div className="recipe-details-container">
            <div className="recipe-details-header">
                <img
                    src={"/image/recipes/" + currentRecipe?.image}
                    alt={currentRecipe?.title}
                    className="recipe-details-image"
                />
                <h1 className="recipe-details-title">
                    {currentRecipe?.title}
                </h1>
            </div>
            <div className="recipe-details-meta">
                <div className="meta-details-item">
                    <span className="meta-icon"><img className="details-icons" alt="clock"
                                                     src="/clock.png"/></span>
                    <span>
        {currentRecipe?.preparationTime} minuti
      </span>
                </div>
                <div className="meta-details-item">
                    <span className="meta-icon"><img className="details-icons" alt="serving-dish"
                                                     src="/serving-dish.png"/></span>
                    <span>
        {currentRecipe?.servings} persone
      </span>
                </div>
                <div className="meta-details-item add">
                    <button className="details-add-to-recipebook" title="Add to recipebook">+</button>
                </div>
            </div>
            <div className="recipe-details-content">
                <div className="main-content">
                    <div className="description-section">
                        <p>
                            {currentRecipe?.description}
                        </p>
                    </div>
                    <div className="ingredients-section">
                        <h2 className="details-sub">Ingredienti</h2>
                        <ul className="ingredients-list">
                            {currentRecipe?.ingredients.map(ingredient => {
                                const {id, name, quantity} = ingredient;
                                return (
                                    <li key={id}>
                                        <span>{name}</span>
                                        <span>{quantity}</span>
                                    </li>
                                );
                            })
                            }
                        </ul>
                    </div>
                    <div className="instructions-section">
                        <h2 className="details-sub">Preparazione</h2>
                        <ol className="instructions-list">
                            <li>
                                {currentRecipe?.instructions}
                            </li>
                        </ol>
                    </div>
                </div>
                <div className="sidebar">
                    <div className="author-section">
                        <img src="/image/users/1.jpg" alt="Autore" className="author-avatar"/>
                        <h3>
                            {currentRecipe?.author}
                        </h3>
                        <p>
                            {"{"}who's{"}"}
                        </p>
                        <div className="action-buttons">
                            <button className="btn btn-primary" onClick={handleUserClick}>
                                Altre ricette
                            </button>
                            <a href="#" className="btn btn-secondary">
                                Segui
                            </a>
                        </div>
                    </div>
                    <div className="tags-section">
                        <h2 className="details-sub">Categorie</h2>
                        <div className="recipe-tags">
                            {currentRecipe?.categories.map(category => (
                                <span className="tag" key={category.id}>
                             {category.name}
                            </span>))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}