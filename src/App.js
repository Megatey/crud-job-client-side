import React, { useState, useEffect } from "react";
import "./App.scss";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./pages/Login";
import SignupPage from "./pages/Signup";
import CreateJob from "./pages/CreateJob"
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import {
  getJobs
} from "./redux/slices/jobSlice";
import { useSelector, useDispatch } from "react-redux";
import { fetchJobApi } from "./apiservice";
import JobCard from './components/JobCard'

function App() {
  const token = localStorage.getItem('token');
  return (
    <div className="App">
      <div className="menu-bar">
        <input type="checkbox" id="active"/>
        <label for="active" className="menu-btn">
          <i class="fas fa-bars"></i>
        </label>
        <div class="wrapper">
          <ul>
            {token && <><li>
              <Link to="/" className="anchor">
                Home
              </Link>
            </li>
              <li>
                <Link to="/login" className="anchor" onClick={() => localStorage.removeItem('token')}>
                  Log-out
                </Link>
              </li></>}
            {!token && (
              <>
                <li>
                  <Link to="/login" className="anchor">
                    Login
                  </Link>
                </li>
                <li>
                  <Link to="/signup" className="anchor">
                    Signup
                  </Link>
                </li>
              </>
            )}
          </ul>
        </div>
      </div>
      {/* <HomePage /> */}
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/createjob" element={<CreateJob />} />
      </Routes>
      <ToastContainer />
    </div>
  );
}

function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobs = useSelector(getJobs)
  console.log(jobs, "taken from redux with use selector")

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate("/login")
    }
    fetchJobApi(dispatch, jobs);
    // return () => {
    //   unsub()
    // };
  }, []);

  if (jobs?.length < 1) {
    return (
      <>
        <Link to="/createjob"><button class="btn">Add Interview Repo</button></Link>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            fontSize: 50,
            marginTop: "30px"
          }}
        >No Job Repos.</div>
        <p style={{ textAlign: "center" }}>{jobs?.length} jobs.</p>
      </>
    )
  }

  return (
    <div style={{ maxWidth: "100%", boxSizing: "border-box", padding: "0 20px" }}>
      <Link to="/createjob"><button class="btn">Add Interview Repo</button></Link>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          fontSize: 50,
        }}
      >
        List Of Jobs Interview.
      </div>
      <div className="list-container">
        {jobs?.map((job) => (<JobCard key={job?.job?._id} job={job} />))}
      </div>
      <p style={{ textAlign: "center" }}>{jobs?.length} jobs.</p>
    </div>
  );
}

export default App;
