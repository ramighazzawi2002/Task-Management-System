import axios from "axios";
import { Button } from "@material-tailwind/react";
import LoginForm from "./loginForm";
import SignupForm from "./signupForm";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./home";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginForm />} />
        <Route path="/signup" element={<SignupForm />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
