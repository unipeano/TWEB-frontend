import {type ReactElement, useContext, useState} from "react";
import "./Header.css"
import {type ActiveView} from "./App.tsx";
import type {Recipe} from "./data/data-model.ts";
import {UserContext} from "./UserContext.ts";

interface SearchFormProps {
    onChangeView: (view: ActiveView) => void;
    onChangeRecipeList: (recipeList: Recipe[]) => void;
}

export function SearchForm({onChangeView, onChangeRecipeList}: SearchFormProps): ReactElement {
    const [input, setInput] = useState("");

    const fetchData = (query: string) => {
        fetch(`http://localhost:7777/recipes?title=${query}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then((recipeList: Recipe[]) => {
                onChangeRecipeList(recipeList);
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
            });
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Previene il comportamento di submit predefinito del form (refresh)
        fetchData(input); // se vuota restituisce tutte le ricette
        onChangeView('Home');
        setInput("");
    }

    return (<div className="search">
        <form className="search-form" onSubmit={handleSubmit}>
            <input type="text" name="search" value={input} onChange={(e) => setInput(e.target.value)}
                   placeholder="Cerca una ricetta..."/>
            <button type="submit">Cerca</button>
        </form>
    </div>);
}


export interface HeaderProps {
    onLogout: () => void;
    currentView: ActiveView;
    onChangeView: (view: ActiveView) => void;
    onChangeRecipeList: (recipeList: Recipe[]) => void;
}

export function Header({onLogout, currentView, onChangeView, onChangeRecipeList}: HeaderProps): ReactElement {
    const user = useContext(UserContext);
    return (<header>
        <div className="actions">
            <div className="logo-container">
                <img src="/image/logo3res.png" alt="logo"/>
            </div>
            <div className={"home" + (currentView === "Home" ? " active" : "")}
                 onClick={() => onChangeView("Home")}>
                Home
            </div>
            {user && user.role !== 'ADMIN' ? (<>
                <div className={"publish" + (currentView === "Publish" ? " active" : "")}
                     onClick={() => onChangeView("Publish")}>
                    Pubblica
                </div>
                <div className={"profile" + (currentView === "Profile" ? " active" : "")}
                     onClick={() => onChangeView("Profile")}>
                    Profilo
                </div>
            </>) : (<div className={"users" + (currentView === "Users" ? " active" : "")}
                         onClick={() => onChangeView("Users")}>
                Users
            </div>)
            }
            <SearchForm onChangeView={onChangeView} onChangeRecipeList={onChangeRecipeList}/>
        </div>
        <nav className="user-nav">
            <div className="nav-item"
                 onClick={() => {
                     if (user?.role !== 'ADMIN') onChangeView("Profile")
                 }}>
                {user?.username}
            </div>
            {(user ?
                <div className="nav-item" onClick={() => onLogout()}>Esci</div>
                :
                <></>)}
        </nav>
    </header>);
}