import React, {useEffect, useState} from 'react';
import Timesheet from "./Timesheet.jsx";
import {useParams, useNavigate} from "react-router-dom";
import {Button} from "primereact/button";

const Schedule = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [selectedDates, setSelectedDates] = useState([]);
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(viewDate?.toLocaleString("default", { month: "long" }));
    const [selectedYear, setSelectedYear] = useState(viewDate?.getFullYear());


    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    const onEdit = (sick) => {
        navigate(`/schedule/${id}/edit?sick=${sick}`);
    };

    const getTimesheet = async () => {
        console.log("Fetching timesheet for:", { selectedMonth, selectedYear });

        try {
            const payload = {
                employee_id: id,
                month: selectedMonth,
                year: selectedYear,
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
                if(data.ts) {
                    const dates = generateDates(data.ts);
                    console.log(
                        "Generated Dates:", dates.map((date) => date.toDateString()));
                    setSelectedDates(dates);
                }
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
    const { year, month, selected_days } = data; // Destructure relevant fields
    const monthIndex = new Date(`${month} 1, ${year}`).getMonth(); // Convert month to index (0-11)
    const yearValue = parseInt(year, 10);

    // Map selected_days to Date objects
    const dates = selected_days.map((day) => new Date(yearValue, monthIndex, day));

    return dates; // Return the array of Date objects
};



    useEffect(() => {
    if (selectedMonth && selectedYear) {
        // Construct the selected date
        const selectedDate = new Date(`${selectedMonth} 1, ${selectedYear}`);

        // Check if the selected date is within the allowed range
        if (selectedDate >= minDate && selectedDate <= maxDate) {
            console.log("Date is within range. Fetching timesheet...");
            getTimesheet();
        } else {
            console.log("Date is out of range. Skipping API call.");
        }
    }
}, [selectedMonth, selectedYear]);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Timesheet
                viewOnly={true} // Prevent date selection
                minDate={minDate}
                maxDate={maxDate}
                viewDate={viewDate}
                setViewDate={setViewDate}
                dates={selectedDates}
                handleDateChange={setSelectedDates}
                setSelectedMonth={setSelectedMonth}
                setSelectedYear={setSelectedYear}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button label="Edit" type="button" onClick={() => onEdit(false)} />
                <Button label="Call For Sick" type="button" onClick={() => onEdit(true)} />
            </div>
        </div>
    );
};

export default Schedule;


