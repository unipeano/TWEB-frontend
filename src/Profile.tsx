import "./Profile.css";
import {CreateRecipeBookForm} from "./CreateRecipeBookForm.tsx";
import {useContext, useEffect, useState} from "react";
import {type ActiveView} from "./App.tsx";
import {UserContext} from "./UserContext.ts";
import type {Recipe, RecipeBook} from "./data/data-model.ts";

interface RecipeBookNavProps {
    activeRecipeBook: string;
    onChangeRecipeBook: (name: string) => void;
    recipeBookRecipes: Recipe[];
}

export function RecipeBookNav({activeRecipeBook, onChangeRecipeBook, recipeBookRecipes}: RecipeBookNavProps) {
    const [recipeBookList, setRecipeBookList] = useState<RecipeBook[]>([]);
    const user = useContext(UserContext);
    const [showModal, setShowModal] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    function handleError(errorMessage: string | null) {
        setError(errorMessage);
    }

    function handleAddRecipeBook(name: string) {
        const newRecipeBook = {
            id: 0, // L'ID sarà generato dal server
            name: name,
            recipeBookOwner: user!.username,
        };

        fetch(`http://localhost:7777/me/recipebooks`, {
            method: "POST",
            credentials: "include",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(newRecipeBook),
        })
            .then(response => {
                if (response.ok)
                    return response.json();
                else throw Error("A recipe book with the same name by the same author already exists.");
            })
            .then((recipeBook: RecipeBook) => {
                setRecipeBookList(prev => [...prev, recipeBook]);
                setShowModal(false);
                setError(null);
            }).catch(error => setError(error.message));
    }

    useEffect(() => {
        let valid = true;
        fetch(`http://localhost:7777/me/recipebooks`, {
            credentials: "include",
        })
            .then(response => response.json())
            .then((recipeBookList: RecipeBook[]) => {
                if (valid) {
                    setRecipeBookList(recipeBookList);
                }
            });
        return () => {
            valid = false;
        };
    }, []);

    return (
        <div className="recipebooks-nav">
            {
                (
                    recipeBookList.map((recipeBook) => (
                        <div className={`recipebook-tab ${activeRecipeBook === recipeBook.name ? "active" : ""}`}
                             key={recipeBook.id}
                             onClick={() => onChangeRecipeBook(recipeBook.name)}>
                            {recipeBook.name}
                            {activeRecipeBook === recipeBook.name ? <span
                                className="count">{recipeBookRecipes.length}</span> : null}
                        </div>
                    ))
                )
            }

            <div className="add-recipebook" onClick={() => setShowModal(true)}>
                <img className="icons" alt="add"
                     src="/add.png"/>
                Nuovo
            </div>

            {showModal && <CreateRecipeBookForm onConfirm={handleAddRecipeBook} onCancel={() => setShowModal(false)}
                                                error={error} onError={handleError}
            />}
        </div>
    );
}


interface ProfileProps {
    onChangeView: (view: ActiveView) => void;
}

export function Profile({onChangeView}: ProfileProps) {
    const user = useContext(UserContext);
    const [recipeBookRecipes, setRecipeBookRecipes] = useState<Recipe[]>([]);
    const [activeRecipeBook, setActiveRecipeBook] = useState("My recipes");


    useEffect(() => {
        let valid = true;
        fetch(`http://localhost:7777/users/${user?.username}/recipebooks/${activeRecipeBook}/recipes`, {
            credentials: "include",
        })
            .then(response => response.json())
            .then((recipeList: Recipe[]) => {  // ATTENTION: recipe without categories and ingredients!!
                if (valid) {
                    setRecipeBookRecipes(recipeList);
                }
            });
        return () => {
            valid = false;
        };
    }, [user, activeRecipeBook]);

    return (<>
            <div className="profile-container">
                <div className="profile-header">
                    <img
                        src={`/image/users/${user?.image}`}
                        alt="Avatar"
                        className={`avatar ${user?.role === "CHEF" ? 'avatar-chef' : ''}`}
                    />
                    <div className="user-info">
                        <h1>
                            {user?.username}
                        </h1>
                        <p className="user-meta">
                            {user?.description}
                        </p>
                    </div>

                    {user?.role === "CHEF" && (
                        <div className="chef-badge" title="Chef professionista">
                            <img
                                className="chef-icon"
                                src="/star.png"
                                alt="Chef"
                            />
                            <span className="chef-label">Chef Certificato</span>
                        </div>
                    )}
                </div>

                <RecipeBookNav activeRecipeBook={activeRecipeBook}
                               onChangeRecipeBook={(name: string) => setActiveRecipeBook(name)}
                               recipeBookRecipes={recipeBookRecipes}/>

                <div className="recipebook-content">
                    <div className="recipes-grid">
                        {recipeBookRecipes.map((recipe) => (
                            <div className="recipe-card" key={recipe.id} onClick={() => {
                                onChangeView("Recipe Detail"); // adjust
                            }}>
                                <img
                                    src={`/image/recipes/${recipe.image}`}
                                    alt={recipe.title}
                                    className="recipe-image"
                                />
                                <div className="recipe-info">
                                    <h3 className="recipebook-recipe-title">{recipe.title}</h3>
                                    <div className="recipebook-recipe-meta">
                                        <span>
                                            <img className="icons" alt="bin"
                                                 src="/bin.png"/>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
}