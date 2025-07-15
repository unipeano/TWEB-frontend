import './App.css'
import {createContext, useEffect, useState} from "react";
import {Footer} from "./Footer.tsx";
import {Home} from "./Home.tsx";
import {Login} from "./Login.tsx";
import {Header} from "./Header.tsx";

export const UserContext = createContext<string>("");

interface SessionData {
    username: string
    message: string
}

function App() {
    const [currentUser, setCurrentUser] = useState("");
    const [error, setError] = useState<string | null>(null);

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
                    }}/>
                    <div className="central-area">
                        <Home/>
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
