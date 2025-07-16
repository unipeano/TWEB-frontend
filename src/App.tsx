import './App.css'
import {createContext, useEffect, useState} from "react";
import {Home} from "./Home.tsx";
import {Login} from "./Login.tsx";
import {Header} from "./Header.tsx";
import {CreateRecipeForm} from "./CreateRecipeForm.tsx";
import {Profile} from "./Profile.tsx";
import {RecipeDetails} from "./RecipeDetails.tsx";
import {UserRecipes} from "./UserRecipes.tsx";
import type {Recipe} from "./data/data-model.ts";
import {Footer} from "./Footer.tsx";

export const UserContext = createContext<string>("");
export type ActiveView = "Home" | "Publish" | "Profile" | "Recipe Detail" | "User Recipes";

interface SessionData {
    username: string
    message: string
}

function App() {
    const [currentUser, setCurrentUser] = useState("");  //utente loggato
    const [error, setError] = useState<string | null>(null);
    const [currentView, setCurrentView] = useState<ActiveView>("Home");
    const [user, setUser] = useState("");  //utente di cui si vogliono vedere le ricette
    const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);

    function handleUserChange(username: string) {
        setUser(username);
    }

    function handleRecipeChange(recipe: Recipe) {
        setCurrentRecipe(recipe);
    }


    function handleCurrentView(view: ActiveView) {
        setCurrentView(view);
        if (view === "Home") {
            document.title = "Home";
        } else if (view === "Publish") {
            document.title = "Pubblica";
        } else if (view === "Profile") {
            document.title = "Profilo";
        } else if (view === "Recipe Detail") {
            document.title = "Recipe Detail";
        } else if (view === "User Recipes") {
            document.title = "User Recipes";
        }
    }

    function handleRecipeListChange(recipeList: Recipe[]) {
        setRecipeList(recipeList);
    }

    useEffect(() => {
        if (currentUser.length > 0) { // solo se utente loggato
            let valid = true;
            fetch(`http://localhost:7777/recipes`, {
                credentials: "include",
            })
                .then(response => response.json())
                .then((recipeList: Recipe[]) => {
                    if (valid) {
                        setRecipeList(recipeList);
                    }
                });
            return () => {
                valid = false;
            };
        }
    }, [currentUser]);

    function checkConnection() {
        let valid = true;
        fetch('http://localhost:7777/session/login', {
            credentials: 'include',
        })
            .then(res => res.json())
            .then((s: SessionData) => {
                if (valid) {
                    setCurrentUser(s.username)
                }
            });
        return () => {
            valid = false;
        };
    }

    useEffect(checkConnection, []);

    return (<UserContext.Provider value={currentUser}>
        {(currentUser.length > 0 ?
                <>
                    <Header onLogout={() => {
                        fetch("http://localhost:7777/session/logout", {
                            credentials: "include",
                        })
                            .then(res => res.json())
                            .then((sd: SessionData) => {
                                setCurrentUser(sd.username);
                            });
                    }} currentView={currentView} onChangeView={handleCurrentView}
                            onChangeRecipeList={handleRecipeListChange}/>
                    <div className="central-area">
                        {currentView === "Home" &&
                            <Home recipeList={recipeList} onChangeUser={handleUserChange}
                                  onChangeView={handleCurrentView}
                                  onChangeRecipe={handleRecipeChange}
                            />}
                        {currentView === "Publish" && <CreateRecipeForm/>}
                        {currentView === "Profile" && <Profile onChangeView={handleCurrentView}/>}
                        {currentView === "Recipe Detail" &&
                            <RecipeDetails currentRecipe={currentRecipe} onChangeView={handleCurrentView}
                                           onChangeUser={handleUserChange}/>}
                        {currentView === "User Recipes" &&
                            <UserRecipes user={user} onChangeUser={handleUserChange} onChangeView={handleCurrentView}
                                         onChangeRecipe={handleRecipeChange}/>}
                        <Footer/>
                    </div>
                </>
                :
                <Login onLogin={(username, password) => {
                    fetch(`http://localhost:7777/session/login?username=${username}&password=${password}`,
                        {credentials: "include"})
                        .then(res => {
                            if (res.status === 200)
                                return res.json()
                            else throw new Error("Credenziali non valide");
                        })
                        .then((sd: SessionData) => {
                            setCurrentUser(sd.username);
                            setError(null);
                        })
                        .catch(err => {
                            setError(err.message);
                        })
                }} error={error}/>
        )}
    </UserContext.Provider>);
}

export default App
