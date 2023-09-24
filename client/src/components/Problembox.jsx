import React from 'react'
// import Popularitybuttoms from './Popularitybuttoms.jsx';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';

const Problembox = ({prob}) => {
    let problemName=prob.name;
    problemName=problemName.trim();
    problemName=problemName.replaceAll(' ','-');
    return (
        <>
            <Card style={{ width: '18rem', border: '1px solid black',margin: '4px 2px' }}>
                <Card.Body>
                    <Card.Title>{prob.name}</Card.Title>
                    <Card.Text>
                    {prob.statement.substring(0,25)}...
                    </Card.Text>
                    <Button variant="dark"><Link to={`problem/${problemName}`} style={{textDecoration: 'none'}}>View problem..</Link></Button>
                    <Button variant="light"><Link to={`edit/${problemName}`} style={{textDecoration: 'none'}}>Edit</Link></Button>
                </Card.Body>
            </Card>
        {/* <div className="problem-box">
            <h3>{prob.name}</h3>
            <p>{prob.statement.substring(0,25)}...</p>
            <Link to={`problem/${prob._id}`}>View problem..</Link>
            <Link to={`problem/${problemName}`}>View problem..</Link>

            <Link to={`edit/${prob._id}`}>Edit</Link>
            <Link to={`edit/${problemName}`}>Edit</Link>
            <Popularitybuttoms prob={prob}/>
        </div> */}
        </>
    )
}

export default Problembox