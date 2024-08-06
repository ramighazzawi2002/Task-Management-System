import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";
const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async e => {
    e.preventDefault();
    console.log("Login submitted", { email, password });
    // Here you would typically handle the login logic
    const res = await axios.post("http://localhost:5000/api/users/login", {
      email,
      password,
    });
    Cookies.set("token", res.data.token);
    navigate("/");
  };

  return (
    <div className="max-w-md mx-auto  shadow-md p-16 bg-black text-white mt-32">
      <h2 className="text-2xl font-bold mb-5">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="email" className="block mb-1">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full px-3 py-2 border rounded-md text-black"
            required
          />
        </div>
        <div>
          <label htmlFor="password" className="block mb-1">
            Password
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full px-3 py-2 border rounded-md mb-5 text-black"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600"
        >
          Login
        </button>
      </form>
    </div>
  );
};
export default LoginForm;
