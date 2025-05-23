import './App.css'
import {Login} from "./Login.tsx";
import {createContext, useState} from "react";

export const UserContext = createContext<string>("");

interface SessionData {
    username: string
    message: string
}

function App() {
    const [currentUser, setCurrentUser] = useState("");

    return (<UserContext.Provider value={currentUser}>
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
