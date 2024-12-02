import React, { useEffect, useState } from "react";
import { Calendar } from "primereact/calendar";
import { useParams } from "react-router-dom";

const Timesheet = ({ viewOnly, minDate, maxDate, setViewDate }) => {
    const [dates, setDates] = useState(null);
    const { id } = useParams();

    const handleDateChange = (e) => {
        if (!viewOnly) {
            setDates(e.value);
        }
    };

    const handleDateSelect = (e) => {
        if (viewOnly) {
            e.preventDefault();
        }
    };

    const handleViewDateChange = (e) => {
        const viewDate = e.viewDate;
        const currentMonth = viewDate.toLocaleString("default", { month: "long" });
        const currentYear = viewDate.getFullYear();

        setViewDate([currentMonth, currentYear]);
    };

    useEffect(() => {
        console.log("DATES: ", dates);
    }, [dates]);

    return (
        <div>
            <div className="card flex justify-content-center">
                <Calendar
                    value={dates}
                    onChange={handleDateChange}
                    onSelect={handleDateSelect}
                    onViewDateChange={handleViewDateChange}
                    inline
                    showWeek
                    selectionMode="multiple"
                    minDate={minDate}
                    maxDate={maxDate}
                    style={{
                        fontSize: "5.5rem", // Adjust font size
                        width: "700px", // Adjust width
                        height: "700px", // Adjust height
                        pointerEvents: viewOnly ? "auto" : "all", // Allow navigation
                        opacity: viewOnly ? 0.7 : 1, // Visual cue for view-only mode
                    }}
                />
            </div>
        </div>
    );
};

export default Timesheet;
