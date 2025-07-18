import "./DeleteModal.css";

interface DeleteModalProps {
    /*onDelete: () => void;*/
    onCancel: () => void;
}

export function DeleteModal({/*onDelete,*/ onCancel}: DeleteModalProps) {
    return (<div className="delete-recipe-modal">
        <div className="delete-recipe-modal-content">
            <h3>Sei sicuro di voler eliminare questa ricetta?</h3>
            <div className="delete-recipe-actions">
                <button className="btn modal-btn-primary" /*onClick={onDelete}*/>Elimina</button>
                <button className="btn modal-btn-secondary" onClick={onCancel}>Annulla</button>
            </div>
        </div>
    </div>);
}