import React, {useEffect, useState} from 'react';
import StudentPreview from "./StudentPreview";
import {ToastContainer} from "react-toastify";
import AddStudent from "./AddStudent";

const StudentList = () => {
    const [isPending, setIsPending] = useState(true);
    const [status, setStatus] = useState(200);
    const [statusMessage, setStatusMessage] = useState("");
    const [students, setStudents] = useState([]);
    const [showStudents, setShowStudents] = useState([]);
    const [isModalAddStudentOpen, setIsModalAddStudentOpen] = useState(false);

    const filterByClass = (event) => {
        const classNum = event.target.value;
        if(classNum) {
            const result = students.filter(student => {
                return student.class === classNum
            })
            setShowStudents(result);
        } else {
            setShowStudents(students);
        }
    }

    const sendData = () => {
        if(status === 200) {
            return (
                showStudents.map(student => {
                    return (
                        <StudentPreview key={student.id} id={student.id} name={student.firstName} lastName={student.lastName} classNum={student.class} studentsHandler={getStudents} />
                    );
                })
            )
        } else if (status === 401){
            return (
                <>
                    <div>Při zpracování požadavku došlo k chybě: </div>
                    <div>{status} - Nedostatečné oprávnění</div>
                </>
            )
        } else {
            return (
                <>
                    <div>Při zpracování požadavku došlo k chybě: </div>
                    <div>{status} - {statusMessage}</div>
                </>
            )
        }
    }

    const getStudents = () => {
        const username = localStorage.getItem("username");
        const password = localStorage.getItem("password");
        fetch(`http://localhost:4000/students`, {
            headers: {
                'Authorization': 'Basic ' + window.btoa(`${username}:${password}`)
            }
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                setStatus(json.status_code);
                setStatusMessage(json.status_message);
                setStudents(json.data);
                setShowStudents(json.data);
            })
            .finally(() => setIsPending(false))
    }

    useEffect(() => {
        getStudents();
    }, []);

    return (
        <div>
            {isPending
                ?
                <div>Načítám data</div>
                :
                <>
                    <div>Filtrovat dle třídy:</div>
                    <input type="number" onChange={filterByClass}/><br/>
                    {localStorage.getItem("role") === "ADMIN" &&
                        <>
                            <button className="successButton" onClick={() => setIsModalAddStudentOpen(true)}>Přidat studenta</button>
                            <AddStudent open={isModalAddStudentOpen} onClose={() => setIsModalAddStudentOpen(false)} studentsHandler={getStudents}/>
                        </>
                    }
                    {sendData()}
                    <ToastContainer />
                </>
            }
        </div>
    );
};

export default StudentList;
