import "./AddToRecipeBookModal.css";
import {useEffect, useState} from "react";
import type {RecipeBook} from "./data/data-model.ts";

interface AddToRecipeBookModalProps {
    onConfirm: (id: number) => void;
    onCancel: () => void;
    recipeTitle?: string;
    error: string | null;
    onError: (error: string | null) => void;
}

export function AddToRecipeBookModal({onConfirm, onCancel, recipeTitle, error, onError}: AddToRecipeBookModalProps) {
    const [currentId, setCurrentId] = useState<number>(0);
    const [recipeBookList, setRecipeBookList] = useState<RecipeBook[]>([]);

    useEffect(() => {
        let valid = true;
        fetch(`http://localhost:7777/me/recipebooks`, {
            credentials: "include",
        })
            .then(response => response.json())
            .then((recipeBookList: RecipeBook[]) => {
                if (valid) {
                    setRecipeBookList(recipeBookList);
                    setCurrentId(recipeBookList[1].id);
                }
            });
        return () => {
            valid = false;
        };
    }, []);


    function handleCancel() {
        onCancel();
        onError(null);
    }

    return (<div className="add-to-recipebook-modal" id="addToRecipeBookModal">
        <div className="add-to-recipebook-modal-container">
            <div className="add-to-recipebook-modal-header">
                <h3>Aggiungi a ricettario</h3>
                <span className="close-modal" onClick={handleCancel}>×</span>
            </div>
            <div className="add-to-recipebook-modal-body">
                <p>Aggiungi "<span className="modal-recipe-title">{recipeTitle}</span>" a:</p>

                <div className="recipebooks-list">
                    {
                        recipeBookList.filter((re) => re.name !== 'My recipes').map(recipeBook => (
                            <div className="recipebook-option" key={recipeBook.id}>
                                <input
                                    type="radio"
                                    name="recipebook"
                                    id={`recipebook-${recipeBook.id}`}
                                    value={recipeBook.id}
                                    checked={currentId === recipeBook.id}
                                    onChange={() => setCurrentId(recipeBook.id)}
                                />
                                <label htmlFor={`recipebook-${recipeBook.id}`}>
                                    <span className="recipebook-name">{recipeBook.name}</span>
                                </label>
                            </div>
                        ))
                    }
                </div>


            </div>
            <div className="modal-footer">
                <button className="modal-btn modal-btn-secondary modal-close-modal" onClick={handleCancel}>Annulla
                </button>
                <button className="modal-btn modal-btn-primary" id="confirm-add"
                        onClick={() => onConfirm(currentId)}>Aggiungi
                </button>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
            </div>
        </div>
    </div>);
}
