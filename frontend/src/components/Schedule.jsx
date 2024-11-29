import React from 'react';
import Timesheet from "./Timesheet.jsx";
import {useParams, useNavigate} from "react-router-dom";
import {Button} from "primereact/button";

const Schedule = () => {
    const { id } = useParams()
    const navigate = useNavigate()

    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1); // Start of the current month
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0); // End of the next month

    const onEdit = (sick) => {
        navigate(`/schedule/${id}/edit?sick=${sick}`);
    }

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Timesheet viewOnly={true} minDate={minDate} maxDate={maxDate}/>
            <div style={{display: "flex", justifyContent: 'space-between'}}>
                <Button label="Edit" type="button" onClick={() => {onEdit(false)}}/>
                <Button label="Call For Sick" type="button" onClick={() => {onEdit(true)}}/>
            </div>
        </div>
    );
};

export default Schedule;

