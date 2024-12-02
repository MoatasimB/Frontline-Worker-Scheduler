import React from "react";
import { Calendar } from "primereact/calendar";
import { useParams } from "react-router-dom";
import '../css/Timesheet.css';

const Timesheet = ({
    viewOnly,
    minDate,
    maxDate,
    viewDate,
    setViewDate,
    dates,
    setSelectedDates,
    setSelectedMonth,
    setSelectedYear
}) => {
    const { id } = useParams();

    const handleViewDateChange = (e) => {
        let date = e.value;

        // Restrict navigation to minDate and maxDate
        if (date < minDate) date = minDate;
        if (date > maxDate) date = maxDate;

        const currentMonth = date?.toLocaleString("default", { month: "long" });
        const currentYear = date?.getFullYear();

        console.log("ViewDate Changed:", { date, currentMonth, currentYear });

        setSelectedMonth(currentMonth);
        setSelectedYear(currentYear);
        setViewDate(date);
    };

    const handleDateChange = (e) => {
        console.log("Date selection changed:", e.value);

        if (!viewOnly) {
            setSelectedDates(e.value || []); // Update or clear dates
        }
    };

    return (
        <div>
            <div className="card flex justify-content-center">
                <Calendar
                    value={dates}
                    viewDate={viewDate}
                    className={viewOnly ? "view-only-calendar" : ""}
                    onChange={handleDateChange}
                    onViewDateChange={handleViewDateChange}
                    inline
                    showWeek
                    selectionMode="multiple"
                    minDate={minDate}
                    maxDate={maxDate}
                    style={{
                        fontSize: "5.5rem",
                        width: "700px",
                        height: "700px",
                    }}
                />
            </div>
        </div>
    );
};

export default Timesheet;
