import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  jobsLists: [],
};

export const jobSlice = createSlice({
  name: "jobs",
  initialState,
  reducers: {
    setJobs: (state, action) => {
      state.jobsLists = action.payload;
    },
  },
});

export let getJobs = (state) => state.jobs.jobsLists;
export let { setJobs } = jobSlice.actions;
export default jobSlice.reducer;
