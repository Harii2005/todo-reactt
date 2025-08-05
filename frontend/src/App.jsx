import Todoo from "./Todoo.jsx"
import './App.css'
import SignUp from './SignUp';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp/>}></Route>
          <Route path="/" element={<Todoo />}></Route>
        </Routes>
      </Router>
    </>
  )
}

export default App
