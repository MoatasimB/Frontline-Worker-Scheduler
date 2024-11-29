import React from 'react';
import { useParams, useSearchParams } from 'react-router-dom';
import Timesheet from "./Timesheet.jsx";

const EditSchedule = () => {
    const { id } = useParams(); // Extract the :id parameter
    const [searchParams] = useSearchParams(); // Access query parameters
    const sick = searchParams.get('sick');

    return (
        <div>
            
        </div>
    );
};

export default EditSchedule;