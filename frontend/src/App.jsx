import Todoo from "./Todoo.jsx"
import './App.css'
import SignUp from './SignUp';
import Login from './Login';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {

  return (
    <>
      <Router>
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} /> {/* Add route for /login */}
          <Route path="/todo" element={<Todoo />} />
          <Route path="*" element={<div>Page not found</div>} />
        </Routes>
      </Router>
    </>
  )
}

export default App
