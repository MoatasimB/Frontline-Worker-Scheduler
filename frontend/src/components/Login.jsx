import React, { useState } from 'react';
import { InputText } from 'primereact/inputtext';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme CSS
import 'primereact/resources/primereact.min.css';          // Core CSS
import 'primeicons/primeicons.css';                        // PrimeIcons CSS

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [name, setName] = useState("");

    return (
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
        </div>
    );
};

export default Login;
