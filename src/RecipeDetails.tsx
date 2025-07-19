import "./RecipeDetails.css";
import type {Recipe, User} from "./data/data-model.ts";
import {type ActiveView} from "./App.tsx";
import {AddToRecipeBookModal} from "./AddToRecipeBookModal.tsx";
import {useContext, useState} from "react";
import {UserContext} from "./UserContext.ts";
import {DeleteModal} from "./DeleteModal.tsx";
import {useSetErrorContext} from "./ErrorContext.ts";

interface RecipeDetailsProps {
    currentRecipe: Recipe | null;
    onChangeView: (view: ActiveView) => void;
    author: User | null;
    onDeleteRecipe: (recipeId: number) => Promise<boolean>;
    onAddToBook: (recipeBookId: number, recipeId: number) => Promise<boolean>;
}

export function RecipeDetails({currentRecipe, onChangeView, author, onDeleteRecipe, onAddToBook}: RecipeDetailsProps) {
    const [showModal, setShowModal] = useState(false);
    const setError = useSetErrorContext();
    const user = useContext(UserContext);
    const [showDelete, setShowDelete] = useState(false);


    function handleUserClick() {
        if (currentRecipe) {
            if (currentRecipe.author === user?.username) {
                onChangeView('Profile');
            } else {
                onChangeView('User Recipes');
            }
        }
    }

    function handleAddToBook(recipeBookId: number) {
        if (currentRecipe) {
            onAddToBook(recipeBookId, currentRecipe.id).then(success => {
                if (success) {
                    setShowModal(false);
                }
            });
        } else {
            setError("No recipe selected.");
        }
    }

    function handleDeleteRecipe() {
        if (currentRecipe) {
            onDeleteRecipe(currentRecipe.id).then(success => {
                if (success) {
                    setShowDelete(false);
                }
            });
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
                    {user?.role !== 'ADMIN' ? <button className="details-add-to-recipebook" title="Add to recipebook"
                                                      onClick={() => setShowModal(true)}>+
                    </button> : <div className="delete-recipe det" title="Delete recipe"
                                     onClick={() => setShowDelete(true)}>
                        <img className="details-icons" alt="delete"
                             src="/bin.png"/>
                    </div>}
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
                        <img src={`/image/users/${author?.image}`} alt="Autore" className="author-avatar"/>
                        <h3>
                            {currentRecipe?.author}
                        </h3>
                        <div className="action-buttons">
                            <button className="btn btn-primary" onClick={handleUserClick}>
                                Altre ricette
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
                                                onConfirm={handleAddToBook}/>}
            {showDelete && <DeleteModal onCancel={() => setShowDelete(false)}
                                        name={currentRecipe?.title}
                                        onDelete={handleDeleteRecipe}/>}
        </div>
    );
}