import "./CreateRecipeBookForm.css";

export function CreateRecipeBookForm() {
    return (<div className="recipe-book-modal" id="newRecipebookModal">
        <div className="recipe-book-modal-content">
            <div className="recipe-book-modal-header">
                <h3>Crea nuovo ricettario</h3>
                <span className="recipe-book-close-modal">×</span>
            </div>
            <form>
                <div className="recipe-book-form-group">
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