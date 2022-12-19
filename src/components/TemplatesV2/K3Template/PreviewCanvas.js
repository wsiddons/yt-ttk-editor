import React, {useRef, useEffect, useState} from 'react'
import { UseCtx } from '../../../contexts/Context'

function PreviewCanvas({video, userVid}) {
    const canvas = useRef(null)
    const [staticVid, setStaticVid] = useState(null)
    const [torf, setTorf] = useState(false)

    const { currentVideo, topCrop, botCrop } = UseCtx()
    // useEffect(() => {
    //     const ctx = canvas.current.getContext('2d')
    //     ctx.drawImage(video.current, 0, 0)
    // }, [canvas.current])
    console.log(botCrop, topCrop)
    if (torf) {
        const ctx = canvas.current.getContext('2d')
        ctx.drawImage(video.current, 0, 0)
    }
    
    
    const updateCanvas = () => {
        
    }

    
 

    const canvasStyle = {
        width: '20%',
        minWidth: '300px',
        aspectRatio: '9/16',
      }

  return (
    <div className='canvas-container'>
        {torf ?       
            <canvas 
                ref={canvas}
                style={canvasStyle}
            /> 
            :
            <>
            <canvas 
                ref={canvas}
                style={canvasStyle}
            /> 
            <button onClick={() => setTorf(true)}>show preview</button>
            </>
        }
        

        
        
      </div>
  )
}

export default PreviewCanvas