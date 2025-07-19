import type {Recipe} from "./data/data-model.ts";
import {type ReactElement, useContext, useState} from "react";
import {type ActiveView} from "./App.tsx";
import {AddToRecipeBookModal} from "./AddToRecipeBookModal.tsx";
import {UserContext} from "./UserContext.ts";
import {useSetErrorContext} from "./ErrorContext.ts";
import {DeleteModal} from "./DeleteModal.tsx";

interface RecipeItemProps {
    recipe: Recipe;
    onChangeView: (view: ActiveView) => void;
    onChangeAuthor?: (author: string) => void;
    onChangeRecipe: (recipe: Recipe) => void;
    onDeleteRecipe: (recipeId: number) => void;
}

export function RecipeItem({
                               onChangeAuthor,
                               onChangeView,
                               recipe,
                               onChangeRecipe,
                               onDeleteRecipe
                           }: RecipeItemProps): ReactElement {

    const categories: ReactElement[] = recipe.categories.map(c => <span className="recipe-category"
                                                                        key={c.id}>{c.name}</span>);

    const [showModal, setShowModal] = useState(false);
    const setError = useSetErrorContext();
    const user = useContext(UserContext);
    const [showDelete, setShowDelete] = useState(false);

    function handleAuthorClick() {
        if (recipe.author === user?.username) {
            onChangeView('Profile');
        } else {
            if (onChangeAuthor) {
                onChangeAuthor(recipe.author);
            }
            onChangeView('User Recipes');
        }
    }

    function handleRecipeClick() {
        onChangeRecipe(recipe);
        onChangeView('Recipe Detail');
        if (onChangeAuthor) {
            onChangeAuthor(recipe.author);
        }
    }

    function handleDeleteRecipe() {
        onDeleteRecipe(recipe.id);
        setShowDelete(false);
    }


    function handleAddRecipe(recipeBookId: number) {
        fetch(`http://localhost:7777/me/recipebooks/${recipeBookId}/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: recipe.id}),
            credentials: "include",
        }).then(res => {
            if (res.ok) {
                setError(null);
                setShowModal(false);
            } else {
                throw new Error("The recipe is already in the recipe book.");
            }
        })
            .catch(error => setError(error.message));

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
                    {user?.role !== 'ADMIN' ? <button className="add-to-recipebook" title="Add to recipebook"
                                                      onClick={() => setShowModal(true)}>+
                    </button> : <div className="delete-recipe" title="Delete recipe"
                                     onClick={() => setShowDelete(true)}>
                        <img className="icons" alt="delete"
                             src="/bin.png"/>
                    </div>}
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
                                                onConfirm={handleAddRecipe}/>}
            {showDelete && <DeleteModal onCancel={() => setShowDelete(false)} onDeleteRecipe={handleDeleteRecipe}
                                        recipeTitle={recipe.title}/>}
        </div>
    );
}