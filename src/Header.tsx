import {type ReactElement, useContext} from "react";
import "./Header.css"
import {UserContext} from "./App.tsx";

interface HeaderProps {
    onLogout: () => void;
}

export function Header({onLogout}: HeaderProps): ReactElement {
    const user = useContext(UserContext);
    return (<header>
        <div className="actions">
            <div className="logo-container">
                <img src="/image/logo3res.png" alt="logo"/>
            </div>
            <div className="home">
                <p className="active"><a href="home.html">Home</a></p>
            </div>
            <div className="new">
                <p><a href="publish.html">Pubblica</a></p>
            </div>
            <div className="user">
                <p><a href="profile.html">Profilo</a></p>
            </div>

            <div className="search">
                <form className="search-form" action="home.html" method="get">
                    <input type="text" name="search" placeholder="Cerca una ricetta..."/>
                    <button type="submit">Cerca</button>
                </form>
            </div>
        </div>
        <nav className="user-nav">
            <a href="profile.html">
                <div className="nav-item">Mattia</div>
            </a>
            {(user.length > 0 ?
                <div className="nav-item" onClick={() => onLogout()}>Esci</div>
                :
                <></>)}
        </nav>
    </header>);
}