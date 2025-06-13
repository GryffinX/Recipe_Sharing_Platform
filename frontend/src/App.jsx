import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import RecipesView from './views/RecipesView';
import Login from './views/Login';
import SignUp from './views/SignUp';



function App() {
  
  return (
    <>
    <Router>
                <Routes>
                    <Route path='/' element={<RecipesView source = {"sample"}/>} />
                    <Route path='/Login' element={<Login />} />
                    <Route path='/SignUp' element={<SignUp />} />
                    
                </Routes>
            </Router>
     
    </>
  )
}

export default App
