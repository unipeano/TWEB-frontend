import "./CreateRecipeBookForm.css";

export function CreateRecipeBookForm() {
    return (<div className="modal" id="newCookbookModal">
        <div className="modal-content">
            <div className="modal-header">
                <h3>Crea nuovo ricettario</h3>
                <span className="close-modal">×</span>
            </div>
            <form>
                <div className="form-group">
                    <label htmlFor="cookbookName">Nome ricettario</label>
                    <input type="text" id="cookbookName" required={true}/>
                </div>
                <button type="submit" className="btn btn-primary">
                    Crea ricettario
                </button>
            </form>
        </div>
    </div>);
}