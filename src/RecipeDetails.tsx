import "./RecipeDetails.css";
import type {Recipe} from "./data/data-model.ts";
import {type ActiveView} from "./App.tsx";
import {AddToRecipeBookModal} from "./AddToRecipeBookModal.tsx";
import {useContext, useState} from "react";
import {UserContext} from "./UserContext.ts";

interface RecipeDetailsProps {
    currentRecipe: Recipe | null;
    onChangeView: (view: ActiveView) => void;
    onChangeUser: (user: string) => void;
}

export function RecipeDetails({currentRecipe, onChangeView, onChangeUser}: RecipeDetailsProps) {
    const [showModal, setShowModal] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const user = useContext(UserContext);

    function handleError(errorMessage: string | null) {
        setError(errorMessage);
    }

    function handleUserClick() {
        if (currentRecipe) {
            if (currentRecipe.author === user?.username) {
                onChangeView('Profile');
            } else {
                onChangeUser(currentRecipe.author);
                onChangeView('User Recipes');
            }
        }
    }

    // duplicated also in RecipeITEM
    function handleAddRecipe(recipeBookId: number) {
        // la fetch seguente ritorna Void, serve che restituisca qualcosa=?
        fetch(`http://localhost:7777/me/recipebooks/${recipeBookId}/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: currentRecipe?.id}),
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
                    <button className="details-add-to-recipebook" title="Add to recipebook"
                            onClick={() => setShowModal(true)}>+
                    </button>
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
                            {currentRecipe?.instructions.split(",").map(step => {
                                return (
                                    <li key={step}>
                                        <span>{step}</span>
                                    </li>
                                );
                            })
                            }
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
                            <button className="btn btn-secondary">
                                Segui
                            </button>
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
            {showModal && <AddToRecipeBookModal recipeTitle={currentRecipe?.title}
                                                onCancel={() => setShowModal(false)}
                                                onConfirm={handleAddRecipe}
                                                error={error} onError={handleError}/>}
        </div>
    );
}