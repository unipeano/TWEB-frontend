import "./CreateRecipeForm.css";

export function CreateRecipeForm() {
    return (<form className="recipe-form">
            <div className="recipe-form-section">
                <h2>Pubblicazione ricetta</h2>
            </div>
            <div className="recipe-form-group">
                <label htmlFor="recipe-title">Titolo della ricetta*</label>
                <input
                    type="text"
                    id="recipe-title"
                    name="title"
                    required={true}
                    placeholder="Es: Pasta al pesto"
                />
            </div>
            <div className="recipe-form-group">
                <label htmlFor="recipe-description">Descrizione*</label>
                <textarea
                    id="recipe-description"
                    name="description"
                    required={true}
                    rows={2}
                    placeholder="Descrivi la ricetta..."
                    defaultValue={""}
                />
            </div>
            <div className="recipe-form-group">
                <label htmlFor="recipe-image">Immagine*</label>
                <input
                    type="number"
                    id="recipe-image"
                    name="image"
                    required={true}
                    min={1}
                    placeholder="Es: 1"
                />
            </div>
            <div className="recipe-form-group">
                <label htmlFor="recipe-instructions">Istruzioni di preparazione*</label>
                <textarea
                    id="recipe-instructions"
                    name="instructions"
                    required={true}
                    rows={6}
                    placeholder="Descrivi i passaggi..."
                    defaultValue={""}
                />
            </div>
            <div className="recipe-form-row">
                <div className="recipe-form-group half">
                    <label htmlFor="prep-time">Tempo di preparazione (min)*</label>
                    <input type="number" id="prep-time" name="prepTime" min={1} required={true}/>
                </div>
                <div className="recipe-form-group half">
                    <label htmlFor="servings">Numero di porzioni*</label>
                    <input type="number" id="servings" name="servings" min={1} required={true}/>
                </div>
            </div>
            <div className="recipe-form-group">
                <label>Ingredienti*</label>
                <div className="ingredients-container">
                    <div className="ingredient-item">
                        <select name="ingredients[0][id]" required={true}>
                            <option value="">Seleziona ingrediente</option>
                            <option value={1}>Farina</option>
                            <option value={2}>Uova</option>
                            <option value={3}>Zucchero</option>
                            <option value={4}>Latte</option>
                            <option value={5}>Burro</option>
                        </select>
                        <input
                            type="text"
                            name="ingredients[0][quantity]"
                            placeholder="Quantità"
                            required={true}
                        />
                        <button type="button" className="remove-button">
                            ×
                        </button>
                    </div>
                    <button type="button" className="add-button">
                        + Aggiungi ingrediente
                    </button>
                </div>
            </div>
            <div className="recipe-form-group">
                <label>Categorie*</label>
                <div className="categories-container">
                    <div className="category-option">
                        <input
                            type="checkbox"
                            id="category-1"
                            name="categories[]"
                            defaultValue={1}
                        />
                        <label htmlFor="category-1">Breakfast</label>
                    </div>
                    <div className="category-option">
                        <input
                            type="checkbox"
                            id="category-2"
                            name="categories[]"
                            defaultValue={2}
                        />
                        <label htmlFor="category-2">Appetizer</label>
                    </div>
                    <div className="category-option">
                        <input
                            type="checkbox"
                            id="category-3"
                            name="categories[]"
                            defaultValue={3}
                        />
                        <label htmlFor="category-3">Main Course</label>
                    </div>
                    <div className="category-option">
                        <input
                            type="checkbox"
                            id="category-4"
                            name="categories[]"
                            defaultValue={4}
                        />
                        <label htmlFor="category-4">Dessert</label>
                    </div>
                </div>
            </div>
            <div className="recipe-form-actions">
                <button type="submit" className="submit-btn">
                    Pubblica ricetta
                </button>
                <button type="reset" className="reset-btn">
                    Annulla
                </button>
            </div>
        </form>
    );
}
