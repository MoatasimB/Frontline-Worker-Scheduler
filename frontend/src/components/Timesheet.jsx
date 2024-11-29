import React, {useEffect, useState} from "react";
import { Calendar } from 'primereact/calendar';
import {useParams} from "react-router-dom";

const Timesheet = ({viewOnly, minDate, maxDate}) => {
    const [dates, setDates] = useState(null);
    const today = new Date();
    const { id } = useParams();

    useEffect(() => {
        console.log("DATES: ", dates);
    }, [dates]);
    return (
        <div>
            <div className="card flex justify-content-center">
                <Calendar
                    value={dates}
                    onChange={(e) => setDates(e.value)}
                    inline
                    showWeek
                    selectionMode="multiple"
                    minDate={minDate}
                    maxDate={maxDate}
                    disabled={viewOnly}
                    style={{
                            fontSize: '5.5rem', // Adjust font size
                            width: '700px', // Adjust width
                            height: '700px', // Adjust height
                    }}
                />
            </div>
        </div>
    );
};

export default Timesheet;