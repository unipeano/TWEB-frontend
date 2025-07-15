import {type ReactElement, useState} from "react";
import "./Login.css";

interface LoginProps {
    onLogin: (name: string, password: string) => void
    error: string | null;
}

export function Login({onLogin, error}: LoginProps): ReactElement {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    return (
        <div className="login-container">
            <div className="login-card">
                <div className="login-logo-container">
                    <img src="/image/logo3res.png" alt="logo" className="login-logo"/>
                </div>

                <form className="login-form">
                    <h2 className="login-title">Accedi al tuo account</h2>

                    <div className="form-group">
                        <label htmlFor="username" className="input-label">Username</label>
                        <input
                            type="text"
                            id="username"
                            className="login-input"
                            placeholder="Inserisci il tuo username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="password" className="input-label">Password</label>
                        <input
                            type="password"
                            id="password"
                            className="login-input"
                            placeholder="Inserisci la tua password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>

                    <button
                        type="button"
                        className="login-button"
                        onClick={() => onLogin(username, password)}
                    >
                        Accedi
                    </button>
                    {error && (
                        <div className="error-message">
                            {error}
                        </div>
                    )}
                </form>
            </div>
        </div>
    );
}