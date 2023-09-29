import mongoose from "mongoose";

const ProblemSchema=new mongoose.Schema({
    name:{
        type: String
    },
    statement:{
        type: String
    },
    approach:{
        type: String
    }
})

export default mongoose.model('Problem',ProblemSchema)
