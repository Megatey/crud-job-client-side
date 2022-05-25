import logo from "./logo.svg";
import React, { useState, useEffect } from "react";
import "./App.scss";
import Login from "./pages/Login";
import Cookies from "js-cookie";
import SignupPage from "./pages/Signup";
import { BrowserRouter as Router, Routes, Route, Link, useNavigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import {setValidate, getValidate, setUserData} from './redux/slices/authSlice';
import { useSelector, useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const validate = useSelector(getValidate);

  console.log(validate, "as validate")

  return (
      <div className="App">
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            {!validate && (
              <>
                <li>
                  <Link to="/login">Login</Link>
                </li>
                <li>
                  <Link to="/signup">Signup</Link>
                </li>
              </>
            )}
          </ul>
        </nav>

        <Routes>
          <Route
            path="/"
            element={
                <HomePage />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </div>
  );
}

function HomePage() {
  const dispatch = useDispatch()
  const navigate = useNavigate();

  const validateAuth = async () => {
    try {
      const res = await fetch(`https://auth-checkout-server.vercel.app/get_users_data`, {
        credentials: "include",
      });
      const data = await res.json();
      console.log(data.success, "As data");
      if (data.success !== true) {
        navigate('/login');
        return;
      }
      ;
      dispatch(setValidate(true))
      dispatch(setUserData(data.data));
      navigate('/dashboard');
      return
    } catch (error) {
      console.log(error, "error");
    }
  };

  useEffect(() => {
    const unsub = validateAuth();
    return () => {
      // unsub()
    };
  }, []);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: 50,
      }}
    >
      Checking Auth.....
    </div>
  );
}

export default App;
