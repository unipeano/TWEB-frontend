import {type ReactElement, useEffect, useState} from "react";
import "./Home.css";
import type {Category, Recipe} from "./data/data-model.ts";
import {RecipeItem} from "./RecipeItem.tsx";
import type {ActiveView} from "./App.tsx";

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

interface HomeProps {
    recipeList: Recipe[];
    onChangeView: (view: ActiveView) => void;
    onChangeAuthor: (author: string) => void;
    onChangeRecipe: (recipe: Recipe) => void;
}

export function Home({
                         recipeList,
                         onChangeView,
                         onChangeAuthor,
                         onChangeRecipe,
                     }: HomeProps): ReactElement {
    const [categoryFilter, setCategoryFilter] = useState<string>('all');
    const [categories, setCategories] = useState<Category[]>([]);

    const filteredRecipes = categoryFilter === 'all'
        ? recipeList
        : recipeList.filter(recipe => recipe.categories.some(category => category.name === categoryFilter)
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

    return (<div className="home-central-area">
        <div className="home-recipe-container">
            <div className="home-recipe-container-header">
                <div className="home-recipe-container-header-title">
                    <h1>Ricette</h1>
                </div>
                <RecipeFilter categories={categories} filter={categoryFilter}
                              onApplyFilter={setCategoryFilter}></RecipeFilter>
            </div>
            <div className="recipe-container-content">
                <div className="recipe-collection">
                    {filteredRecipes.map(recipe => (
                        <RecipeItem recipe={recipe} key={recipe.id}
                                    onChangeView={onChangeView} onChangeRecipe={onChangeRecipe}
                                    onChangeAuthor={onChangeAuthor}
                        />
                    ))}
                </div>
                <div className="recipe-sidebar"/>
            </div>
        </div>
    </div>);

}