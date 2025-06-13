import './Login.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate(); 

    const handleLogin = (e) => {
        e.preventDefault(); 
        console.log(email, password);
        navigate('/SignUp'); 
    };

    return (
        <div className="loginContainer">
            <div className="loginCard">
                <div className="loginHeader">Login</div>
                <form  className="form" onSubmit={handleLogin} style={{display:'flex', flexDirection:'column',gap:'1em'}}>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button type="submit">Login</button>
                </form>
            </div>
        </div>
    );
}
