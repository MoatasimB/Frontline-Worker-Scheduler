import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import { Button } from 'primereact/button';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme CSS
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // PrimeIcons CSS
import { Dropdown } from 'primereact/dropdown';

const Register = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");
    const [submittedDetails, setSubmittedDetails] = useState(false);
    const [selectedManager, setSelectedManager] = useState(null);
    const [managers, setManagers] = useState([]);

    const onNextClick = () => {
        getAllManagers();
        setSubmittedDetails(true);
    }

    const getAllManagers = () => {
        const dummyData = [
            {
                "name": "John",
                "id": "1"

            },
            {
                "name": "James",
                "id": "2"

            },
            {
                "name": "Jack",
                "id": "3"

            }
        ]

        setManagers(dummyData);
    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        // Create a payload object with user input
        const payload = {
            username,
            password,
            email,
            name,
        };

        try {
            // Send a POST request to your backend
            const response = await fetch('http://127.0.0.1:5000/api/add_user', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            });
            const data = await response.json();
            console.log("Response Status:", response.status);

            if (response.ok && data.status === 'success') {

                console.log('Success:', data);
                alert('User submitted successfully!');
            } else {
                console.error('Error:', data.message);
                alert(`Submission failed. Please try again.\`${data.message}`);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred while submitting. Please try again.');
        }
    };

    return (
        <div>
            {!submittedDetails && (
                <form
                    onSubmit={onNextClick}
                    style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: 'auto' }}
                >
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: 'auto' }}>
                    <span className="p-float-label" style={{marginBottom: '8px'}}>
                        <InputText id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                        <label htmlFor="username">Username</label>
                    </span>
                    <span className="p-float-label" style={{marginBottom: '8px'}}>
                        <InputText id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                        <label htmlFor="password">Password</label>
                    </span>
                    <span className="p-float-label" style={{marginBottom: '8px'}}>
                        <InputText id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
                        <label htmlFor="email">Email</label>
                    </span>
                    <span className="p-float-label" style={{marginBottom: '8px'}}>
                        <InputText id="name" value={name} onChange={(e) => setName(e.target.value)} />
                        <label htmlFor="name">Name</label>
                    </span>
                    <Button label="Next" type="submit" disabled={username === "" || password === "" || email === "" || name === ""} />

                </div>
                </form>
            )}
            {submittedDetails && (
                <div className="card flex justify-content-center">
                    <Dropdown value={selectedManager} onChange={(e) => setSelectedManager(e.value)} options={managers}
                              optionLabel="name"
                              placeholder="Select a Manager" className="w-full md:w-14rem"/>
                </div>
            )}
        </div>
    );
};

export default Register;
