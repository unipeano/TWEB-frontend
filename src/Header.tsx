import {type ReactElement, useContext} from "react";
import "./Header.css"
import {UserContext} from "./App.tsx";

interface HeaderProps {
    onLogout: () => void;
}

export function Header({onLogout}: HeaderProps): ReactElement {
    const user = useContext(UserContext);
    // TODO: Fixo layout, tornando a grid?
    return (<header>
        {(user.length > 0 ?
            <button className="user-item" onClick={() => onLogout()}>Esci</button>
            :
            <></>)}
    </header>);
}