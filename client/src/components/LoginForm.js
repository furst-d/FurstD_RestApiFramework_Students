import React, {useState} from 'react';
import sha256 from "sha256";

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [status, setStatus] = useState(200);
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState({});
    const [role, setRole] = useState("");

    const setUserData = () => {
        localStorage.clear();
        localStorage.setItem("username", username);
        localStorage.setItem("password", password);
        localStorage.setItem("id", data.id);
        localStorage.setItem("role", role);
        if(role === "TEACHER") {
            localStorage.setItem("name", data.firstName);
            localStorage.setItem("lastname", data.lastName);
        }
        window.location.reload();
    }

    const handleLogin = (event) => {
        event.preventDefault();

        if(username && password) {
            validateTeacher();
        }
    }

    const validateTeacher = () => {
        fetch(`http://localhost:4000/validate-teacher?username=${username}&password=${sha256(password)}`)
            .then(response => {
                return response.json()
            })
            .then(json => {
                setRole("TEACHER");
                setStatus(json.status_code);
                console.log(json);
                if(json.status_code === 404) {
                    validateAdmin();
                } else {
                    setData(json.data[0]);
                }
            })
            .finally(() => setIsPending(false))
    }

    const validateAdmin = () => {
        fetch(`http://localhost:4000/validate-admin?username=${username}&password=${sha256(password)}`)
            .then(response => {
                return response.json()
            })
            .then(json => {
                setRole("ADMIN");
                setStatus(json.status_code);
                console.log(json);
                if(json.status_code === 200) {
                    setData(json.data[0]);
                }

            })
            .finally(() => setIsPending(false))
    }

    return (
        <div>
            <h2>Přihlášení</h2>
            <input type="text" name="username" id="username" placeholder="Přihlašovací jméno" onChange={event => setUsername(event.target.value)}/><br />
            <input type="password" name="password" id="password" placeholder="Heslo" onChange={event => setPassword(event.target.value)}/><br />
            <input type="submit" name="submit" id="submit" onClick={handleLogin}/>
            {!isPending &&
                status === 200
                ?
                    setUserData()
                :
                <div>Chyba při přihlašování</div>
            }
        </div>
    );
};

export default LoginForm;
