import React, { useState } from 'react'
import { deleteJobApi, upgradeJobApi } from '../apiservice'
import { useDispatch } from 'react-redux'

const JobCard = (props) => {
    console.log(props, "props")
    const dispatch = useDispatch()
    const { _id, status, company, position } = props.job
    const [standing, setStanding] = useState('')
    return (
        <>
            <div class="card">
                <div class="card-info">
                    <p class="text-title">{company}</p>
                    <p class="text-body">Status: {status}</p>
                </div>
                <div class="card-footer">
                    <span class="text-title">Position - {position}</span>
                </div>
                <div className="form-class">
                    <div class="selectdiv">
                        <label>
                            <select onChange={(e) => setStanding(e.target.value)}>
                                <option value="">Select Box</option>
                                <option value="interview">Interview</option>
                                <option value="declined">Decline</option>
                                <option value="pending">Pending</option>
                            </select>
                        </label>
                    </div>
                    <button onClick={() => upgradeJobApi(dispatch, _id, standing)}>
                        <span class="transition"></span>
                        <span class="gradient"></span>
                        <span class="label">Submit</span>
                    </button>
                </div>

                <button class="noselect" onClick={() => deleteJobApi(dispatch, _id)}><span class="text">Delete</span><span class="icon"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M24 20.188l-8.315-8.209 8.2-8.282-3.697-3.697-8.212 8.318-8.31-8.203-3.666 3.666 8.321 8.24-8.206 8.313 3.666 3.666 8.237-8.318 8.285 8.203z"></path></svg></span></button>
            </div>
        </>
    )
}

export default JobCard