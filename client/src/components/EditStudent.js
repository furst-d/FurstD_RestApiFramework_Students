import React, {useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditStudent = ({ open, onClose, name, lastname, id, classNum, studentsHandler }) => {
    const [nameForm, setNameForm] = useState(name);
    const [lastNameForm, setLastNameForm] = useState(lastname);
    const [classNumForm, setClassNumForm] = useState(classNum);

    const saveStudent = () => {
        fetch(`http://localhost:4000/students/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + window.btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)
            },
            body: JSON.stringify({
                name: nameForm,
                lastname: lastNameForm,
                class: classNumForm
            })
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                onClose();
                studentsHandler();
                toast.success("Student byl upraven", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    }

    if(!open) return null;
    return (
        <>
            <div className="overlay" />
            <div className="modal">
                <h2>Upravit studenta</h2>
                <input type="text" value={nameForm} onChange={(event) => setNameForm(event.target.value)}/> <br />
                <input type="text" value={lastNameForm} onChange={(event) => setLastNameForm(event.target.value)}/> <br />
                <input type="number" value={classNumForm} onChange={(event) => setClassNumForm(Number(event.target.value))}/> <br />
                <button className="deleteButton" onClick={onClose}>Zrušit</button>
                <button onClick={saveStudent}>Uložit</button>
            </div>
        </>
    );
};

export default EditStudent;
