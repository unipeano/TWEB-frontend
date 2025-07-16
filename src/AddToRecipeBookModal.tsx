import "./AddToRecipeBookModal.css";

interface AddToRecipeBookModalProps {
    onConfirm: (id: number) => void;
    onCancel: () => void;
    recipeTitle?: string;
}

// @TODO on confirm hard CODED
export function AddToRecipeBookModal({onConfirm, onCancel, recipeTitle}: AddToRecipeBookModalProps) {
    return (<div className="add-to-recipebook-modal" id="addToRecipeBookModal">
        <div className="add-to-recipebook-modal-container">
            <div className="add-to-recipebook-modal-header">
                <h3>Aggiungi a ricettario</h3>
                <span className="close-modal" onClick={onCancel}>×</span>
            </div>
            <div className="add-to-recipebook-modal-body">
                <p>Aggiungi "<span className="modal-recipe-title">{recipeTitle}</span>" a:</p>

                <div className="recipebooks-list">
                    <div className="recipebook-option">
                        <input
                            type="radio"
                            name="recipebook"
                            id="recipebook-1"
                            defaultValue={1}
                        />
                        <label htmlFor="recipebook-1">
                            <span className="recipebook-name">Preferiti</span>
                            <span className="recipebook-count">0 ricette</span>
                        </label>
                    </div>
                </div>

                <div className="new-recipebook-option">
                    <button className="btn-text" id="create-new-recipebook">
                        <img className="icons" alt="add"
                             src="/add.png"/> Crea nuovo ricettario
                    </button>
                </div>
            </div>
            <div className="modal-footer">
                <button className="modal-btn modal-btn-secondary modal-close-modal" onClick={onCancel}>Annulla</button>
                <button className="modal-btn modal-btn-primary" id="confirm-add" onClick={() => onConfirm(1)}>Aggiungi
                </button>
            </div>
        </div>
    </div>);
}
