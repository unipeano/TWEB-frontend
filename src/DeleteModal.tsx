import "./DeleteModal.css";
import {useContext} from "react";
import {ErrorContext, useSetErrorContext} from "./ErrorContext.ts";

interface DeleteModalProps {
    onDelete: () => void;
    onCancel: () => void;
    name?: string;
}

export function DeleteModal({onDelete, onCancel, name}: DeleteModalProps) {
    const error = useContext(ErrorContext);
    const setError = useSetErrorContext();

    function handleCancel() {
        onCancel();
        setError(null);
    }


    return (<div className="delete-recipe-modal">
        <div className="delete-recipe-modal-content">
            <h3>Sei sicuro di voler eliminare "{name}"?</h3>
            <div className="delete-recipe-actions">
                <button className="btn modal-btn-primary" onClick={onDelete}>Elimina</button>
                <button className="btn modal-btn-secondary" onClick={handleCancel}>Annulla</button>
            </div>
            {error && (
                <div className="error-message">
                    {error}
                </div>
            )}
        </div>
    </div>);
}