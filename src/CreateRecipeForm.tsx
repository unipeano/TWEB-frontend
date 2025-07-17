import "./CreateRecipeForm.css";
import {useContext, useEffect, useState} from "react";
import type {Category, Ingredient, Recipe} from "./data/data-model.ts";
import {UserContext} from "./App.tsx";

export function CreateRecipeForm() {
    const user = useContext(UserContext);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [image, setImage] = useState(1);
    const [instructions, setInstructions] = useState("");
    const [preparationTime, setPreparationTime] = useState(1);
    const [servings, setServings] = useState(1);
    const [ingredients, setIngredients] = useState<{ id: number; name: string; quantity: string }[]>([{
        id: 0,
        name: "",
        quantity: ""
    }]);
    const [ingredientList, setIngredientList] = useState<Ingredient[]>([]);
    const [categoryList, setCategoryList] = useState<Category[]>([]);
    const [selectedCategories, setSelectedCategories] = useState<Category[]>([]);
    const [error, setError] = useState<string | null>(null);

    function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const recipeData: Recipe = {
            id: 0,
            author: user,
            title,
            description,
            image: image + ".png",
            instructions,
            preparationTime,
            servings,
            ingredients: ingredients,
            categories: selectedCategories,
        };
        fetch('http://localhost:7777/recipes', {
            method: 'POST',
            credentials: 'include',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(recipeData),
        })
            .then(response => {
                if (response.ok)
                    return response.json()
                else throw new Error("A recipe with the same title by the same author already exists.");
            })
            .then(data => {
                console.log('Success:', data);
                setError(null);
                handleReset();
            })
            .catch((error) => {
                setError(error.message);
            });
    }


    function handleReset() {
        setTitle("");
        setDescription("");
        setImage(1);
        setInstructions("");
        setPreparationTime(1);
        setServings(1);
        setIngredients([{
            id: 0,
            name: "",
            quantity: ""
        }]);
        setSelectedCategories([]);
        setError(null);
    }

    function handleCategoryChange(category: Category, checked: boolean) {
        setSelectedCategories(prev => checked ? [...prev, category] : prev.filter(c => c !== category));
    }

    function handleRemoveIngredient(index: number) {
        if (index !== 0) {
            const newIngredients = [...ingredients];
            newIngredients.splice(index, 1);
            setIngredients(newIngredients);
        } else {
            const newIngredients = [...ingredients];
            newIngredients[index] = {id: 0, name: "", quantity: ""};
            setIngredients(newIngredients);
        }
    }

    function handleAddIngredient() {
        setIngredients(prev => [...prev, {id: 0, name: "", quantity: ""}]);
    }


    useEffect(() => {
        let valid = true;
        fetch(`http://localhost:7777/recipes/ingredients`, {
            credentials: "include",
        })
            .then(response => response.json())
            .then((ingredientList: Ingredient[]) => {
                if (valid) {
                    setIngredientList(ingredientList);
                }
            });
        return () => {
            valid = false;
        };
    }, []);

    useEffect(() => {
        let valid = true;
        fetch(`http://localhost:7777/recipes/categories`, {
            credentials: "include",
        })
            .then(response => response.json())
            .then((categoryList: Category[]) => {
                if (valid) {
                    setCategoryList(categoryList);
                }
            });
        return () => {
            valid = false;
        };
    }, []);


    return (<form className="recipe-form" onSubmit={(e) => handleSubmit(e)} onReset={handleReset}>
            <div className="recipe-form-section">
                <h2>Pubblicazione ricetta</h2>
            </div>
            <div className="recipe-form-group">
                <label htmlFor="recipe-title">Titolo della ricetta*</label>
                <input
                    type="text"
                    id="recipe-title"
                    name="title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
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
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    rows={2}
                    placeholder="Descrivi la ricetta..."
                />
            </div>
            <div className="recipe-form-group">
                <label htmlFor="recipe-image">Immagine*</label>
                <input
                    type="number"
                    id="recipe-image"
                    name="image"
                    required={true}
                    value={image}
                    onChange={(e) => setImage(Number(e.target.value))}
                    placeholder="Es: 1"
                    min={1}
                />
            </div>
            <div className="recipe-form-group">
                <label htmlFor="recipe-instructions">Istruzioni di preparazione* (formato: "Step1, Step2...")</label>
                <textarea
                    id="recipe-instructions"
                    name="instructions"
                    required={true}
                    value={instructions}
                    onChange={(e) => setInstructions(e.target.value)}
                    rows={6}
                    placeholder="Descrivi i passaggi..."
                />
            </div>
            <div className="recipe-form-row">
                <div className="recipe-form-group half">
                    <label htmlFor="prep-time">Tempo di preparazione (min)*</label>
                    <input type="number" id="prep-time" name="prepTime" min={1} required={true} value={preparationTime}
                           onChange={(e) => setPreparationTime(Number(e.target.value))}/>
                </div>
                <div className="recipe-form-group half">
                    <label htmlFor="servings">Numero di porzioni*</label>
                    <input type="number" id="servings" name="servings" min={1} required={true} value={servings}
                           onChange={(e) => setServings(Number(e.target.value))}/>
                </div>
            </div>
            <div className="recipe-form-group">
                <label>Ingredienti*</label>
                <div className="ingredients-container">

                    {ingredients.map((ingredient, index) => (
                        <div className="ingredient-item" key={index}>
                            <select name={`ingredients[${index}][id]`} required={true}
                                    value={ingredient.id}
                                    onChange={(e) => {
                                        const newIngredients = [...ingredients];
                                        newIngredients[index].id = Number(e.target.value);
                                        const selectedIngredient = ingredientList.find(ing => ing.id === Number(e.target.value));
                                        newIngredients[index].name = selectedIngredient ? selectedIngredient.name : "";
                                        setIngredients(newIngredients);
                                    }}>
                                <option value="">Seleziona ingrediente</option>
                                {ingredientList.map((ingredient) => (
                                    <option key={ingredient.id} value={ingredient.id}>
                                        {ingredient.name}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                name={`ingredients[${index}][quantity]`}
                                placeholder="Quantità"
                                required={true}
                                value={ingredient.quantity}
                                onChange={(e) => {
                                    const newIngredients = [...ingredients];
                                    newIngredients[index].quantity = e.target.value;
                                    setIngredients(newIngredients);
                                }}
                            />
                            <button type="button" className="remove-button"
                                    onClick={() => handleRemoveIngredient(index)}>
                                ×
                            </button>
                        </div>
                    ))}
                    <button type="button" className="add-button" onClick={handleAddIngredient}>
                        + Aggiungi ingrediente
                    </button>
                </div>
            </div>
            <div className="recipe-form-group">
                <label>Categorie*</label>
                <div className="categories-container">
                    {
                        categoryList.map((category) => (
                            <div className="category-option" key={category.id}>
                                <input
                                    type="checkbox"
                                    id={`category-${category.id}`}
                                    name="categories[]"
                                    value={category.id}
                                    checked={selectedCategories.some(cat => cat.id === category.id)}
                                    onChange={(e) => handleCategoryChange(category, e.target.checked)}
                                />
                                <label htmlFor={`category-${category.id}`}>{category.name}</label>
                            </div>
                        ))
                    }
                </div>
            </div>
            <div className="recipe-form-actions">
                <button type="reset" className="reset-btn">
                    Annulla
                </button>
                <button type="submit" className="submit-btn">
                    Pubblica ricetta
                </button>
                {error && (
                    <div className="error-message">
                        {error}
                    </div>
                )}
            </div>
        </form>
    );
}
