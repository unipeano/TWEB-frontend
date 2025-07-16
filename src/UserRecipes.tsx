import "./UserRecipes.css";
import {RecipeItem} from "./RecipeItem.tsx";
import type {ActiveView} from "./App.tsx";
import {useEffect, useState} from "react";
import type {Recipe} from "./data/data-model.ts";

interface UserRecipesProps {
    onChangeView: (view: ActiveView) => void;
    user: string;
    onChangeUser: (user: string) => void;
    onChangeRecipe: (recipe: Recipe) => void;
}

export function UserRecipes({user, onChangeView, onChangeUser, onChangeRecipe}: UserRecipesProps) {

    const [userRecipes, setUserRecipes] = useState<Recipe[]>([]);

    // altrimenti filtro le recipes della home per author, (per usare una fetch in più)
    useEffect(() => {
        let valid = true;
        fetch(`http://localhost:7777/recipes?author=${encodeURIComponent(user)}`, {
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
    }, [user]);


    return (<div className="user-central-area">
        <div className="user-recipe-container">
            <div className="user-recipe-container-header">
                <div className="user-image-container">
                    <img src="/image/users/1.jpg" alt="user image" className="user-image"/>
                </div>
                <div className="user-info-container">
                    <h1 className="home-recipe-container-header-title">{user}</h1>
                    <p>
                        {"{"}description{"}"}
                    </p>
                </div>
            </div>
            <div className="user-recipe-container-content">
                <div className="recipe-collection">
                    {userRecipes.map(recipe =>
                        <RecipeItem recipe={recipe} key={recipe.id} onChangeUser={onChangeUser}
                                    onChangeView={onChangeView} onChangeRecipe={onChangeRecipe}/>)
                    }
                </div>
                <div className="user-recipe-sidebar"/>
            </div>
        </div>
    </div>);
}