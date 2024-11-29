import React, {useState} from 'react';
import {InputText} from "primereact/inputtext";
import {Button} from "primereact/button";
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [_, setValidUser] = useState(false);
    const [errorMessage, setErrorMessage] = useState("");
    const [userId, setUserId] = useState(null);

    const navigate = useNavigate();

    const onRegister = (e) => {
        e.preventDefault();
        navigate('/register');
    }

    const validateUser = async (e) => {
        e.preventDefault();
        try {
            const payload = {
                username,
                password
            }
            const response = await fetch('http://127.0.0.1:5000/api/validate_user', {
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
                setUserId(data.user.id);
                navigate(`/schedule/${data.user.id}`);
            } else if(response.ok && data.status === 'fail')  {
                setErrorMessage(data.message);
            }
            else {
                console.error('Error:', data.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }
    return (
        <div>
            <p style={{color: '#8B0000', fontSize: '25px'}}>{errorMessage}</p>
            <form
                onSubmit={validateUser}
                style={{display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: 'auto'}}
            >
                <div style={{display: 'flex', flexDirection: 'column', gap: '1rem', maxWidth: '300px', margin: 'auto'}}>
                    <span className="p-float-label" style={{marginBottom: '8px'}}>
                        <InputText id="login_username" value={username} onChange={(e) => setUsername(e.target.value)}/>
                        <label htmlFor="login_username">Username</label>
                    </span>
                    <span className="p-float-label" style={{marginBottom: '8px'}}>
                        <InputText id="login_password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                        <label htmlFor="login_password">Password</label>
                    </span>
                    <div style={{display: "flex"}}>
                        <Button label="Login" type="submit"
                                disabled={username === "" || password === ""}
                                style={{marginRight: '5px'}}
                        />
                        <Button label="Register" type="button" onClick={onRegister}/>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default Login;