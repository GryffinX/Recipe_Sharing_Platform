import './SignUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    
    
    const handleLogin = (e) => {
        e.preventDefault();
        navigate('/Login');
    };

    return (
        <div className='signUpBody'>
            <div className="signUpContainer">
                <div className="signUpCard">
                    <div className="signUpHeader">SignUp</div>
                    <form className="form" onSubmit={handleLogin}>
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <button type="submit">SignUp</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
