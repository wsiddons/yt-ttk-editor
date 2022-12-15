import React, { useState, useRef } from 'react'

function RandyResize() {
    const container = useRef(null)
    const [isDragging, setIsDragging] = useState(false)
    const [initialPos, setInitialPos] = useState({ x: 0, y: 0 })
    const [currentPos, setCurrentPos] = useState({ x: 0, y: 0 })
    const [boxPos, setBoxPos] = useState({ x: 0, y: 0})

    function handleMouseDown(event) {
      // Get the initial position of the mouse
      const { clientX, clientY } = event
      setInitialPos({ x: clientX, y: clientY })
      setIsDragging(true)
      console.log(container)
      setBoxPos({x: container.current.offsetLeft, y: container.current.offsetTop})

    }
  
    function handleMouseUp() {
      setIsDragging(false)
    }
  
    function handleMouseMove(event) {
      if (!isDragging) return
  
      // Get the current position of the mouse
      const { clientX, clientY } = event
      setCurrentPos({ x: clientX, y: clientY })
  
      // Calculate the difference between the initial and current positions
      const diffX = currentPos.x - initialPos.x
      const diffY = currentPos.y - initialPos.y
      console.log(diffX, diffY)
      // Use the difference to adjust the element
      setBoxPos({x: container.current.offsetLeft + diffX, y: container.current.offsetTop + diffY})
    }

  return (
    <div>
      <div 
        style={{position: 'relative'}}
      >
        <video src={require('../../assets/k3.mp4')}
        style={{maxWidth: '405px', maxHeight: '228', }}
        />
        <div
            ref={container}
            onMouseDown={handleMouseDown}
            onMouseUp={handleMouseUp}
            onMouseMove={handleMouseMove} 
            style={{
              border: '2px solid red',
              position: 'absolute',
              width: '100px',
              height: '100px',
              left: boxPos.x + 'px',
              top: boxPos.y + 'px'
            }}
          ></div>
        </div>
    </div>
  )
}

export default RandyResize
