import { createAsyncThunk, createSlice, nanoid } from "@reduxjs/toolkit";
import axios from "axios";

const PROBLEMS_FETCH_POST_URL="http://localhost:5000/problems";

const initialState={
    problems:[],
    // 'idle': can fetch post | 'succeeded': fetched problems from backend | 'failed': failed to fetch data | loading: on the way to fetch
    status: 'idle',
    error: null
}

export const fetchProblems=createAsyncThunk('problems/fetchProblems',async()=>{
    try {
        const resp=await axios.get(PROBLEMS_FETCH_POST_URL);
        // console.log("rcvd from fetch");
        // console.log(resp.data.data);
        return [...resp.data.data];
    } catch (error) {
        return error.message;
    }
})

export const addNewProblem=createAsyncThunk('problems/addNewProblem',async(problemData)=>{
    try {
        const resp=await axios.post(PROBLEMS_FETCH_POST_URL,problemData);
        // console.log("axios get in slice");
        // console.log(problemData);
        // console.log(resp);
        return resp.data.data;
    } catch (error) {
        return error.message;
    }
})

export const updateProblem=createAsyncThunk('problems/updateProblem',async(problemData)=>{
    // console.log("update slice rcvd :");
    // console.log(problemData);
    try {
        const {_id} = problemData;
        // const UPDATE_URL=PROBLEMS_FETCH_POST_URL+`/${_id}`;
        // console.log("url : ",UPDATE_URL);
        const resp=await axios.patch(PROBLEMS_FETCH_POST_URL+`/${_id}`,problemData);
        // console.log("axios patch in slice");
        // console.log(problemData);
        // console.log("resp : ",resp);
        return resp.data.data;
        // return problemData;
    } catch (error) {
        return error.message;
    }
})

export const deleteProblem=createAsyncThunk('problems/deleteProblem',async(problemData)=>{
    // console.log("update slice rcvd :");
    // console.log(problemData);
    try {
        const {_id} = problemData;
        // const UPDATE_URL=PROBLEMS_FETCH_POST_URL+`/${_id}`;
        // console.log("url : ",UPDATE_URL);
        const resp=await axios.delete(PROBLEMS_FETCH_POST_URL+`/${_id}`);
        // console.log("axios patch in slice");
        // console.log(problemData);
        // console.log("resp : ",resp);
        if(resp?.status===200) return resp.data.data; 
        // don't send resp send resp.data.data instead, because there will be an error even if the code works, resp contains other datas like 
        // axiosHeader etc they are promises, so there will be an error of "deleting non-serializer data"
        // non serializer data means complex object, instance of Function or Promises
        return `${resp.status} : ${resp.statusText}`;
        // return resp.data.data;
        // return problemData;
    } catch (error) {
        return error.message;
    }
})


export const ProblemsSlice=createSlice({
    name: 'problems',
    initialState,
    reducers:{
        addProblem:{
            reducer:(state,action)=>{
                state.problems.push(action.payload)
            },
            prepare:({name,statement})=>{
                return{
                    payload:{
                        id:nanoid(),
                        name,
                        statement,
                        popularity:{
                            like: 0,
                            dislike: 0
                        }
                    }
                }
            }
        },
        changePopularity: (state,action)=>{
            // console.log("rcvd button data");
            // console.log(action.payload);
            const {problemId,name}=action.payload;
            const foundProblem=state.problems.find((prob)=> prob._id===problemId);
            if(foundProblem){
                 foundProblem.popularity[name]++;
            }
        },
        changeProblemStatus: (state,action)=>{
            state.status=action.payload;
        }
    },
    extraReducers(builder){
        builder
        .addCase(fetchProblems.pending,(state,action)=>{
            state.status='loading'
        })
        .addCase(fetchProblems.fulfilled,(state,action)=>{
            state.status='succeeded';
            const tempData=action.payload;
            const rcvdProblems=tempData.map((prob)=>{
                prob.popularity={
                    like: 0,
                    dislike: 0
                }
                return prob;
            })
            state.problems=rcvdProblems;
        })
        .addCase(fetchProblems.rejected,(state,action)=>{
            state.status='failed'
            state.error=action.error.message;
        })
        .addCase(addNewProblem.fulfilled,(state,action)=>{
            // console.log("add case rcvd");
            const rcvdData=action.payload;
            rcvdData.popularity={
                like: 0,
                dislike: 0
            }
            state.problems.push(rcvdData);
        })
        .addCase(updateProblem.fulfilled,(state,action)=>{
            if(!action.payload?._id){
                console.log("could not update!!")
                console.log("failed update ",action.payload);
                return;
            }
            // console.log("rcvd in addCase:",action.payload);
            const updatedProblem=action.payload;
            const {name:nameOfUpdatedProblem}=updatedProblem;
            updatedProblem.popularity={
                like: 0,
                dislike: 0
            }
            // console.log("after adding like ",updatedProblem);
            // console.log("name of updated problem ",nameOfUpdatedProblem);
            // console.log("initial problems : ",state.problems);
            const remainingProblems=state.problems.filter((prob)=> prob.name!==nameOfUpdatedProblem);
            // console.log("remaining problems ",remainingProblems);
            state.problems=[...remainingProblems,updatedProblem];
            state.status='idle';
        })
        .addCase(deleteProblem.fulfilled,(state,action)=>{
            // console.log("addcase delete rcvd ",action.payload);
            // console.log("to delete : ", action.payload?._id)
            if(!action.payload?._id){
                console.log("could not delete!!")
                // console.log("failed delete ",action.payload);
                return;
            }
            // console.log("rcvd in addCase:",action.payload);
            const deletedProblem=action.payload;
            // console.log("to delete : ",deletedProblem);
            const {name:nameOfDeletedProblem}=deletedProblem;
            // console.log("after adding like ",updatedProblem);
            // console.log("name of updated problem ",nameOfUpdatedProblem);
            // console.log("initial problems : ",state.problems);
            const remainingProblems=state.problems.filter((prob)=> prob.name!==nameOfDeletedProblem);
            // console.log("remaining problems ",remainingProblems);
            state.problems=[...remainingProblems];
        })
    }
})

export const {addProblem,changePopularity,changeProblemStatus} = ProblemsSlice.actions;

export const selectAllProblems=(state)=>state.problems.problems;
export const getProblemsStatus=(state)=>state.problems.status;
export const getProblemsError=(state)=>state.problems.error;
// export const getSingleProblem=(state,problemId)=>state.problems.problems.find((prob)=>prob._id===problemId);
export const getSingleProblemByName=(state,problemName)=>state.problems.problems.find((prob)=>prob.name===problemName);
export const getSingleProblemById=(state,problemId)=>state.problems.problems.find((prob)=>prob._id===problemId);


export default ProblemsSlice.reducer;