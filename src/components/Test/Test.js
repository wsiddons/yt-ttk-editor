import React, { useState, useMemo, useRef, useEffect } from 'react';

function Test() {
    const inputVideo = useRef(null)
    const cropperCam = useRef(null)
    const cropperVideo = useRef(null)

    useEffect(() => {
        setVideoBoundingTop(inputVideo.current.getBoundingClientRect().top)
        setVideoBoundingLeft(inputVideo.current.getBoundingClientRect().left)

        let videoBoxBounding = cropperVideo.current.getBoundingClientRect()

        setVideoBoxTop(videoBoxBounding.top - inputVideo.current.getBoundingClientRect().top)
        setVideoBoxLeft(videoBoxBounding.left - inputVideo.current.getBoundingClientRect().left)
    }, [])

    const [videoBoundingTop, setVideoBoundingTop] = useState(0)
    const [videoBoundingLeft, setVideoBoundingLeft] = useState(0)


    const [videoBoxTop, setVideoBoxTop] = useState(0)
    const [videoBoxLeft, setVideoBoxLeft] = useState(0)


    const [isMouseDown, setIsMouseDown] = useState(false)

    const [cropCamX, setCropCamX] = useState(0)
    const [cropCamY, setCropCamY] = useState(0)
    const [cropVideoX, setCropVideoX] = useState(0)
    const [cropVideoY, setCropVideoY] = useState(180)

    const [initialMouseX, setInitialMouseX] = useState(0)
    const [initialMouseY, setInitialMouseY] = useState(0)

    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)

    

    const mouseDown = (e) => {
        if (e.target.className === 'cropper-video' || e.target.className === 'cropper-cam') {
            setIsMouseDown(true)
            setInitialMouseX(e.clientX - videoBoundingLeft)
            setInitialMouseY(e.clientY - videoBoundingTop)
        }
    }

    const mouseMove = (e) => {
        let mouseX = e.clientX - videoBoundingLeft
        let mouseY = e.clientY- videoBoundingTop

        let x = (videoBoxLeft + (mouseX - initialMouseX))
        let y = (videoBoxTop + (mouseY - initialMouseY))

        if (isMouseDown) {
            if (e.target.className === 'cropper-cam') {                
                setCropCamX(x)
                setCropCamY(y)
            }
            if (e.target.className === 'cropper-video') {
                setCropVideoX(x)
                setCropVideoY(y)
            }

        }

    }
    const mouseUp = (e) => {
        setIsMouseDown(false)
    }



    return (
        <div className='page-container'>
            <div className='cropper-container'
            onMouseDown={mouseDown}
            onMouseMove={mouseMove}
            onMouseUp={mouseUp}
            >
                <video ref={inputVideo} id='video' src={require('../../assets/k3.mp4')} />
                <div 
                ref={cropperCam}
                id='cropper-cam'
                className='cropper-cam'
                style={{
                    border: '2px solid red',
                    width: '100px',
                    height: '100px',
                    left: cropCamX + 'px',
                    top: cropCamY + 'px'
                }}
                ></div>
                <div 
                ref={cropperVideo}
                id='cropper-video'
                className='cropper-video'
                style={{
                    border: '2px solid white',
                    width: '100px',
                    height: '100px',
                    left: cropVideoX + 'px',
                    top: cropVideoY + 'px'
                }}
                ></div>
            </div>
        </div>
    ) 
}

export default Test