import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";

const StudentDetail = () => {
    const { id } = useParams();
    const [subjects, setSubjects] = useState([]);
    const [isPending, setIsPending] = useState(true);
    const [marks, setMarks] = useState([]);
    const [marksAverage, setMarksAverage] = useState("0");
    const [status, setStatus] = useState(200);
    const [student, setStudent] = useState({});


    useEffect(() => {
        fetch(`http://localhost:4000/students/${id}`, {
            headers: {
                'Authorization': 'Basic ' + window.btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)
            }
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                setStudent(json.data[0]);
            })
            .finally(() => setIsPending(false))

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
    }, []);

    const showMarks = (event) => {
        fetch(`http://localhost:4000/students/${id}/${event.target.value}`, {
            headers: {
                'Authorization': 'Basic ' + window.btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)
            }
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                setStatus(json.status_code);
                setMarks(json.data);
                if(json.status_code === 200) {
                    showMarksAverage(event.target.value);
                }
            })
            .finally(() => setIsPending(false))
    }

    const showMarksAverage = (subjectId) => {
        fetch(`http://localhost:4000/students/${id}/${subjectId}/average`, {
            headers: {
                'Authorization': 'Basic ' + window.btoa(`${localStorage.getItem("username")}:${localStorage.getItem("password")}`)
            }
        })
            .then(response => {
                return response.json()
            })
            .then(json => {
                setStatus(json.status_code);
                setMarksAverage(json.data[0].average);
            })
            .finally(() => setIsPending(false))
    }

    return (
        <div>
            <h2>Student - {student.firstName} {student.lastName} </h2>
            <select name="subjects" id="subjects" onChange={showMarks}>
                {!isPending
                    && subjects.map(subject => {
                    return (
                        <option key={subject.value} value={subject.value}>{subject.label}</option>
                    )
                })}
            </select> <br />

            {!isPending && status === 200
                ?
                <>
                    <table className="marks">
                        <thead>
                        <tr>
                            <th>Název</th>
                            <th>Známka</th>
                            <th>Zapsal</th>
                            <th>Datum</th>
                        </tr>
                        </thead>
                        <tbody>
                        {marks.map(mark => {
                            return (
                                <tr key={mark.id}>
                                    <td>{mark.title}</td>
                                    <td>{mark.mark}</td>
                                    <td>{mark.firstName} {mark.lastName}</td>
                                    <td>{mark.created_date}</td>
                                </tr>
                            )
                        })}
                        </tbody>
                    </table><br/>
                    <div>Studijní průměr: {marksAverage}</div>
                </>
                :
                <div>Žádné známky nenalezeny</div>
            }

        </div>
    );
};

export default StudentDetail;
