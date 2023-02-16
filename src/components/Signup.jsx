import './Signup.scss'

import React, { useState } from 'react'
import { useNavigate } from "react-router-dom";
import { toast } from 'react-toastify';


const Signup = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [btn, setBtn] = useState('Register')
    const [disabled, setDisabled] = useState(false)

    const handleSubmitForm = async (e) => {
        e.preventDefault();
        console.log("running..")
        if (!email || !password || !confirmPassword || !username) {
            toast.warning("Missing Field(s)!")
            return
        }
        if (password !== confirmPassword) {
            toast.warning("Passwords does not match!")
            return
        }
        if(password.length < 4) {
            toast.warning("password must not be less than 4 characters")
            return
        }
        setDisabled(true)
        try {
            setBtn("Registering")
            console.log("run api")
            const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/auth/register/`, {
                //   credentials: 'include',
                method: "POST",
                body: JSON.stringify({
                   name : username,
                    email: email,
                    password: password
                }),
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await res.json();
            if (data?.status === true) {

                setBtn("Successful!")
                toast.success(`Welcome ${data?.username}`)
                setDisabled(false)
                navigate("/login")
                return;
            }
            toast.error(data?.msg)
            setBtn("Register")
            setDisabled(false)

        } catch (error) {
            console.log(error, "error")
            setDisabled(false)
            setBtn("Register")
            toast.error("Network error. Check connection and try again")
            return
        }
    }

    return (
        <div style={{ display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "#e5e5e5", width: "100%", height: "100vh" }}>
            <div class="card">
                <div class="register-card-header">
                    <div class="register-text-header">Register</div>
                </div>
                <div class="register-card-body">
                    <form onSubmit={handleSubmitForm}>
                        <div class="register-form-group">
                            <label for="username">Username:</label>
                            <input required="" class="form-control" name="username" id="username" type="text" onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div class="register-form-group">
                            <label for="email">Email:</label>
                            <input required="" class="form-control" name="email" id="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                        </div>
                        <div class="register-form-group">
                            <label for="password">Password:</label>
                            <input required="" class="form-control" name="password" id="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        <div class="register-form-group">
                            <label for="confirm-password">Confirm Password:</label>
                            <input required="" class="form-control" name="confirm-password" id="confirm-password" type="password" onChange={(e) => setConfirmPassword(e.target.value)}/>
                        </div>
                        <input type="submit" class="register-btn" value={btn} disabled={disabled} />    </form>
                </div>
                <span className="notify">Already have an account? Go to <span className="go-login" onClick={() => navigate("/login")}>Login</span></span>
            </div>

        </div>
    )
}

export default Signup