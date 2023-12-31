import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
// import { addProblem } from '../slices/problemSlice.js';
import { addNewProblem } from '../slices/problemSlice.js';
import { useNavigate } from 'react-router-dom';

const AddProblemForm = () => {
    const dispatch=useDispatch();
    const navigate=useNavigate();

    const [name,setName]=useState('');
    const [statement,setStatement]=useState('');
    const [approach,setAppraoch]=useState('');
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

    function handleNameChange(e){
        let rcvdValue=e.target.value;
        setName(rcvdValue);
    }
    function handleStatementChange(e){
        let rcvdValue=e.target.value;
        setStatement(rcvdValue);
    }
    function handleApproachChange(e){
        let rcvdValue=e.target.value;
        setAppraoch(rcvdValue);
    }

    let canSave=[name,statement].every(Boolean) && addProblemRequestStatus==='idle';

    function handleSubmit(){
        // if(name && statement){
        //     let nameval=name[0].toUpperCase()+name.slice(1);
        //     let statementval=statement[0].toUpperCase()+statement.slice(1);
        //     dispatch(addProblem({name:nameval,statement:statementval}));
        //     setName('');
        //     setStatement('');
        // }

        if(canSave){
            try {
                setAddProblemRequestStatus('pending');
                let nameval=name[0].toUpperCase()+name.slice(1);
                nameval=nameval.replace(/[^a-zA-Z0-9 ]/g, "")
                let statementval=statement[0].toUpperCase()+statement.slice(1);
                let problemData={
                    name: nameval,
                    statement: statementval,
                    approach: approach
                }
                dispatch(addNewProblem(problemData)).unwrap();
                setName('');
                setStatement('');
                navigate('/problems');
            } 
            catch (error) {
                console.log("Cannot add Problem",error.message);
            }
            finally{
                setAddProblemRequestStatus('idle');
            }
        }
    }

    return (
        <>
        <h1>Add the Problem details</h1>
        <div className="form-container">
        <form className='form-box'>
            <label htmlFor="name">Enter the Problem Name</label>
            <br />
            <input type="text" value={name} id="name" onChange={handleNameChange} />
            <br />
            <br />
            <label htmlFor="statement">Enter the Problem statement</label>
            <br />
            <textarea id="statement" cols="100" rows="10" value={statement} onChange={handleStatementChange} placeholder='Describe the problem'></textarea>
            <br />
            <br />
            <label htmlFor="statement">Enter your approach</label>
            <br />
            <textarea id="approach" cols="100" rows="5" value={approach} onChange={handleApproachChange} placeholder='Describe the approach to solve the problem'></textarea>
            <br />
            <br />
            <button type='button' onClick={handleSubmit} className='saveBtn'>Save</button>
        </form>
        </div>
        </>
    )
}

export default AddProblemForm