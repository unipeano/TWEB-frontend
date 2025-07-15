import {type ReactElement, useEffect, useState} from "react";
import {AddToRecipeBookModal} from "./AddToRecipeBookModal.tsx";
import "./Home.css";
import type {Category, RecipeDTO} from "./data/data-model.ts";
import {RecipeItem} from "./RecipeItem.tsx";

interface RecipeFilterProps {
    categories: Category[];
    filter: string;
    onApplyFilter: (filter: string) => void;
}

function RecipeFilter({categories, filter, onApplyFilter}: RecipeFilterProps) {

    function handleFilter(filter: string) {
        onApplyFilter(filter);
    }

    return (<form className="status-filter">
        <div className="status-filter-title">
            Filtra:
        </div>
        <div className="status-filter-item">
            <input
                type="radio"
                name="status-filter-radio"
                value="all"
                checked={filter === "all"}
                id="all"
                onChange={() => handleFilter("all")}
            />
            <label htmlFor="all">All recipes</label>
        </div>
        {categories.map(category => (
            <div className="status-filter-item" key={category.id}>
                <input
                    type="radio"
                    name="status-filter-radio"
                    value={category.name}
                    checked={filter === category.name}
                    id={category.name}
                    onChange={() => handleFilter(category.name)}
                />
                <label htmlFor={category.name}>{category.name}</label>
            </div>
        ))}
    </form>);

}


export function Home(): ReactElement {
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [categories, setCategories] = useState<Category[]>([]);

    /*const [recipes, setRecipes] = useState<RecipeDTO[]>([]);*/
    const recipes: RecipeDTO [] = [
        {
            id: 1,
            title: "Spaghetti with tomato sauce",
            image: "1.png",
            categories: [{id: 2, name: "Main Course"}],
            description: "A classic Italian pasta dish with tomato sauce",
            instructions: "Boil spaghetti, heat tomato sauce, combine and serve.",
            preparationTime: 10,
            servings: 4,
            author: "Mattia",
            ingredients: [{name: "Spaghetti", quantity: "200g"}, {name: "Tomato sauce", quantity: "100ml"}],
        },
        {
            id: 2,
            title: "Chocolate cake",
            image: "2.png",
            categories: [{id: 4, name: "Dessert"}],
            description: "Rich dark chocolate cake",
            instructions: "Mix ingredients, bake at 180°C for 30 minutes.",
            preparationTime: 45,
            servings: 8,
            author: "Pietro",
            ingredients: [{name: "Chocolate", quantity: "200g"}],
        },
        {
            id: 3,
            title: "Caesar salad",
            image: "3.png",
            categories: [{id: 3, name: "Appetizer"}],
            description: "Fresh salad with chicken and dressing",
            instructions: "Chop lettuce, grill chicken, mix with dressing and croutons.",
            preparationTime: 20,
            servings: 2,
            author: "Andrea",
            ingredients: [{name: "Lettuce", quantity: "200g"}],
        },
        {
            id: 4,
            title: "Pancakes",
            image: "4.png",
            categories: [{id: 1, name: "Breakfast"}, {id: 4, name: "Dessert"}],
            description: "Fluffy morning pancakes",
            instructions: "Mix flour, eggs, milk, cook on skillet until golden brown.",
            preparationTime: 25,
            servings: 3,
            author: "Antonio",
            ingredients: [{name: "Pancake", quantity: "200g"}],
        },
        {
            id: 5,
            title: "Omelette",
            image: "5.png",
            categories: [{id: 1, name: "Breakfast"}],
            description: "Quick and easy egg dish",
            instructions: "Beat eggs, pour into skillet, cook until set, fold and serve.",
            preparationTime: 10,
            servings: 1,
            author: "Paola",
            ingredients: [{name: "Spaghetti", quantity: "200g"}, {name: "Tomato sauce", quantity: "100ml"}],
        },
        {
            id: 6,
            title: "BLT Sandwich",
            image: "6.png",
            categories: [{id: 2, name: "Main Course"}, {id: 3, name: "Appetizer"}],
            description: "Bacon, Lettuce, Tomato sandwich",
            instructions: "Toast bread, layer bacon, lettuce, tomato, and mayo.",
            preparationTime: 10,
            servings: 1,
            author: "Elena",
            ingredients: [{name: "Spaghetti", quantity: "200g"}, {name: "Tomato sauce", quantity: "100ml"}],
        }
        // hard coded, then server
    ];

    const filteredRecipes = categoryFilter === 'all'
        ? recipes
        : recipes.filter(recipe => recipe.categories.some(category => category.name === categoryFilter)
        );


    useEffect(() => {
        let valid = true;
        fetch(`http://localhost:7777/recipes/categories`, {
            credentials: "include",
        })
            .then(response => response.json())
            .then((categories: Category[]) => {
                if (valid) {
                    setCategories(categories);
                }
            });
        return () => {
            valid = false;
        };
    }, []);

    return (<>
        <div className="recipe-container">
            <div className="recipe-container-header">
                <div className="recipe-container-header-title">
                    <h1>Ricette</h1>
                </div>
                <RecipeFilter categories={categories} filter={categoryFilter}
                              onApplyFilter={setCategoryFilter}></RecipeFilter>
            </div>
            <div className="recipe-container-content">
                <div className="recipe-collection">
                    {filteredRecipes.map(recipe => (
                        <RecipeItem recipe={recipe} key={recipe.id}/>
                    ))}
                </div>
                <div className="recipe-sidebar"/>
            </div>
        </div>


        <AddToRecipeBookModal/>
    </>);

}