import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProblems, getProblemsError, getProblemsStatus, selectAllProblems } from '../slices/problemSlice.js';
import Problembox from './Problembox.jsx';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const ProblemList = () => {
    const dispatch=useDispatch();

    const allProblems=useSelector(selectAllProblems);
    const problemsStatus=useSelector(getProblemsStatus);
    const problemsError=useSelector(getProblemsError);

    useEffect(() => {
      if(problemsStatus==='idle'){
        dispatch(fetchProblems());
      }
    }, [dispatch,problemsStatus]);
    
    let content;
    if(problemsStatus==='loading'){
        content= <p>Loading...</p>
    }
    else if(problemsStatus==='succeeded'){
        content=allProblems.map((prob,idx)=>{
            return <Col><Problembox key={idx} prob={prob}/></Col>
        })
    }
    else if(problemsStatus==='failed'){
        content=<p>{problemsError}</p>
    }

    // const renderProblems=allProblems.map((prob)=>{
    //     return <Problembox key={prob.id} prob={prob}/>
    // })

    return (
        <>
        {/* {
        allProblems.length
        ?
        <>
        <h1>Here are your list of Questions</h1>
        {content}
        </>
        :
        <>
        <h1>Sorry! No Question found. Try Adding on....</h1>
        </>
        } */}
        <Container className='.mt-2'>
            <Row>
                {content}
            </Row>
            </Container>
        </>
    )
}

export default ProblemList