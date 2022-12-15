import React, { useEffect, useRef, useState } from 'react'
import Cropper from './Cropper'

function RandyResizev2() {
    
    const video = useRef(null)



    // STYLES
    

    const videoContainerStyle = {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '100px'
    }

    const videoStyle ={
      maxWidth: '405px',
      maxHeight: '228px'
    }

    const resizer1Style = {
      position: 'absolute',
      backgroundColor: 'red',
      borderRadius: '50%',
      width: '20px',
      height: '20px',
      bottom: '-10px',
      right: '-10px'
    }

    return (
        <>
            <div style={videoContainerStyle}>
                <div>
                <video 
                    ref={video}
                    style={videoStyle}
                    src={require('../../assets/k3.mp4')} />
                <Cropper 
                    cropWidth={100}
                    cropHeight={100}
                    video={video}
                />
                </div>  
            </div>    
        </>
  )
}


export default RandyResizev2


// import React, { useState } from 'react';

// const ResizableDiv = () => {
//   const [dimensions, setDimensions] = useState({ width: 100, height: 100 });
//   const [isResizing, setIsResizing] = useState(false);
//   const [startX, setStartX] = useState(0);
//   const [startY, setStartY] = useState(0);

//   const onMouseDown = (event) => {
//     setIsResizing(true);
//     setStartX(event.clientX);
//     setStartY(event.clientY);
//   };

//   const onMouseMove = (event) => {
//     if (isResizing) {
//       setDimensions({
//         width: dimensions.width + (event.clientX - startX),
//         height: dimensions.height + (event.clientY - startY),
//       });
      
//     }
//   };

//   const onMouseUp = (event) => {
//     setIsResizing(false);
//   };

//   return (
//     <div
//       style={{ width: dimensions.width, height: dimensions.height }}
//       onMouseDown={onMouseDown}
//       onMouseMove={onMouseMove}
//       onMouseUp={onMouseUp}
//     >
//       Resizable div
//     </div>
//   );
// };
