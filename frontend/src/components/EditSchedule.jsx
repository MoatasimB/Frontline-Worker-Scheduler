import React, { useEffect, useState } from 'react';
import { useNavigate, useParams, useSearchParams } from 'react-router-dom';
import Timesheet from "./Timesheet.jsx";
import { Button } from "primereact/button";

const EditSchedule = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isSick = searchParams.get('sick') === 'true';

    const today = new Date();
    const [minDate, setMinDate] = useState(null);
    const [maxDate, setMaxDate] = useState(null);
    const [viewDate, setViewDate] = useState(today);
    const [selectedDatesByMonth, setSelectedDatesByMonth] = useState({});
    const [selectedMonth, setSelectedMonth] = useState(today?.toLocaleString("default", { month: "long" }));
    const [selectedYear, setSelectedYear] = useState(today?.getFullYear());
    const [apiDatesCache, setApiDatesCache] = useState({});
    const [userEditedDates, setUserEditedDates] = useState({});
    const [deselectedApiDates, setDeselectedApiDates] = useState({});

    const onBack = () => {
        navigate(`/schedule/${id}`);
    };

    useEffect(() => {
        // Define date constraints and viewDate for `isSick`
        if (isSick) {
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - today.getDay());

            const endOfWeek = new Date(today);
            endOfWeek.setDate(today.getDate() + (6 - today.getDay()));

            // Update state only if necessary
            if (!minDate || minDate.getTime() !== startOfWeek.getTime()) {
                setMinDate(startOfWeek);
            }
            if (!maxDate || maxDate.getTime() !== endOfWeek.getTime()) {
                setMaxDate(endOfWeek);
            }
            if (!viewDate || viewDate < startOfWeek || viewDate > endOfWeek) {
                setViewDate(startOfWeek);
            }
        } else {
            // Define date constraints and viewDate for `isSick = false`
            const nextMonth = new Date(today.getFullYear(), today.getMonth() + 1, 1);
            const firstDayNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth(), 1);
            const lastDayNextMonth = new Date(nextMonth.getFullYear(), nextMonth.getMonth() + 1, 0);

            if (!minDate || minDate.getTime() !== firstDayNextMonth.getTime()) {
                setMinDate(firstDayNextMonth);
            }
            if (!maxDate || maxDate.getTime() !== lastDayNextMonth.getTime()) {
                setMaxDate(lastDayNextMonth);
            }
            if (!viewDate || viewDate < firstDayNextMonth || viewDate > lastDayNextMonth) {
                setViewDate(firstDayNextMonth);
            }

            // Update selected month and year
            const currentMonth = firstDayNextMonth.toLocaleString("default", { month: "long" });
            if (selectedMonth !== currentMonth) {
                setSelectedMonth(currentMonth);
            }
            if (selectedYear !== firstDayNextMonth.getFullYear()) {
                setSelectedYear(firstDayNextMonth.getFullYear());
            }
        }
    }, [isSick]); // Dependencies limited to `isSick`

    const getTimesheet = async () => {
        console.log("Fetching timesheet for:", { selectedMonth, selectedYear });

        try {
            const payload = { employee_id: id, month: selectedMonth, year: selectedYear };
            const response = await fetch("http://127.0.0.1:5000/api/get_timesheet", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok && data.status === "success" && data.ts) {
                const dates = generateDates(data.ts);

                setApiDatesCache(prev => ({
                    ...prev,
                    [`${selectedMonth}-${selectedYear}`]: dates,
                }));

                const mergedDates = mergeDates(
                    dates,
                    userEditedDates[selectedMonth] || [],
                    deselectedApiDates[selectedMonth] || []
                );

                setSelectedDatesByMonth(prev => ({
                    ...prev,
                    [`${selectedMonth}-${selectedYear}`]: mergedDates,
                }));
            } else {
                console.error("Error fetching timesheet:", data.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    const generateDates = (data) => {
        const { year, month, selected_days } = data;
        const monthIndex = new Date(`${month} 1, ${year}`).getMonth();
        const yearValue = parseInt(year, 10);

        return selected_days.map(day => new Date(yearValue, monthIndex, day));
    };

    const mergeDates = (apiDates, userDates, deselectedApiDates) => {
        return Array.from(
            new Set([
                ...apiDates.filter(apiDate => !deselectedApiDates.some(date => date.toISOString() === apiDate.toISOString()))
                    .map(date => date.toISOString()),
                ...userDates.map(date => date.toISOString())
            ])
        ).map(dateString => new Date(dateString));
    };

    const handleDateChange = (dates) => {
        const validDates = (dates || []).filter(date => date >= minDate && date <= maxDate);
        const apiDates = apiDatesCache[selectedMonth] || [];

        const newDeselectedApiDates = apiDates.filter(
            apiDate => !validDates.some(date => date.toISOString() === apiDate.toISOString())
        );

        setDeselectedApiDates(prev => ({
            ...prev,
            [selectedMonth]: newDeselectedApiDates,
        }));

        setUserEditedDates(prev => ({
            ...prev,
            [selectedMonth]: validDates.filter(
                date => !apiDates.some(apiDate => apiDate.toISOString() === date.toISOString())
            ),
        }));

        setSelectedDatesByMonth(prev => ({
            ...prev,
            [`${selectedMonth}-${selectedYear}`]: validDates,
        }));
    };

    useEffect(() => {
        if (selectedMonth && selectedYear) {
            const selectedDate = new Date(`${selectedMonth} 1, ${selectedYear}`);
            if (selectedDate >= minDate && selectedDate <= maxDate) {
                if (apiDatesCache[`${selectedMonth}-${selectedYear}`]) {
                    const mergedDates = mergeDates(
                        apiDatesCache[`${selectedMonth}-${selectedYear}`],
                        userEditedDates[selectedMonth] || [],
                        deselectedApiDates[selectedMonth] || []
                    );

                    setSelectedDatesByMonth(prev => ({
                        ...prev,
                        [`${selectedMonth}-${selectedYear}`]: mergedDates,
                    }));
                } else {
                    getTimesheet();
                }
            }
        }
    }, [selectedMonth, selectedYear, minDate, maxDate]);

    return (
        <div style={{ display: "flex", flexDirection: "column" }}>
            <Timesheet
                viewOnly={false}
                minDate={minDate}
                maxDate={maxDate}
                viewDate={viewDate}
                setViewDate={setViewDate}
                dates={selectedDatesByMonth[`${selectedMonth}-${selectedYear}`] || []}
                setSelectedDates={handleDateChange}
                setSelectedMonth={setSelectedMonth}
                setSelectedYear={setSelectedYear}
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <Button label="Back" type="button" onClick={onBack} />
                <Button label="Save" type="button" onClick={() => console.log("Save clicked")} />
            </div>
        </div>
    );
};

export default EditSchedule;
