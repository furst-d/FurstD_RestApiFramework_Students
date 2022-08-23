import React, {useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddStudent = ({ open, onClose, studentsHandler }) => {
    const [name, setName] = useState("");
    const [lastName, setLastName] = useState("");
    const [classNum, setClassNum] = useState(0);

    const addStudent = () => {
        fetch(`http://localhost:4000/students`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' + window.btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)
            },
            body: JSON.stringify({
                name: name,
                lastname: lastName,
                class: classNum
            })
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                onClose();
                studentsHandler();
                toast.success("Student byl přidán", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    }

    if(!open) return null;
    return (
        <>
            <div className="overlay" />
            <div className="modal">
                <h2>Přidat studenta</h2>
                <input type="text" placeholder="Jméno" onChange={(event) => setName(event.target.value)}/> <br />
                <input type="text" placeholder="Příjmení" onChange={(event) => setLastName(event.target.value)}/> <br />
                <input type="number" placeholder="Třída" onChange={(event) => setClassNum(Number(event.target.value))}/> <br />
                <button className="deleteButton" onClick={onClose}>Zrušit</button>
                <button onClick={addStudent}>Uložit</button>
            </div>
        </>
    );
};

export default AddStudent;
