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
import {ErrorContext, SetErrorContext} from "./ErrorContext.ts";

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

    function handleCleanUp(sd: SessionData) {
        setCurrentUser(sd.user);
        setCurrentView("Home");
        setCurrentAuthor(null);
        setCurrentRecipe(null);
        setRecipeList([]);
        setError(null);
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


    function handleDeleteRecipe(recipeId: number) {
        return fetch(`http://localhost:7777/recipes/delete`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            credentials: "include",
            body: JSON.stringify({id: recipeId}),
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                } else {
                    throw new Error("Error deleting recipe.");
                }
            }).then((recipes: Recipe[]) => {
                setCurrentView("Home");
                setRecipeList(recipes);
                setError(null);
                return true;
            })
            .catch(err => {
                setError(err.message);
                return false;
            });
    }

    function handleAddToBook(recipeBookId: number, recipeId: number) {
        return fetch(`http://localhost:7777/me/recipebooks/${recipeBookId}/recipes`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: recipeId}),
            credentials: "include",
        }).then(res => {
            if (res.ok) {
                setError(null);
                return true;
            } else {
                throw new Error("The recipe is already in the recipe book.");
            }
        })
            .catch(error => {
                setError(error.message);
                return false;
            });

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
        <ErrorContext.Provider value={error}>
            <SetErrorContext.Provider value={setError}>
                {(currentUser ?
                        <>
                            <Header onLogout={() => {
                                fetch("http://localhost:7777/session/logout", {
                                    credentials: "include",
                                })
                                    .then(res => res.json())
                                    .then((sd: SessionData) => {
                                        handleCleanUp(sd);
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
                                          onDeleteRecipe={handleDeleteRecipe}
                                          onAddToBook={handleAddToBook}
                                    />}
                                {currentView === "Publish" &&
                                    <CreateRecipeForm onChangeRecipeList={handleRecipeListChange}/>}
                                {currentView === "Profile" &&
                                    <Profile onChangeView={handleCurrentView} onChangeRecipe={handleRecipeChange}
                                             onChangeAuthor={handleAuthorChange}/>}
                                {currentView === "User Recipes" &&
                                    <UserRecipes onChangeView={handleCurrentView}
                                                 onChangeRecipe={handleRecipeChange}
                                                 author={currentAuthor}
                                                 onDeleteRecipe={handleDeleteRecipe}
                                                 onAddToBook={handleAddToBook}/>}
                                {currentView === "Recipe Detail" &&
                                    <RecipeDetails currentRecipe={currentRecipe}
                                                   onChangeView={handleCurrentView}
                                                   author={currentAuthor}
                                                   onDeleteRecipe={handleDeleteRecipe}
                                                   onAddToBook={handleAddToBook}/>}
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
                        />
                )}
            </SetErrorContext.Provider>
        </ErrorContext.Provider>
    </UserContext.Provider>);
}

export default App
