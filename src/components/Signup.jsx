import React, {useState} from 'react'
import { useNavigate } from "react-router-dom";
import { getValidate, setValidate, getUserData, setUserData } from "../redux/slices/authSlice";
import { useSelector, useDispatch } from 'react-redux'


const Signup = () => {
    const navigate = useNavigate();
    const [emailAddress, setEmailAddress] = useState('')
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [btn, setBtn] = useState('Register')

    const handleSubmitForm = async(e) => {
        e.preventDefault();
        console.log("running..")
        if(!emailAddress || !password || !confirmPassword || !username){
            alert("Missing Field(s)!")
            return 
        }
        if(password !== confirmPassword){
            alert("Passwords does not match!")
            return 
        }
        try {
            setBtn("Registering")
            console.log("run api")
<<<<<<< HEAD
           const res = await fetch(`http://localhost:3333/create_account`, {
=======
           const res = await fetch(`http://localhost:3333create_account`, {
>>>>>>> c381b47a83f56899081ed3248a9ccd99622dd304
                //   credentials: 'include',
               method:"POST",
               body:JSON.stringify({
                   emailAddress,
                   password,
                   username
               }),
               headers: {
                "Content-Type": "application/json",
              },
           });
           const data = await res.json();
           if(data?.success !== true){
            setBtn("Failed! Try Again")
               alert(data.message)
               return;
           }
           setBtn("Successful!")
           navigate('/login')

        } catch (error) {
            console.log(error, "error")
            return
        }
    }

  return (
    <div>
        <form onSubmit={handleSubmitForm}>
            <input type="text" placeholder='username' onChange={e => setUsername(e.target.value)} />
            <input type="email" placeholder='email' onChange={e => setEmailAddress(e.target.value)} />
            <input type="password" placeholder='password' onChange={e => setPassword(e.target.value)} />
            <input type="password" placeholder='confirm passsword' onChange={e => setConfirmPassword(e.target.value)} />
            <button>{btn}</button>
        </form>
    </div>
  )
}

export default Signup