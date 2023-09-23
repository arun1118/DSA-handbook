import React from 'react'
import { getSingleProblemByName } from '../slices/problemSlice.js';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Popularitybuttoms from './Popularitybuttoms.jsx';

const SingleProblemPage = () => {
    // const {problemId}=useParams();
    // const singleProblemFound=useSelector((state)=>getSingleProblem(state,problemId));

    let {problemName}=useParams();
    problemName=problemName.replaceAll('-',' ');
    const singleProblemFound=useSelector((state)=>getSingleProblemByName(state,problemName));

    if(!singleProblemFound){
        return(
            <h1>No Problem Found!!</h1>
        )
    }
    return (
        <div className="problem-box-single">
            <h3>{singleProblemFound.name}</h3>
            <p>{singleProblemFound.statement}</p>
            {/* <Popularitybuttoms prob={singleProblemFound}/> */}
        </div>
    )
}

export default SingleProblemPage