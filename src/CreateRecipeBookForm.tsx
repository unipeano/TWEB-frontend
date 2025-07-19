import "./CreateRecipeBookForm.css";
import {useContext, useState} from "react";
import {ErrorContext, useSetErrorContext} from "./ErrorContext.ts";

interface CreateRecipeBookFormProps {
    onCancel: () => void;
    onConfirm: (name: string) => void;
}

export function CreateRecipeBookForm({onCancel, onConfirm}: CreateRecipeBookFormProps) {
    const [name, setName] = useState("");
    const setError = useSetErrorContext();
    const error = useContext(ErrorContext);

    function handleCancel() {
        onCancel();
        setError(null);
    }

    function handleConfirm(e: React.FormEvent<HTMLFormElement>, name: string) {
        e.preventDefault();
        onConfirm(name);
    }

    return (<div className="recipe-book-modal" id="newRecipebookModal">
        <div className="recipe-book-modal-content">
            <div className="recipe-book-modal-header">
                <h3>Crea nuovo ricettario</h3>
                <span className="recipe-book-close-modal" onClick={handleCancel}>×</span>
            </div>
            <form onSubmit={(e) => handleConfirm(e, name)}>
                <div className="recipe-book-form-group">
                    <label htmlFor="cookbookName">Nome ricettario</label>
                    <input type="text" id="cookbookName" required={true} value={name}
                           onChange={(e) => setName(e.target.value)}/>
                </div>
                <button type="submit" className="btn btn-primary">
                    Crea ricettario
                </button>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
            </form>
        </div>
    </div>);
}