import {type ReactElement, useState} from "react";
import "./Login.css";

interface LoginProps {
    onLogin: (name: string, password: string) => void
}

export function Login({onLogin}: LoginProps): ReactElement {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <form className="login-form">
            <h1>Login</h1>
            <div>
                <input type="text"
                       id="username"
                       placeholder="Username"
                       name="username"
                       value={username}
                       onChange={(e) => setUsername(e.target.value)}/>
            </div>
            <div>
                <input type="text"
                       id="password"
                       placeholder="Password"
                       name="password"
                       value={password}
                       onChange={(e) => setPassword(e.target.value)}/>
            </div>
            <div className="actions">
                <div className="form-action login"
                     onClick={() => onLogin(username, password)}>Login
                </div>
            </div>
        </form>
    );
}