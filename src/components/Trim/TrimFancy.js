import React from 'react'

function Trim() {

    const trimStyle = {
        position: 'relative',
        backgroundColor: 'yellow', 
        width:'80%', 
        height: '100px', 
    }

    const scrubStyle = {
        position: 'absolute',
        width: '100%',
        height: '100%',
        border: '3px solid purple',
        display: 'flex',
        justifyContent: 'space-between',
    }
    
    const scrubStart = {
        backgroundColor: 'purple',
        width: '2%',
    }

    const scrubEnd = {
        backgroundColor: 'purple',
        width: '2%',
    }

  return (
    <div className='trim' style={trimStyle}>
        <div style={scrubStyle}>
            <div 
            id='scrubStart'
            style={scrubStart}></div>
            <div 
            id='scrubEnd'
            style={scrubEnd}></div>
        </div>
    </div>

  )
}

export default Trim