import React, {useEffect, useState} from 'react';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddMark = ({ open, onClose, name, lastname, id }) => {
    const [subjects, setSubjects] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [subjectId, setSubjectId] = useState("1");
    const [title, setTitle] = useState("");
    const [mark, setMark] = useState("");


    const saveMark = () => {
        fetch(`http://localhost:4000/students/marks`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Basic ' +
                    window.btoa(`${localStorage.getItem("username")}
                    :${localStorage.getItem("password")}`)
            },
            body: JSON.stringify({
                student: id,
                subject: subjectId,
                teacher: localStorage.getItem("id"),
                mark: mark,
                title: title
            })
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                toast.success("Známka byla uložena", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
                onClose();
            })
    }

    useEffect(() => {
        if(open) {
            fetch(`http://localhost:4000/subjects`, {
                headers: {
                    'Authorization': 'Basic ' + window.btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)
                }
            })
                .then(response => {
                    return response.json()
                })
                .then(json => {
                    setSubjects(json.data);
                })
                .finally(() => setIsPending(false))
        }
    }, [open]);

    if(!open) return null;
    return (
        <>
            <div className="overlay" />
            <div className="modal">
                <h2>Přidat známku</h2>
                <h3>{name} {lastname}</h3>
                <input type="text" placeholder="Název" onChange={(event) => setTitle(event.target.value)}/> <br />
                <select name="subjects" id="subjects" onChange={(event) => setSubjectId(event.target.value)}>
                    {!isPending && subjects.map(subject => {
                        return (
                            <option key={subject.value} value={subject.value} >{subject.label}</option>
                        )
                    })}
                </select> <br />
                <input type="number" placeholder="Známka" onChange={(event) => setMark(event.target.value)}/> <br />
                <button className="deleteButton" onClick={onClose}>Zrušit</button>
                <button onClick={saveMark}>Uložit</button>
            </div>
        </>
    );
};

export default AddMark;
