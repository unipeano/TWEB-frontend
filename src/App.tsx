import './App.css'
import {Login} from "./Login.tsx";
import {createContext, useEffect, useState} from "react";
import {Header} from "./Header.tsx";

export const UserContext = createContext<string>("");

interface SessionData {
    username: string
    message: string
}

function App() {
    const [currentUser, setCurrentUser] = useState("");

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
        <Header onLogout={() => {
            fetch("http://localhost:7777/session/logout", {
                credentials: "include",
            })
                .then(res => res.json())
                .then((sd: SessionData) => {
                    setCurrentUser(sd.username);
                });
        }}/>
        {(currentUser.length > 0 ?
            <section className="main">
                Logged in as {currentUser}
            </section> :
            <section className="login">
                <Login onLogin={(username, password) => {
                    fetch(`http://localhost:7777/session/login?username=${username}&password=${password}`,
                        {credentials: "include"})
                        .then(res => {
                            if (res.status === 200)
                                return res.json()
                            else throw new Error("credenziali non valide");
                        })
                        .then((sd: SessionData) => {
                            setCurrentUser(sd.username);
                        })
                        .catch(err => {
                            console.log(err);
                        })

                }}/>
            </section>)}
    </UserContext.Provider>)
}

export default App
