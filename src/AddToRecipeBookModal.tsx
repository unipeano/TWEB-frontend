import "./AddToRecipeBookModal.css";

export function AddToRecipeBookModal() {
    return (<div className="modal-overlay hide" id="addToRecipeBookModal">
        <div className="modal-container">
            <div className="modal-header">
                <h3>Aggiungi a ricettario</h3>
                <span className="close-modal">×</span>
            </div>
            <div className="modal-body">
                <p>Aggiungi "<span className="modal-recipe-title">Spaghetti with tomato sauce</span>" a:</p>

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
                        <i className="fas fa-plus"></i> Crea nuovo ricettario
                    </button>
                </div>
            </div>
            <div className="modal-footer">
                <button className="btn btn-secondary close-modal">Annulla</button>
                <button className="btn btn-primary" id="confirm-add">Aggiungi</button>
            </div>
        </div>
    </div>);
}
