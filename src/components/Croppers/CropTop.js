import React, {useState, useRef, useEffect} from 'react'
import { UseCtx } from '../../contexts/Context'

function CropTop({video, cropWidth, cropHeight, id, aspectRatio, borderColor}) {
    const crop1 = useRef(null)
    const resizer = useRef(null)

    const {topCrop, setTopCrop, topPos, setTopPos} = UseCtx()

    useEffect(() => {
        setPosition({ x: video.current.offsetLeft + 50, y: video.current.offsetTop + 50})
        setMaxHeight(video.current.getBoundingClientRect().height)
        setDimensions({width: cropWidth, height: cropWidth * aspectRatio})
        setTopCrop({width: cropWidth, height: cropWidth * aspectRatio})
        setTopPos({ x: video.current.offsetLeft + 50, y: video.current.offsetTop + 50})
    }, [])

    // Use the useState hook to store the div's position and dimensions in state
    const [position, setPosition] = useState({ x: 0, y: 0 })
    const [mouseDown, setMouseDown] = useState(false)

    const [resizing, setResizing] = useState(false)
    const [dimensions, setDimensions] = useState({ width: cropWidth, height: cropWidth*aspectRatio })
    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 })
    const [initialDim, setInitialDim] = useState({ width: 0, height: 0 })
    const [maxHeight,  setMaxHeight] = useState(0)
    
    // RESIZING STUFF
    const handleResizingMouseDown = (e) => {
        setResizing(true)
        setInitialPos({ x: e.clientX, y: e.clientY })
        setInitialDim({ width: crop1.current.offsetWidth, height: crop1.current.offsetHeight })
    }

    const handleResizingMouseUp = (e) => {
        setResizing(false)
        
    }

    const handleResizing = (e) =>{
        let x = initialDim.width + (e.clientX - initialPos.x)
        let y = x * (1/aspectRatio)
        if (resizing) {   
                setTopCrop({
                    width: x,
                    height: y
                })
                setDimensions({
                    width: x,
                    height: y
                })
        
        }
    }




    //MOVING CROP STUFF
    const handleMouseDown = (e) => {
        setMaxHeight(video.current.getBoundingClientRect().height)
        if (e.target.id === id) {
            return
        } else {
            setMouseDown(true)
        }
    }

    const handleMouseUp = (e) => {
      setMouseDown(false)
    }

    // Define a function that handles the div's drag events
    const handleMouseMove = (e) => {
      if (mouseDown) {
        const boundingX = Math.abs(Math.floor(crop1.current.getBoundingClientRect().left - video.current.getBoundingClientRect().left))
        const boundingY = Math.abs(Math.floor(crop1.current.getBoundingClientRect().top - video.current.getBoundingClientRect().top))
        setTopPos({
            x: boundingX,
            y: boundingY, 
        })
        //if mouse is on left edge
        

        //if crop hits left bounds
          if ((e.clientX - (crop1.current.offsetWidth / 2)) < video.current.offsetLeft) {
              setPosition({
                  x: video.current.offsetLeft,
                  y: e.clientY - (crop1.current.offsetHeight / 2)
              }) 
          } 
          //if crop hits top bounds
          else if ((e.clientY - (crop1.current.offsetHeight / 2) < video.current.offsetTop)) {
              setPosition({
                  x: e.clientX - (crop1.current.offsetWidth / 2),
                  y: video.current.offsetTop
              })
          } 
          // if crop hits right bounds 
          else if ((e.clientX - (crop1.current.offsetWidth / 2) > (video.current.offsetLeft + video.current.offsetWidth) - (crop1.current.offsetWidth))) {
              setPosition({
                  x: (video.current.offsetLeft + video.current.offsetWidth) -  (crop1.current.offsetWidth),
                  y: e.clientY - (crop1.current.offsetHeight / 2)
              })
          }
          //if crop hits bottom bounds
          else if (e.clientY - (crop1.current.offsetHeight / 2) > (video.current.offsetTop + video.current.offsetHeight) - (crop1.current.offsetHeight)) {
              setPosition({
                  x: e.clientX - (crop1.current.offsetWidth / 2),
                  y: (video.current.offsetTop + video.current.offsetHeight) -  (crop1.current.offsetHeight),
              })
          }
          // Update the div's position in state using the new coordinates from the event
          else 
          {
            setPosition({
                  x: e.clientX - (crop1.current.offsetWidth / 2),
                  y: e.clientY - (crop1.current.offsetHeight / 2),
              })
          }
      }  
    }
    
    const cropStyle = {
        position: 'absolute',
        left: `${position.x}px`,
        top: `${position.y}px`,
        width: `${dimensions.width}px`,
        // height: `${dimensions.height}px`,
        aspectRatio: aspectRatio,
        border: `4px solid ${borderColor}`,
        maxHeight: maxHeight,
        maxWidth: (maxHeight * (aspectRatio/1))
      }

    const resizerStyle = {
        position: 'absolute',
        backgroundColor: borderColor,
        width: '30px',
        height: '30px',
        bottom: '0',
        right: '0',
      }

  return (
    <div
                    ref={crop1}
                    style={cropStyle}
                    onMouseDown={handleMouseDown}
                    onMouseUp={handleMouseUp}
                    onMouseMove={handleMouseMove}
                >
                    <div 
                    ref={resizer}
                    id={id}
                    onMouseDown={handleResizingMouseDown}
                    onMouseUp={handleResizingMouseUp}
                    onMouseMove={handleResizing}
                    style={resizerStyle}
                    >
                    </div>
                </div>
  )
}

export default CropTop