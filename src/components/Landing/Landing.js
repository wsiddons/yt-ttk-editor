import React from 'react'
import { Link } from 'react-router-dom'

function Landing() {
  return (
    <div className='landing-container'>
        <div className='landing-text'>
            <h1>TIK</h1>
            <h1>TEMPLATE</h1>
            <p>Easily edit your YouTube content into clips formatted for TikTok in just a click of a button</p>
            <Link to='/menu'><button>START EDITING</button></Link>
        </div>
        <div className='landing-img'>
            <img src={require('../../assets/FPS_template.png')} />
            <img src={require('../../assets/horizontal_split_template.png')} />
            <img src={require('../../assets/full_width_with_cam.png')} />
        </div>
    </div>
  )
}

export default Landing