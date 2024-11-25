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
    const [phone, setPhone] = useState("");
    const [selectedNurseType, setSelectedNurseType] = useState(null);
    const [submittedDetails, setSubmittedDetails] = useState(false);
    const [selectedManager, setSelectedManager] = useState(null);
    const [managers, setManagers] = useState([]);

    let nurseTypes = [
        {"name": "RN"},
        {"name": "ANC"}
    ]

    const onNextClick = () => {
        getAllManagers();
        setSubmittedDetails(true);
    }

    const getAllManagers = async () => {
        try {
            // Send a POST request to your backend
            const response = await fetch('http://127.0.0.1:5000/api/get_all_managers', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });
            const data = await response.json();
            console.log("Response Status:", response.status);

            if (response.ok && data.status === 'success') {
                setManagers(data.managers);

                console.log('Success:', data);
            } else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault(); // Prevent page reload

        // Create a payload object with user input
        const payload = {
            username,
            password,
            email,
            name,
            phone,
            type: selectedNurseType.name,
            manager_id: selectedManager.id,
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
                    <Dropdown
                        value={selectedManager}
                        onChange={(e) => setSelectedManager(e.value)}
                        options={managers}
                        optionLabel="name"
                        placeholder="Select a Manager"
                        className="w-full"
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            marginBottom: '25px',
                        }}
                    />
                    <Dropdown
                        value={selectedNurseType}
                        onChange={(e) => setSelectedNurseType(e.value)}
                        options={nurseTypes}
                        optionLabel="name"
                        placeholder="Select a nurse type"
                        className="w-full"
                        style={{
                            width: '100%',
                            maxWidth: '300px',
                            marginBottom: '25px',
                        }}
                    />
                    <form
                        onSubmit={handleSubmit}
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            maxWidth: '300px',
                            margin: 'auto',
                        }}
                    >
                        <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            gap: '1rem',
                            maxWidth: '300px',
                            margin: 'auto',
                        }}>
                            <span className="p-float-label" style={{ marginBottom: '8px', maxWidth: '300px' }}>
                                <InputText id="phone"
                                           value={phone}
                                           onChange={(e) => setPhone(e.target.value)}
                                           required
                                           type="tel"
                                           pattern="^\+?[1-9]\d{1,14}$"/>
                                <label htmlFor="phone">Phone Number</label>
                            </span>
                            <Button
                                label="Submit"
                                type="submit"
                                disabled={phone === "" || selectedNurseType === null || selectedManager === null}
                            />
                        </div>
                    </form>
                </div>
            )}
        </div>
    );
};

export default Register;
