import "./Users.css";
import {useEffect, useState} from "react";
import type {User} from "./data/data-model.ts";
import {useSetErrorContext} from "./ErrorContext.ts";
import {DeleteModal} from "./DeleteModal.tsx";

export function Users() {
    const [users, setUsers] = useState<User[]>([]);
    const setError = useSetErrorContext();
    const [showDelete, setShowDelete] = useState(false);
    const [showPromote, setShowPromote] = useState(false);
    const [userToDelete, setUserToDelete] = useState<string | null>(null);
    const [userToPromote, setUserToPromote] = useState<string | null>(null);

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

    const handlePromoteClick = (username: string) => {
        setUserToPromote(username);
        setShowPromote(true);
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


    function handleRoleChange(username: string) {
        fetch(`http://localhost:7777/users/${username}/role`, {
            credentials: 'include',
        })
            .then(res => {
                if (res.ok) {
                    return res.json();
                }
                throw new Error("Error promoting user to chef.");
            })
            .then((user: User) => {
                setUsers([...users.filter(u => u.username !== user.username), user]);
                setError(null);
                setShowPromote(false);
                setUserToPromote(null);
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
                            {user.role !== 'CHEF' && (<button
                                onClick={() => handlePromoteClick(user.username)}
                                className="role-promotion"
                            >
                                Promote to Chef
                            </button>)}
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

            {showPromote && (
                <div className="promote-modal">
                    <div className="promote-modal-content">
                        <h2>Promote {userToPromote} to Chef?</h2>
                        <div className="promote-actions">
                            <button onClick={() => {
                                handleRoleChange(userToPromote!);
                            }}>Yes
                            </button>
                            <button onClick={() => {
                                setShowPromote(false);
                                setUserToPromote(null);
                            }}>No
                            </button>
                        </div>
                    </div>
                    )
                </div>
            )}
        </div>
    );
}