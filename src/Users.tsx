import "./Users.css";
import {useEffect, useState} from "react";
import type {User} from "./data/data-model.ts";
import {useSetErrorContext} from "./ErrorContext.ts";
import {DeleteModal} from "./DeleteModal.tsx";

export function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const setError = useSetErrorContext();
    const [showDelete, setShowDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);

    useEffect(() => {
        let valid = true;
        fetch('http://localhost:7777/users', {
            credentials: 'include',
        })
            .then(res => res.json())
            .then((users: User[]) => {
                if (valid) {
                    setUsers(users);
                }
            });
        return () => {
            valid = false;
        };
    }, []);


    const handleDeleteClick = (username: string) => {
        setUserToDelete(username);
        setShowDelete(true);
    };

    function handleDeleteUser() {
        if (!userToDelete) return;
        fetch(`http://localhost:7777/users/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username: userToDelete}),
            credentials: 'include'
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Error deleting user.");
            }).then((users: User[]) => {
            setUsers(users);
            setError(null);
            setShowDelete(false);
            setUserToDelete(null);
        })
            .catch(err => setError(err.message));
    }


    return (
        <div className="admin-dashboard">
            <h1 className="dashboard-title">Users</h1>
            <div className="users-grid">
                {users.map(user => (
                    <div className="user-card" key={user.username}>
                        <div className="card-header">
                            <img
                                src={`/image/users/${user?.image}`}
                                alt={`${user.username}'s avatar`}
                                className={`user-avatar ${user?.role === "CHEF" ? 'user-avatar-chef' : ''}`}
                            />
                            <div className="user-card-meta">
                                <h2 className="username">{user.username}</h2>
                                <span className={`role-badge`}>
                                            {user.role}
                                        </span>
                            </div>
                        </div>
                        <p className="user-description">
                            {user.description}
                        </p>
                        <div className="card-actions">
                            <button
                                onClick={() => handleDeleteClick(user.username)}
                                className="delete-btn"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))
                }
            </div>
            {showDelete && (
                <DeleteModal
                    onCancel={() => {
                        setShowDelete(false);
                        setUserToDelete(null);
                    }}
                    onDelete={handleDeleteUser}
                    name={userToDelete!}
                />
            )}
        </div>
    );
}