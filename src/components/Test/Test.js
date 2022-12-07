import React, { useState, useMemo, useRef, useEffect } from 'react';

function Test() {
    const inputVideo = useRef(null)
    const cropperCam = useRef(null)
    const cropperVideo = useRef(null)
    const cropVideoLeftHandle = useRef(null)
    const cropVideoRightHandle = useRef(null)


    useEffect(() => {
        setVideoBoundingTop(inputVideo.current.getBoundingClientRect().top)
        setVideoBoundingLeft(inputVideo.current.getBoundingClientRect().left)

        let videoBoxBounding = cropperVideo.current.getBoundingClientRect()

        setVideoBoxTop(videoBoxBounding.top - inputVideo.current.getBoundingClientRect().top)
        setVideoBoxLeft(videoBoxBounding.left - inputVideo.current.getBoundingClientRect().left)

        setCropperVideoHeight(inputVideo.current.getBoundingClientRect().height)
        setCropperVideoWidth(inputVideo.current.getBoundingClientRect().width)
    }, [])

    const [videoBoundingTop, setVideoBoundingTop] = useState(0)
    const [videoBoundingLeft, setVideoBoundingLeft] = useState(0)

    const [videoBoxTop, setVideoBoxTop] = useState(0)
    const [videoBoxLeft, setVideoBoxLeft] = useState(0)

    const [isMouseDown, setIsMouseDown] = useState(false)

    const [cropCamX, setCropCamX] = useState(0)
    const [cropCamY, setCropCamY] = useState(0)
    const [cropVideoX, setCropVideoX] = useState(0)
    const [cropVideoY, setCropVideoY] = useState(0)

    const [initialMouseX, setInitialMouseX] = useState(0)
    const [initialMouseY, setInitialMouseY] = useState(0)

    const [cropperVideoHeight, setCropperVideoHeight] = useState(0)
    const [cropperVideoWidth, setCropperVideoWidth] = useState(0)

    const [mouseX, setMouseX] = useState(0)
    const [mouseY, setMouseY] = useState(0)

    //resize videoCropBox + camCropBox
    const [isVideoCropBoxMouseDown, setIsVideoCropBoxMouseDown] = useState(false)
    const [cropVideoWidth, setCropVideoWidth] = useState(320)
    const [cropCamWidth, setCropCamWidth] = useState(320)


    

    const mouseDown = (e) => {
        if (e.target.className === 'cropper-video' || e.target.className === 'cropper-cam') {
            setIsMouseDown(true)
            setInitialMouseX(e.clientX - videoBoundingLeft)
            setInitialMouseY(e.clientY - videoBoundingTop)
        }

        if (e.target.className === 'handleCropVideoRightHandle'|| e.target.className === 'handleCropCamRightHandle') {
            setIsVideoCropBoxMouseDown(true)
            setInitialMouseX(e.clientX - videoBoundingLeft)
            setInitialMouseY(e.clientY - videoBoundingTop)
        }
    }

    const mouseMove = (e) => {
        let mouseX = e.clientX - videoBoundingLeft
        let mouseY = e.clientY- videoBoundingTop

        let x = (videoBoxLeft + (mouseX - initialMouseX))
        let y = (videoBoxTop + (mouseY - initialMouseY))

        if (isMouseDown && e.target.className === 'cropper-cam') {
            setCropCamX(x)
            setCropCamY(y)
        }

        if (isMouseDown && e.target.className === 'cropper-video') {
            setCropVideoX(x)
            setCropVideoY(y)
        }

        if (isVideoCropBoxMouseDown && e.target.className === 'handleCropVideoRightHandle') {
            let mouseX = e.clientX - videoBoundingLeft
            let mouseY = e.clientY- videoBoundingTop
    
            let x = (videoBoxLeft + (mouseX - initialMouseX))
            let y = (videoBoxTop + (mouseY - initialMouseY))

            setCropVideoWidth(cropVideoWidth + (x+y))
            
        }
        if (isVideoCropBoxMouseDown && e.target.className === 'handleCropCamRightHandle') {
            let mouseX = e.clientX - videoBoundingLeft
            let mouseY = e.clientY- videoBoundingTop
    
            let x = (videoBoxLeft + (mouseX - initialMouseX))
            let y = (videoBoxTop + (mouseY - initialMouseY))
            console.log(cropCamWidth)
            setCropCamWidth(cropCamWidth + (x+y))
            
        }
    }

    const mouseUp = (e) => {
        setIsVideoCropBoxMouseDown(false)
        setIsMouseDown(false)
    }

    const handleUpload = (e) => {
        const file = e.target.files[0]
        inputVideo.current.src = URL.createObjectURL(file)
    }

    return (
        <div className='page-container'>
            <form>
                <input onChange={handleUpload} type='file' />
                <button>Make Clip</button>
            </form>
            <div className='cropper-container'
            onMouseDown={mouseDown}
            onMouseMove={mouseMove}
            onMouseUp={mouseUp}
            
            style={{overflow: 'hidden'}}

            >
                <video 
                    controls={true}
                    height='405px' 
                    width='720px' 
                    ref={inputVideo} 
                    id='video' 
                    src={require('../../assets/k3.mp4')} 
                />
                
                <div 
                ref={cropperVideo}
                id='cropper-video'
                className='cropper-video'
                style={{
                    border: '2px solid white',
                    width: cropVideoWidth + 'px',
                    aspectRatio: (341/405),
                    left: cropVideoX + 'px',
                    top: cropVideoY + 'px',
                }}
                >
                        <div 
                        className='handleCropVideoRightHandle'
                        ref={cropVideoRightHandle}
                        style={{
                            bottom: '-5px', 
                            right: '-5px',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'white',
                            borderRadius: '50%',
                            position: 'absolute'
                        }}
                        ></div>
                </div>
                <div 
                ref={cropperCam}
                id='cropper-cam'
                className='cropper-cam'
                style={{
                    border: '2px solid red',
                    width: cropCamWidth + 'px',
                    aspectRatio: (341/202),
                    left: cropCamX + 'px',
                    top: cropCamY + 'px'
                }}
                >
                        <div 
                        className='handleCropCamRightHandle'
                        style={{
                            bottom: '-5px', 
                            right: '-5px',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            position: 'absolute'
                        }}
                        ></div>
                </div>
            </div>
        </div>
    ) 
}

export default Test