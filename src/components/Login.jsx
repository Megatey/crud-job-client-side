import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import { toast } from 'react-toastify';


const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState("Login");
  const [disabled, setDisabled] = useState(false)


  const handleLoginReq = async (e) => {
    e.preventDefault();
    setBtn("logging in...");
    if (!email || !password) {
      setBtn("Submit Credentials");
      return alert("Missing Field(s)!");
    }
    try {

      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/login/`, {
        method: "POST",
        body: JSON.stringify({
          email,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        // credentials: "include",
      });
      const data = await res.json();
      if (data?.status === true) {
        localStorage.setItem('token', data?.token)
        setBtn("Successful!")
        toast.success(`Welcome ${data?.username}`)
        setDisabled(false)
        navigate("/")
        return;
      }
      toast.error(data?.msg)
      setBtn("Login")
      setDisabled(false)
      return;
    } catch (error) {
      console.log(error, "error")
      setDisabled(false)
      setBtn("Login")
      toast.error("Network error. Pls check connection and try again")
    }
  };

  return (
    <div className="login-page">
      <h1 style={{ textAlign: "center" }}>You have to login to continue.</h1>
      <div class="login-card">
        <div class="card-header">
          <div class="log">Login</div>
        </div>
        <form onSubmit={handleLoginReq}>
          <div class="form-group">
            <label for="username">Email:</label>
            <input required="" name="email" id="email" type="text" onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div class="form-group">
            <label for="password">Password:</label>
            <input required="" name="password" id="password" type="password" onChange={(e) => setPassword(e.target.value)} />
          </div>
          <div class="form-group">
            <input value={btn} type="submit" disabled={disabled} />
          </div>
        </form>
        <span className="notify">Already have an account? Go to <span className="go-login" onClick={() => navigate("/signup")}>Sign-up</span></span>
      </div>

    </div>
  );
};

export default LoginPage;
