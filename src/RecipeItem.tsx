import type {RecipeDTO} from "./data/data-model.ts";
import type {ReactElement} from "react";

interface RecipeItemProps {
    recipe: RecipeDTO;
}

export function RecipeItem(props: RecipeItemProps): ReactElement {
    const {recipe} = props;

    const categories: ReactElement[] = recipe.categories.map(c => <span className="recipe-category"
                                                                        key={c.id}>{c.name}</span>);

    return (
        <div className="recipe-item" data-recipeid={recipe.id}>
            <img
                className="recipe-image"
                alt={recipe.title}
                src={"/image/recipes/" + recipe.image}
            />
            <div className="recipe-content">
                <div className="recipe-header">
                    <h3 className="recipe-title">{recipe.title}</h3>
                    <button className="add-to-recipebook">+</button>
                </div>
                <div className="recipe-categories">
                    {categories}
                </div>
                <p className="recipe-description">
                    {recipe.description}
                </p>
                <div className="recipe-meta">
                    <div className="recipe-details">
                        <span><img className="icons" alt="clock"
                                   src="/clock.png"/> {recipe.preparationTime} min</span>
                        <span><img className="icons" alt="serving-dish"
                                   src="/serving-dish.png"/> {recipe.servings} pers.</span>
                        <span className="recipe-author"><img className="icons" alt="chef"
                                                             src="/chef.png"/> <a
                            href="user-recipe.html">{recipe.author}</a></span>
                    </div>
                    <a href="recipe-details.html">
                        <button className="recipe-action">Vedi ricetta</button>
                    </a>
                </div>
            </div>
        </div>
    );
}