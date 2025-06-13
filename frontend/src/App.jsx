import './App.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import RecipesView from './views/RecipesView';
import Login from './views/Login';
import SignUp from './views/SignUp';
import MyWorkView from './views/MyWorkView';


function App() {
  
  return (
    <>
    <Router>
                <Routes>
                    {/* <Route path='/' element={<RecipesView source = {"sample"}/>} /> */}
                    <Route path='/Login' element={<Login />} />
                    <Route path='/SignUp' element={<SignUp />} />
                    <Route path='/MyWork' element={<MyWorkView/>}></Route>
                </Routes>
            </Router>
     
    </>
  )
}

export default App
