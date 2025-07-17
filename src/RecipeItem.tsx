import type {Recipe} from "./data/data-model.ts";
import {type ReactElement, useState} from "react";
import type {ActiveView} from "./App.tsx";
import {AddToRecipeBookModal} from "./AddToRecipeBookModal.tsx";

interface RecipeItemProps {
    recipe: Recipe;
    onChangeView: (view: ActiveView) => void;
    onChangeUser: (user: string) => void;
    onChangeRecipe: (recipe: Recipe) => void;
}

export function RecipeItem({
                               onChangeUser,
                               onChangeView,
                               recipe,
                               onChangeRecipe,
                           }: RecipeItemProps): ReactElement {

    const categories: ReactElement[] = recipe.categories.map(c => <span className="recipe-category"
                                                                        key={c.id}>{c.name}</span>);

    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState<string | null>(null);

    function handleAuthorClick() {
        onChangeUser(recipe.author);
        onChangeView('User Recipes');
    }

    function handleRecipeClick() {
        onChangeRecipe(recipe);
        onChangeView('Recipe Detail');
    }


    function handleAddRecipe(recipeBookId: number) {
        // la fetch seguente ritorna Void, serve che restituisca qualcosa=?
        fetch(`http://localhost:7777/me/recipebooks/${recipeBookId}/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: recipe.id}),
            credentials: "include",
        })
            /*.then(res => res.json())
            .then(data => {/*setCollections(data)*/
            /*console.log(data)
        });*/.then(res => {
            if (res.ok) {
                console.log("Recipe added to recipe book successfully.");
                setError(null);
                setShowModal(false);
            } else {
                throw new Error("The recipe is already in the recipe book.");
            }
        })
            .catch(error => setError(error.message));

    }

    function handleError(errorMessage: string | null) {
        setError(errorMessage);
    }

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
                    <button className="add-to-recipebook" title="Add to recipebook"
                            onClick={() => setShowModal(true)}>+
                    </button>
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
            {showModal && <AddToRecipeBookModal recipeTitle={recipe.title}
                                                onCancel={() => setShowModal(false)}
                                                onConfirm={handleAddRecipe}
                                                error={error} onError={handleError}/>}
        </div>
    );
}