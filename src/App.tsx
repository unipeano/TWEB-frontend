import './App.css'
import {useEffect, useState} from "react";
import {Home} from "./Home.tsx";
import {Login} from "./Login.tsx";
import type {Recipe, User} from "./data/data-model.ts";
import {UserRecipes} from "./UserRecipes.tsx";
import {Footer} from "./Footer.tsx";
import {RecipeDetails} from "./RecipeDetails.tsx";
import {Profile} from "./Profile.tsx";
import {CreateRecipeForm} from "./CreateRecipeForm.tsx";
import {Header} from "./Header.tsx";
import {UserContext} from './UserContext.ts';

export type ActiveView = "Home" | "Publish" | "Profile" | "Recipe Detail" | "User Recipes";

interface SessionData {
    user: User | null
    message: string
}

/*const viewPermissions = {
    ADMIN: ['Home', 'User Recipes', 'Recipe Detail'],
    USER: ['Home', 'Publish', 'Profile', 'Recipe Detail']
};*/


function App() {
    const [currentUser, setCurrentUser] = useState<User | null>(null);  //utente loggato
    const [error, setError] = useState<string | null>(null);
    const [currentView, setCurrentView] = useState<ActiveView>("Home");
    const [currentAuthor, setCurrentAuthor] = useState<User | null>(null);  //utente di cui si vogliono vedere le ricette
    const [currentRecipe, setCurrentRecipe] = useState<Recipe | null>(null);
    const [recipeList, setRecipeList] = useState<Recipe[]>([]);

    function handleAuthorChange(author: string) {
        fetch(`http://localhost:7777/users/${author}`, {credentials: "include"})
            .then(res => res.json())
            .then((user: User) => setCurrentAuthor(user))
            .catch(console.error);
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
        if (currentUser) { // solo se utente loggato
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
                    setCurrentUser(s.user);
                }
            });
        return () => {
            valid = false;
        };
    }

    useEffect(checkConnection, []);

    return (<UserContext.Provider value={currentUser}>
        {(currentUser ?
                <>
                    <Header onLogout={() => {
                        fetch("http://localhost:7777/session/logout", {
                            credentials: "include",
                        })
                            .then(res => res.json())
                            .then((sd: SessionData) => {
                                setCurrentUser(sd.user);
                                setCurrentView('Home');
                            });
                    }}
                            currentView={currentView}
                            onChangeView={handleCurrentView}
                            onChangeRecipeList={handleRecipeListChange}/>
                    <div className="central-area">

                        {/*{(currentUser.role === 'ADMIN' ?
                                viewPermissions.ADMIN :
                                viewPermissions.USER
                        ).includes(currentView) && (
                            <>*/}
                        {currentView === "Home" &&
                            <Home recipeList={recipeList}
                                  onChangeAuthor={handleAuthorChange}
                                  onChangeView={handleCurrentView}
                                  onChangeRecipe={handleRecipeChange}
                            />}
                        {currentView === "Publish" &&
                            <CreateRecipeForm onChangeRecipeList={handleRecipeListChange}/>}
                        {currentView === "Profile" &&
                            <Profile onChangeView={handleCurrentView}/>}
                        {currentView === "User Recipes" &&
                            <UserRecipes onChangeView={handleCurrentView}
                                         onChangeRecipe={handleRecipeChange}
                                         author={currentAuthor}/>}
                        {currentView === "Recipe Detail" &&
                            <RecipeDetails currentRecipe={currentRecipe}
                                           onChangeView={handleCurrentView}
                                           author={currentAuthor}/>}
                        {/*</>
                        )}*/}

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
                            setCurrentUser(sd.user);
                            setError(null);
                        })
                        .catch(err => {
                            setError(err.message);
                        })
                }}
                       error={error}/>
        )}
    </UserContext.Provider>);
}

export default App
