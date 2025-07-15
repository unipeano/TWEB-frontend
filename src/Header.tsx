import {type ReactElement, useContext} from "react";
import "./Header.css"
import {type ActiveView, UserContext} from "./App.tsx";

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

            <div className="search">
                <form className="search-form" action="home.html" method="get">
                    <input type="text" name="search" placeholder="Cerca una ricetta..."/>
                    <button type="submit">Cerca</button>
                </form>
            </div>
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