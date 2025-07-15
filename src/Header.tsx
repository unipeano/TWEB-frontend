import {type ReactElement, useContext, useState} from "react";
import "./Header.css"
import {type ActiveView, UserContext} from "./App.tsx";

// search form che prende il setting delle recipe così quando si fa una ricerca si impostano i risultati
export function SearchForm(): ReactElement {
    const [input, setInput] = useState("");

    const fetchData = (query: string) => {
        fetch(`http://localhost:7777/recipes?title=${encodeURIComponent(query)}`, {
            credentials: "include",
        })
            .then(res => res.json())
            .then(data => {
                console.log("Search results:", data);
                // setRecipes(data); // Assuming you have a state to hold the recipes
            })
            .catch(error => {
                console.error("Error fetching search results:", error);
            });
    }


    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault(); // Previene il comportamento di submit predefinito del form (refresh)
        if (input.trim()) { // Evita fetch se l'input è vuoto
            fetchData(input);
        }
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
}

export function Header({onLogout, currentView, onChangeView}: HeaderProps): ReactElement {
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
            <div className={"publish" + (currentView === "Publish" ? " active" : "")}
                 onClick={() => onChangeView("Publish")}>
                Pubblica
            </div>
            <div className={"profile" + (currentView === "Profile" ? " active" : "")}
                 onClick={() => onChangeView("Profile")}>
                Profilo
            </div>
            <SearchForm/>
        </div>
        <nav className="user-nav">
            <div className="nav-item"
                 onClick={() => onChangeView("Profile")}>{user}</div>
            {(user.length > 0 ?
                <div className="nav-item" onClick={() => onLogout()}>Esci</div>
                :
                <></>)}
        </nav>
    </header>);
}