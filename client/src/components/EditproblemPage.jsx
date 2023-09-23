import React, { useEffect, useState } from 'react'
import { deleteProblem, getSingleProblemByName, updateProblem } from '../slices/problemSlice.js';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
// import { changeProblemStatus } from '../redux/slice/problemSlice.js';


const EditproblemPage = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    let {problemName}=useParams();
    problemName=problemName.replaceAll('-',' ');
    const singleProblemFound=useSelector((state)=>getSingleProblemByName(state,problemName));


    const [name,setName]=useState(singleProblemFound?.name);
    const [statement,setStatement]=useState(singleProblemFound?.statement);
    const [addProblemRequestStatus,setAddProblemRequestStatus]=useState('idle');

    useEffect(() => {
        const unloadCallback = (event) => {
          event.preventDefault();
          event.returnValue = "";
          return "";
        };
      
        window.addEventListener("beforeunload", unloadCallback);
        return () => window.removeEventListener("beforeunload", unloadCallback);
      }, []);

    if(!singleProblemFound){
        return(
            <h1>No Problem Found!!</h1>
        )
    }

    function handleNameChange(e){
        let rcvdValue=e.target.value;
        setName(rcvdValue);
    }
    function handleStatementChange(e){
        let rcvdValue=e.target.value;
        setStatement(rcvdValue);
    }

    let canSave=[name,statement].every(Boolean) && addProblemRequestStatus==='idle';

    if(!singleProblemFound){
        return(
            <h1>No Problem Found!!</h1>
        )
    }

    function handleSubmit(){
        if(canSave){
            try {
                setAddProblemRequestStatus('pending');
                let nameval=name[0].toUpperCase()+name.slice(1);
                let statementval=statement[0].toUpperCase()+statement.slice(1);
                let problemData={
                    _id:singleProblemFound._id,
                    name: nameval,
                    statement: statementval
                }
                dispatch(updateProblem(problemData)).unwrap();
                setName('');
                setStatement('');
                navigate(`/problems/problem/${name.replaceAll(' ','-')}`);
            } 
            catch (error) {
                console.log("Cannot add Problem",error.message);
            }
            finally{
                setAddProblemRequestStatus('idle');
            }
        }
    }

    function handleDelete(){
        if(canSave){
            try {
                setAddProblemRequestStatus('pending');
                let nameval=name[0].toUpperCase()+name.slice(1);
                let statementval=statement[0].toUpperCase()+statement.slice(1);
                let problemData={
                    _id:singleProblemFound._id,
                    name: nameval,
                    statement: statementval
                }
                dispatch(deleteProblem(problemData)).unwrap();
                setName('');
                setStatement('');
                // dispatch(changeProblemStatus('idle'));
                navigate(`/problems`);
            } 
            catch (error) {
                console.log("Cannot delete Problem",error.message);
            }
            finally{
                setAddProblemRequestStatus('idle');
            }
        }
    }

    return (
        <>
        <div className="form-container">
        <form className='form-box'>
            <label htmlFor="name">Enter the Problem Name</label>
            <br />
            <input type="text" value={name} id="name" onChange={handleNameChange} />
            <br />
            <br />
            <label htmlFor="statement">Enter the Problem statement</label>
            <br />
            <textarea id="statement" cols="50" rows="5" value={statement} onChange={handleStatementChange} placeholder='Describe the problem'></textarea>
            <br />
            <br />
            <button type='button' onClick={handleSubmit}>Save</button>
            <button type='button' onClick={handleDelete}>Delete</button>
        </form>
        </div>
        </>
    )
}

export default EditproblemPage