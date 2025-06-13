import './Login.css';
import { useState } from 'react';


export default function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    return (

        <div className="loginBody">
            <div className="loginContainer">
                <div className="loginCard">
                    <div className="loginHeader">Login</div>
                    <form className="form"  style={{ display: 'flex', flexDirection: 'column', gap: '1em' }}>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <button type="submit">Login</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
