import React, { useEffect, useState } from 'react';
import {useNavigate, useParams, useSearchParams} from 'react-router-dom';
import Timesheet from "./Timesheet.jsx";
import { Button } from "primereact/button";

const EditSchedule = () => {
    const { id } = useParams();
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const isSick = searchParams.get('sick');

    const [selectedDatesByMonth, setSelectedDatesByMonth] = useState({});
    const [viewDate, setViewDate] = useState(new Date());
    const [selectedMonth, setSelectedMonth] = useState(
        viewDate?.toLocaleString("default", { month: "long" })
    );
    const [selectedYear, setSelectedYear] = useState(viewDate?.getFullYear());
    const [apiDatesCache, setApiDatesCache] = useState({});
    const [userEditedDates, setUserEditedDates] = useState({});
    const [deselectedApiDates, setDeselectedApiDates] = useState({});

    const [sickMinDate, setSickMinDate] = useState(null);
    const [sickMaxDate, setSickMaxDate] = useState(null);

    const today = new Date();
    const minDate = new Date(today.getFullYear(), today.getMonth(), 1);
    const maxDate = new Date(today.getFullYear(), today.getMonth() + 2, 0);

    const onBack = () => {
        navigate(`/schedule/${id}`);
    }

    // useEffect(() => {
    //     const today = new Date();
    //
    //     // Calculate the start of the week (Sunday)
    //     const startOfWeek = new Date(today);
    //     startOfWeek.setDate(today.getDate() - today.getDay());
    //
    //     // Calculate the end of the week (Saturday)
    //     const endOfWeek = new Date(today);
    //     endOfWeek.setDate(today.getDate() + (6 - today.getDay()));
    //
    //     setSickMinDate(startOfWeek);
    //     setSickMaxDate(endOfWeek);
    //     }, [])

    const getTimesheet = async () => {
        console.log("Fetching timesheet for:", { selectedMonth, selectedYear });

        try {
            const payload = {
                employee_id: id,
                month: selectedMonth,
                year: selectedYear,
            };

            const response = await fetch("http://127.0.0.1:5000/api/get_timesheet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok && data.status === "success") {
                console.log("Success:", data);
                if (data.ts) {
                    const dates = generateDates(data.ts);

                    // Cache API-provided dates for the current month
                    setApiDatesCache(prev => ({
                        ...prev,
                        [selectedMonth]: dates
                    }));

                    // Merge API dates with user edits
                    const mergedDates = mergeDates(
                        dates,
                        userEditedDates[selectedMonth] || [],
                        deselectedApiDates[selectedMonth] || []
                    );

                    setSelectedDatesByMonth(prev => ({
                        ...prev,
                        [`${selectedMonth}-${selectedYear}`]: mergedDates
                    }));
                }
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
        // Combine API dates and user edits, excluding deselected API dates
        const mergedDates = Array.from(
            new Set([
                ...apiDates
                    .filter(apiDate => !deselectedApiDates.some(date => date.toISOString() === apiDate.toISOString()))
                    .map(date => date.toISOString()),
                ...userDates.map(date => date.toISOString())
            ])
        ).map(dateString => new Date(dateString));

        return mergedDates;
    };

    const handleDateChange = (dates) => {
        const validDates = (dates || []).filter(
            date => date >= minDate && date <= maxDate
        );

        const apiDates = apiDatesCache[selectedMonth] || [];

        const newDeselectedApiDates = apiDates.filter(
            apiDate => !validDates.some(date => date.toISOString() === apiDate.toISOString())
        );

        setDeselectedApiDates(prev => ({
            ...prev,
            [selectedMonth]: newDeselectedApiDates
        }));

        setUserEditedDates(prev => ({
            ...prev,
            [selectedMonth]: validDates.filter(
                date => !apiDates.some(apiDate => apiDate.toISOString() === date.toISOString())
            )
        }));

        setSelectedDatesByMonth(prev => ({
            ...prev,
            [`${selectedMonth}-${selectedYear}`]: validDates
        }));

        console.log("Updated Selected Dates for Current Month:", validDates);
    };

    useEffect(() => {
        const allSelectedDates = Object.values(selectedDatesByMonth).flat();
        console.log("All Selected Dates Across All Months:", allSelectedDates);
    }, [selectedDatesByMonth]);

    useEffect(() => {
        if (selectedMonth && selectedYear) {
            const selectedDate = new Date(`${selectedMonth} 1, ${selectedYear}`);
            if (selectedDate >= minDate && selectedDate <= maxDate) {
                if (apiDatesCache[selectedMonth]) {
                    const mergedDates = mergeDates(
                        apiDatesCache[selectedMonth],
                        userEditedDates[selectedMonth] || [],
                        deselectedApiDates[selectedMonth] || []
                    );

                    setSelectedDatesByMonth(prev => ({
                        ...prev,
                        [`${selectedMonth}-${selectedYear}`]: mergedDates
                    }));
                } else {
                    getTimesheet();
                }
            } else {
                console.log("Date is out of range. Skipping API call.");
            }
        }
    }, [selectedMonth, selectedYear]);

    const formatDates = (dates) => {
      // Convert each date to a Date object and process
      const formatted = dates.reduce((acc, dateString) => {
        const monthNames = [
            "January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const date = new Date(dateString);
        const year = date.getFullYear().toString();
        const month = monthNames[date.getMonth()];
        const day = date.getDate();

        // Find or create the corresponding object in the accumulator
        let yearMonthObject = acc.find(item => item.year === year && item.month === month);

        if (!yearMonthObject) {
          yearMonthObject = { year, month, selected_days: [] };
          acc.push(yearMonthObject);
        }

        // Add the day to the selected_days list
        yearMonthObject.selected_days.push(day);

        return acc;
      }, []);

      return formatted;
    }

    const updateTimesheet = async () => {
        try {
            const allSelectedDates = Object.values(selectedDatesByMonth).flat();

            const payload = {
                employee_id: id,
                dates: formatDates(allSelectedDates),
            };

            const response = await fetch("http://127.0.0.1:5000/api/update_timesheet", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (response.ok && data.status === "success") {
                console.log("Timesheet updated successfully:", data);
            } else {
                console.error("Error updating timesheet:", data.message || "Unknown error");
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

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
                <Button label="Save" type="button" onClick={updateTimesheet} />
            </div>
        </div>
    );
};

export default EditSchedule;