import './SignUp.css';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function SignUp() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUserName] = useState('');
    const navigate = useNavigate();
    
    
    const handleSignUp= (e) => {
        e.preventDefault();
         axios.post("http://localhost:3000/auth/signup",{ username, email, password })
            .then(async (res) => {
                if(res?.data?.message === "Successfully registered new user"){
                    alert("Signup Successful");
                    navigate('/Login');
                }
                else{
                    alert(res?.data?.message);
                }
            });
    };


    return (
        <div className='signUpBody'>
            <div className="signUpContainer">
                <div className="signUpCard">
                    <div className="signUpHeader">SignUp</div>
                    <form className="form" onSubmit={(e)=>{handleSignUp(e)}}>
                        <input type='text' value={username} onChange={(e) => setUserName(e.target.value)} placeholder="UserName" />
                        <input type='email' value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email" />
                        <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
                        <button type="submit">SignUp</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
