import React, {useEffect, useState} from 'react';
import Timesheet from "./Timesheet.jsx";
import {useParams, useNavigate} from "react-router-dom";
import {Button} from "primereact/button";

const Schedule = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [selectedDates, setSelectedDates] = useState([]);
    const [viewDate, setViewDate] = useState(new Date());

    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    const onEdit = (sick) => {
        navigate(`/schedule/${id}/edit?sick=${sick}`);
    }

    const getTimesheet = async () => {
        const currentMonth = 

        try {
            const payload = {
                "employee_id": id,
                "month": currentMonth,
                "year": currentYear
            }

            const response = await fetch('http://127.0.0.1:5000/api/get_timesheet', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok && data.status === 'success') {
                console.log('Success:', data);
                const dates = generateDates(data.ts)
                setSelectedDates(dates);

            } else if(response.ok && data.status === 'fail')  {
            }
            else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const generateDates = (data) => {
        const { month, year, ...weeks } = data;
        const monthIndex = new Date(`${month} 1, ${year}`).getMonth(); // Convert month to index
        const yearValue = parseInt(year);
        let dates = [];

        Object.values(weeks).forEach((week, weekIndex) => {
            daysOfWeek.forEach((day, dayIndex) => {
                if (week[day] === "1") {
                    // Calculate the date
                    const date = new Date(yearValue, monthIndex, 1);
                    const dayOffset = dayIndex - date.getDay();
                    const weekOffset = weekIndex * 7;
                    const actualDate = new Date(yearValue, monthIndex, 1 + dayOffset + weekOffset);

                    // Ensure the date is valid for the month
                    if (actualDate.getMonth() === monthIndex) {
                        dates.push(actualDate);
                    }
                }
            });
        });

        return dates;
    };

    useEffect(() => {

    }, [viewDate]);

    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <Timesheet
                viewOnly={true}
                minDate={minDate}
                maxDate={maxDate}
                viewDate={viewDate}
                setViewDate={setViewDate()}
            />
            <div style={{display: "flex", justifyContent: 'space-between'}}>
                <Button label="Edit" type="button" onClick={() => {onEdit(false)}}/>
                <Button label="Call For Sick" type="button" onClick={() => {onEdit(true)}}/>
            </div>
        </div>
    );
};

export default Schedule;

