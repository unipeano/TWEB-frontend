import type {Recipe} from "./data/data-model.ts";
import type {ReactElement} from "react";
import type {ActiveView} from "./App.tsx";

interface RecipeItemProps {
    recipe: Recipe;
    onChangeView: (view: ActiveView) => void;
    onChangeUser: (user: string) => void;
    onChangeRecipe: (recipe: Recipe) => void;
}

export function RecipeItem({onChangeUser, onChangeView, recipe, onChangeRecipe}: RecipeItemProps): ReactElement {

    const categories: ReactElement[] = recipe.categories.map(c => <span className="recipe-category"
                                                                        key={c.id}>{c.name}</span>);

    function handleAuthorClick() {
        onChangeUser(recipe.author);
        onChangeView('User Recipes');
    }

    function handleRecipeClick() {
        onChangeRecipe(recipe);
        onChangeView('Recipe Detail');
    }

    // nell'onchangeview devo fare il setdellacurrentrecipe in modo da passargliela all'App
    return (
        <div className="recipe-item" data-recipeid={recipe.id}>
            <img
                className="recipe-image"
                alt={recipe.title}
                src={"/image/recipes/" + recipe.image}
            />
            <div className="recipe-content">
                <div className="recipe-header">
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <button className="add-to-recipebook" title="Add to recipebook">+</button>
                </div>
                <div className="recipe-categories">
                    {categories}
                </div>
                <p className="recipe-description">
                    {recipe.description}
                </p>
                <div className="recipe-meta">
                    <div className="recipe-details">
                        <span><img className="icons" alt="clock"
                                   src="/clock.png"/> {recipe.preparationTime} min</span>
                        <span><img className="icons" alt="serving-dish"
                                   src="/serving-dish.png"/> {recipe.servings} pers.</span>
                        <span className="recipe-author" onClick={handleAuthorClick}><img
                            className="icons" alt="chef"
                            src="/chef.png"/> {recipe.author}</span>
                    </div>

                    <button className="recipe-action" onClick={handleRecipeClick}>Vedi ricetta
                    </button>

                </div>
            </div>
        </div>
    );
}