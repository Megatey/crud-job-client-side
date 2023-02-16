import { setJobs, getJobs } from "./redux/slices/jobSlice";
import {  toast } from 'react-toastify';


export const fetchJobApi = async (dispatch) => {
    const token = localStorage.getItem('token');
    try {
        console.log("fetching.....")
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/jobs/`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // credentials: "include",
        }
      );
      const data = await res.json();
      console.log("fetched")
      if (data?.status === true) {
        console.log(data?.jobs, "data?.jobs")
        dispatch(setJobs(data?.jobs));
        console.log(getJobs, "slice job")
        return;
      }
     toast.error(data?.msg)
      return;
    } catch (error) {
      console.log(error, "error");
      toast.error("Network Error. Check connection and refresh.")
    }
  };

  export const upgradeJobApi = async (dispatch, jobId, status) => {
    if(status === '') {
      toast.error("Choose a status")
      return;
    }
    const token = localStorage.getItem('token');
    try {
        console.log("patching.....")
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/jobs/${jobId}/`,
        {
          method: "PATCH",
        body: JSON.stringify({
          status: status
        }),
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // credentials: "include",
        }
      );
      const data = await res.json();
      console.log("patched")
      if (data?.status === true) {
        console.log(data?.data, "data?.jobs")
        toast.success("Status change successfull")
        toast.info("Refetching update data")
        fetchJobApi(dispatch)
        return;
      }
     toast.error(data?.message)
      return;
    } catch (error) {
      console.log(error, "error");
      toast.error("Network Error")
    }
  };

  export const deleteJobApi = async (dispatch, jobId) => {
    const token = localStorage.getItem('token');
    try {
        console.log("deleting.....")
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/api/v1/jobs/${jobId}/`,
        {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          // credentials: "include",
        }
      );
      const data = await res.json();
      console.log("deleted")
      if (data?.status === true) {
        console.log(data?.message, "delete message")
        toast.success("job deleted")
        toast.info("Refetching update data")
        fetchJobApi(dispatch)
        return;
      }
     toast.error(data?.message)
      return;
    } catch (error) {
      console.log(error, "error");
      toast.error("Network Error")
    }
  };

  export const createJobApi = async (dispatch, requestBody) => {
    const token = localStorage.getItem('token');

    console.log("creating")
    try { 
      console.log("creating to server")
      const res = await fetch(`${process.env.REACT_APP_BASE_URL}/api/v1/jobs/`, {
        method: "POST",
        body: JSON.stringify(
          requestBody
        ),
        headers: {
          "Authorization": `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        // credentials: "include",
      });
      const data = await res.json();
      console.log("done with server")
      if (data?.status === true) {
        console.log(data?.job, "job creaated")
        toast.success("Job created")
        toast.info("Refetching update data")
        fetchJobApi(dispatch)
        return;
    }
    toast.error(data?.msg ?? "server error")
      return;
    } catch (error) {
      console.log(error, "error")
      toast.error("Network Error")
    }
  };