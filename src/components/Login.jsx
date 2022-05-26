import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getValidate,
  setValidate,
  getUserData,
  setUserData,
} from "../redux/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";
import Cookies from "universal-cookie";

const LoginPage = () => {
  const cookies = new Cookies();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const validate = useSelector(getValidate);
  const user_daya = useSelector(getUserData);
  const [emailAddress, setEmailAddress] = useState("");
  const [password, setPassword] = useState("");
  const [btn, setBtn] = useState("Submit Credentials");

  const handleLoginReq = async (e) => {
    e.preventDefault();
    setBtn("logging in...Please wait.");
    if (!emailAddress || !password) {
      setBtn("Submit Credentials");
      return alert("Missing Field(s)!");
    }
    try {
      const res = await fetch(`https://auth-checkout-server.vercel.app/login`, {
        method: "POST",
        body: JSON.stringify({
          emailAddress,
          password,
        }),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      const data = await res.json();
      if (!data.success) {
        alert(data.message);
        setBtn("failed. Try Again");
        return;
      }
      console.log(data, "As data");
      cookies.set("token", data.token, {
        path: "/",
        maxAge: 25200000,
        sameSite: "none",
        secure: true,
      });
      dispatch(setUserData(data?.data));
      dispatch(setValidate(true));
      setBtn("Success!");
      navigate("/dashboard");
      return;
    } catch (error) {
      setBtn("Error occured!");
    }
  };

  return (
    <div>
      <h1 style={{ textAlign: "center" }}>You have to login to continue.</h1>
      <form onSubmit={handleLoginReq}>
        <input
          type="email"
          placeholder="email"
          onChange={(e) => setEmailAddress(e.target.value)}
        />
        <input
          type="password"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>{btn}</button>
      </form>
    </div>
  );
};

export default LoginPage;
