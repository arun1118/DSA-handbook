import Problem from "../models/Problem.js"
import mongoose from "mongoose";

export const getAllProblems=async (req,res)=>{
    try {
        const data=await Problem.find({});
        res.status(200).json({data});
    } catch (error) {
        res.status(500).json({msg : error})
    }
}

export const addProblem=async(req,res)=>{
    try {
        const data=await Problem.create(req.body);
        res.status(200).json({data});
    } catch (error) {
        res.status(500).json({msg : error})
    }
}

export const getSingleProblem=async(req,res)=>{
    try {
        let problemId=req.params;
        let problemIdObj = new mongoose.Types.ObjectId(problemId);
        const data=await Problem.findById(problemIdObj);
        res.status(200).json({data});
        
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

export const updateProblem=async(req,res)=>{
    try {
        let problemId=req.params.problemId;
        // console.log("update request for : ",problemId);
        let problemIdObj = new mongoose.Types.ObjectId(problemId);
        // console.log("problem Id Obj ",problemIdObj);
        const problemData=req.body;
        // console.log("new problem body : ",problemData);
        // const data=await Problem.findByIdAndUpdate(problemIdObj, problemData)
        const data=await Problem.findByIdAndUpdate(problemIdObj, problemData,{new: true})
        // console.log("changed successfully : ",data);
        res.status(200).json({data});
        
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}

export const deleteProblem=async(req,res)=>{
    try {
        let problemId=req.params.problemId;
        let problemIdObj = new mongoose.Types.ObjectId(problemId);
        const data=await Problem.findByIdAndDelete(problemIdObj)
        res.status(200).json({data});
        
    } catch (error) {
        res.status(500).json({msg : error.message})
    }
}


