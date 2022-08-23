import React, {useState} from 'react';
import AddMark from "./AddMark";
import { useNavigate } from "react-router-dom";
import {toast} from "react-toastify";
import EditStudent from "./EditStudent";

const StudentPreview = ({id, name, lastName, classNum, studentsHandler}) => {
    const [isModalMarkOpen, setIsModalMarkOpen] = useState(false);
    const [isModalStudentOpen, setIsModalStudentOpen] = useState(false);
    const navigate = useNavigate();

    const deleteStudent = () => {
        fetch(`http://localhost:4000/students/${id}`, {
            method: 'DELETE',
            headers: {
                'Authorization': 'Basic ' + window.btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)
            }
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                studentsHandler();
                toast.success("Student byl odstraněn", {
                    position: toast.POSITION.BOTTOM_RIGHT
                });
            })
    }

    const showButtons = () => {
        const role = localStorage.role;
        switch (role) {
            case "TEACHER":
                return (
                    <>
                        <button onClick={() => navigate("/" + id)}>Zobrazit známky</button>
                        <button className="successButton" onClick={() => setIsModalMarkOpen(true)}>Přidat známku</button>
                        <AddMark open={isModalMarkOpen} onClose={() => setIsModalMarkOpen(false)} name={name} id={id} lastname={lastName} />
                    </>
                )
            case "ADMIN":
                return (
                    <>
                        <button onClick={() => setIsModalStudentOpen(true)}>Upravit studenta</button>
                        <EditStudent open={isModalStudentOpen} onClose={() => setIsModalStudentOpen(false)} name={name} id={id} lastname={lastName} classNum={classNum} studentsHandler={studentsHandler}/>
                        <button className="deleteButton" onClick={deleteStudent}>Smazat studenta</button>
                    </>
                )
        }
    }

    return (
        <div className="studentPreview">
            <div className="studentPreview-left">
                <div>{name} {lastName}</div>
                <div>Třída: {classNum}</div>
            </div>
            <div className="studentPreview-right">
                {showButtons()}
            </div>
        </div>
    );
};

export default StudentPreview;
