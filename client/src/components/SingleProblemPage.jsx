import React from 'react'
import { getSingleProblemByName } from '../slices/problemSlice.js';
import { Link, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
// import Popularitybuttoms from './Popularitybuttoms.jsx';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';

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
        <>
        <Card style={{ width: '50rem' }} border="dark">
            <Card.Body>
                <h3>Problem</h3>
                <Card.Title style={{ color: '##2f2f30' }}>{singleProblemFound.name}</Card.Title>
                <br /><br /><br />
                <h4 style={{ color: '#03848c' }}>Description</h4>
                <Card.Text>
                {singleProblemFound.statement}
                </Card.Text>
                <Button variant="dark"><Link to={`/problems`} style={{textDecoration: 'none'}}>Home</Link></Button>
            </Card.Body>
        </Card>
        {/* <div className="problem-box-single">
            <h3>{singleProblemFound.name}</h3>
            <p>{singleProblemFound.statement}</p>
            <Popularitybuttoms prob={singleProblemFound}/>
        </div> */}
        </>
        
    )
}

export default SingleProblemPage