import React, {useEffect, useState} from 'react';
import Timesheet from "./Timesheet.jsx";
import {useParams, useNavigate} from "react-router-dom";
import {Button} from "primereact/button";

const Schedule = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedDates, setSelectedDates] = useState([]);
    const [viewDate, setViewDate] = useState([new Date().toLocaleString("default", { month: "long" }), new Date().getFullYear()]);

    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);
    const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"];

    const onEdit = (sick) => {
        navigate(`/schedule/${id}/edit?sick=${sick}`);
    };

    const getTimesheet = async () => {
        const [currentMonth, currentYear] = viewDate;
        console.log("Fetching timesheet for:", { currentMonth, currentYear }); // Debug

        try {
            const payload = {
                employee_id: id,
                month: currentMonth,
                year: currentYear,
            };

            const response = await fetch("http://127.0.0.1:5000/api/get_timesheet", {
                method: "POST", // POST is more common for payloads
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok && data.status === "success") {
                console.log("Success:", data);
                const dates = generateDates(data.ts);
                console.log(
                    "Generated Dates:", dates.map((date) => date.toDateString()));
                setSelectedDates(dates);
            } else if (response.ok && data.status === "fail") {
                console.error("API returned fail status:", data.message);
            } else {
                console.error("Error:", data.message);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const generateDates = (data) => {
        const { month, year, ...weeks } = data;
        const monthIndex = new Date(`${month} 1, ${year}`).getMonth(); // Month index (0 = January, 11 = December)
        const yearValue = parseInt(year, 10);
        const firstDayOfMonth = new Date(yearValue, monthIndex, 1).getDay(); // Day index of the 1st day (0 = Sunday)
        const daysOfWeek = ["Sun", "Mon", "Tues", "Wed", "Thurs", "Fri", "Sat"]; // Ensure consistent order
        let dates = [];

        Object.entries(weeks).forEach(([weekName, week], weekIndex) => {
            daysOfWeek.forEach((day, dayIndex) => {
                if (week[day] === "1") {
                    // Calculate the date offset based on week and day
                    const dayOffset = (7 * weekIndex) + (dayIndex - firstDayOfMonth);

                    // Adjust for negative offsets (e.g., days before the first Sunday)
                    const dayOfMonth = 1 + dayOffset;

                    // Calculate the actual date
                    const actualDate = new Date(yearValue, monthIndex, dayOfMonth);

                    // Validate the date is within the correct month
                    if (actualDate.getMonth() === monthIndex) {
                        dates.push(actualDate);
                    }
                }
            });
        });

        return dates;
    };



    useEffect(() => {
        if(viewDate) {
            getTimesheet();
        }
    }, [viewDate]);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Timesheet
                viewOnly={true}
                minDate={minDate}
                maxDate={maxDate}
                viewDate={viewDate}
                setViewDate={setViewDate} // Pass setViewDate correctly
                dates={selectedDates}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button label="Edit" type="button" onClick={() => onEdit(false)} />
                <Button label="Call For Sick" type="button" onClick={() => onEdit(true)} />
            </div>
        </div>
    );
};

export default Schedule;


