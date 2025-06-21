import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipesView from './views/RecipesView';
import Login from './views/Login';
import SignUp from './views/SignUp';
import MyWorkView from './views/MyWorkView';
import axios from 'axios';

axios.defaults.baseURL = import.meta.env.VITE_API_URL;

function App() {
  
  return (
    <>
    <Router>
                <Routes>
                    <Route path='/' element={<RecipesView/>} />
                    <Route path='/SignUp' element={<SignUp />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/MyWorkView' element={<MyWorkView/>}></Route>
                </Routes>
            </Router>
     
    </>
  )
}

export default App
