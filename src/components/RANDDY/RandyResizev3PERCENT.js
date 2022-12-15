import React, { useState } from 'react'
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import { ResizableBox } from 'react-resizable';


function RandyResizev3PERCENT() {

    const [height, setHeight] = useState(100)
    const [width, setWidth] = useState(100)

    const handleResizeStart = (e) => {
        // This function is called when the user starts resizing the component
      
        // The event object contains information about the mouse position,
        // the element that was clicked, and other details related to the event
        console.log(e);
      }
      
    const handleResize = (e, resizeDirection, refToElement) => {
        // This function is called repeatedly while the user is resizing the component
      
        // The event object contains information about the mouse position,
        // the element that was clicked, and other details related to the event
        // The resizeDirection argument specifies the direction in which the element is being resized
        // (e.g. "top", "right", "bottom", "left", or "top-right")
        // The refToElement argument is a reference to the resizable element
        console.log(e, resizeDirection, refToElement);
      }
      
    const handleResizeStop = (e, resizeDirection, refToElement, delta) => {
        // This function is called when the user stops resizing the component
      
        // The event object contains information about the mouse position,
        // the element that was clicked, and other details related to the event
        // The resizeDirection argument specifies the direction in which the element was being resized
        // (e.g. "top", "right", "bottom", "left", or "top-right")
        // The refToElement argument is a reference to the resizable element
        // The delta argument is an object containing the final size of the element
        // (e.g. { width: 100, height: 200 })
        console.log(e, resizeDirection, refToElement, delta);
      }
      

  return (
    <Draggable>
      <Resizable
      height={height}
      width={width}
      onResizeStart={handleResizeStart}
      onResize={handleResize}
      onResizeStop={handleResizeStop}
    >
      <div>My resizable component</div>
    </Resizable>
    </Draggable>

  )
}

export default RandyResizev3PERCENT