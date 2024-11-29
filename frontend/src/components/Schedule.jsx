import React from 'react';
import Timesheet from "./Timesheet.jsx";
import {useParams, useNavigate} from "react-router-dom";
import {Button} from "primereact/button";

const Schedule = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const onEdit = () => {
        navigate(`schedule/${id}/edit`);
    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Timesheet/>
            <div>
                <Button label="Edit" type="button" onClick={onEdit}/>
                <Button label="Call For Sick" type="button" onClick={onEdit}/>
            </div>
        </div>
    );
};

export default Schedule;

