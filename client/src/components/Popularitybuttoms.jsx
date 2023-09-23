import React from 'react'
import { useDispatch } from 'react-redux';
import { changePopularity } from '../slices/problemSlice.js';

const buttons={
    like: '👍',
    dislike: '👎'
}

const Popularitybuttoms = ({prob}) => {
    const dispatch=useDispatch();

    const renderButtons=Object.entries(buttons).map(([name,emoji])=>{
        return(
            <button key={name} type='button' onClick={()=> dispatch(changePopularity({problemId: prob._id,name}))}>
                {emoji} {prob.popularity[name]}
            </button>
        )
    })

    return (
        <>
        {renderButtons}
        </>
    )
}

export default Popularitybuttoms