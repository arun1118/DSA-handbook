import React from 'react'
// import Popularitybuttoms from './Popularitybuttoms.jsx';
import { Link } from 'react-router-dom';

const Problembox = ({prob}) => {
    let problemName=prob.name;
    problemName=problemName.trim();
    problemName=problemName.replaceAll(' ','-');
    return (
        <>
        <div className="problem-box">
            <h3>{prob.name}</h3>
            <p>{prob.statement.substring(0,25)}...</p>
            {/* <Link to={`problem/${prob._id}`}>View problem..</Link> */}
            <Link to={`problem/${problemName}`}>View problem..</Link>

            {/* <Link to={`edit/${prob._id}`}>Edit</Link> */}
            <Link to={`edit/${problemName}`}>Edit</Link>
            {/* <Popularitybuttoms prob={prob}/> */}
        </div>
        </>
    )
}

export default Problembox