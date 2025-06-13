import './SignUp.css';
import { useState } from 'react';


export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const handleLogin = (e) => {
        e.preventDefault(); 
        console.log(email, password);
    };

    return (
        <div className="signUpContainer">
            <div className="signUpCard">
                <div className="signUpHeader">SignUp</div>
                <form className ="form" onSubmit={handleLogin}>
                    <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                    <button type="submit">SignUp</button>
                </form>
            </div>
        </div>
    );
}
