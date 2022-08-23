import React from 'react';
import LoginForm from "./LoginForm";

const AuthManager = ({ children }) => {

    const logout = () => {
        localStorage.removeItem("username");
        localStorage.removeItem("password");
        localStorage.removeItem("id");
        localStorage.removeItem("role");
        localStorage.removeItem("name");
        localStorage.removeItem("lastname");
        window.location.reload();
    }

    if(localStorage.getItem("username") && localStorage.getItem("password")) {
        return (
            <>
                <div>
                    { children }
                </div>
                <button onClick={logout} className="logoutButton">Odhlásit se</button>
            </>
        );
    } else {
        return (
            <div>
                <LoginForm />
            </div>
        );
    }
};

export default AuthManager;
