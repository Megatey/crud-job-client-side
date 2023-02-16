/* eslint-disable no-unreachable */
import "./CreateJob.scss"
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { createJobApi } from "../apiservice";


const CreateJob = () => {
  const dispatch = useDispatch();
  const [company, setCompany] = useState("")
  const [position, setPosition] = useState("")

  const submitHandler = (e) => {
    e.preventDefault();
    if(!company || !position) {
      alert("you are missing some input fields")
      return;
    }

    let requestBody = {
      company: company,
      position: position
    }
    createJobApi(dispatch, requestBody)
  }


  return (
    <>
    <div class="five">
  <h1>Create Job Card</h1>
</div>
      <div class="form-box">

        <form>
          <div class="user-box">
            <input required={true} type="text" onChange={(e) => setCompany(e.target.value)} />
            <label>Company</label>
          </div>
          <div class="user-box">
            <input required={true} type="text" onChange={(e) => setPosition(e.target.value)} />
            <label>Position</label>
          </div><center>
            <span className="submit" onClick={submitHandler}>
              SEND
              <span></span>
            </span></center>
        </form>
      </div>
    </>
  );
};

export default CreateJob;
