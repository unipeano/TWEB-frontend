import "./UserRecipes.css";
import {RecipeItem} from "./RecipeItem.tsx";
import type {ActiveView} from "./App.tsx";
import {useEffect, useState} from "react";
import type {Recipe, User} from "./data/data-model.ts";

interface UserRecipesProps {
    onChangeView: (view: ActiveView) => void;
    author: User | null;
    onChangeRecipe: (recipe: Recipe) => void;
}

export function UserRecipes({
                                author,
                                onChangeView,
                                onChangeRecipe
                            }: UserRecipesProps) {

    const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);

    // altrimenti filtro le recipes della home per author, (per usare una fetch in più)
    useEffect(() => {
        let valid = true;
        fetch(`http://localhost:7777/recipes?author=${author?.username}`, {
            credentials: "include",
        })
            .then(response => response.json())
            .then((recipes: Recipe[]) => {
                if (valid) {
                    setUserRecipes(recipes);
                    console.log(recipes);
                }
            });
        return () => {
            valid = false;
        };
    }, [author]);


    return (<div className="user-central-area">
        <div className="user-recipe-container">
            <div className="user-recipe-container-header">
                <div className="user-image-container">
                    <img src={`/image/users/${author?.image}`} alt="user image" className="user-image"/>
                </div>
                <div className="user-info-container">
                    <h1 className="home-recipe-container-header-title">{author?.username}</h1>
                    <p>
                        {author?.description}
                    </p>
                </div>
            </div>
            <div className="user-recipe-container-content">
                <div className="recipe-collection">
                    {userRecipes.map(recipe =>
                        <RecipeItem recipe={recipe} key={recipe.id}
                                    onChangeView={onChangeView} onChangeRecipe={onChangeRecipe}/>)
                    }
                </div>
                <div className="user-recipe-sidebar"/>
            </div>
        </div>
    </div>);
}