import axios from 'axios';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:3000/auth/login", { email, password })
            .then(async (res) => {
                if (res?.data?.message === "Successfully logged in") {
                    localStorage.setItem("user-access-token", res?.data?.accessToken);
                    alert("Login Successful");
                    navigate('/');
                }
                else {
                    alert("No user found with this email,Please SignUp");
                    navigate("/SignUp");
                }
            })
            .catch((error) => {
                console.log(error);
                alert("No user found with this email,Please SignUp");
                navigate("/SignUp");
            });
    };

    return (

        <div className="loginBody">
            <div className="loginContainer">
                <div className="loginCard">
                    <div className="loginHeader">Login</div>
                    <form className="form" onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
