import React, { useState, useMemo, useRef, useEffect } from 'react'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import { Link } from 'react-router-dom'

function Test() {
    const inputVideo = useRef(null)
    const cropperCam = useRef(null)
    const cropperVideo = useRef(null)
    const cropVideoLeftHandle = useRef(null)
    const cropVideoRightHandle = useRef(null)
    const timeInput = useRef(null)
    const span = useRef(null)


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
    const [cropCamWidth, setCropCamWidth] = useState(150)

    // form stuff
    const [clipStart, setClipStart] = useState(0)
    const [clipEnd, setClipEnd] = useState(10)
    const [upload, setUpload] = useState(false)
    const [seconds, setSeconds] = useState(0)
    const [fileName, setFileName] = useState('')
    

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

   

    const handleSubmit = async (e) => {
        e.preventDefault()
        const ffmpeg = createFFmpeg({
            log: true,
        })

        const multi = inputVideo.current.videoWidth / inputVideo.current.offsetWidth

        await ffmpeg.load();

        const file1 = e.target[0].files[0]
        const file2 = e.target[1].files[0]
        const name1 = file1.name
        const name2 = file2.name

        const w = cropperCam.current.offsetWidth * multi
        const h = cropperCam.current.offsetHeight * multi
        const x = cropperCam.current.offsetLeft * multi
        const y = cropperCam.current.offsetTop * multi

        const w2 = cropperVideo.current.offsetWidth * multi
        const h2 = cropperVideo.current.offsetHeight * multi
        const x2 = cropperVideo.current.offsetLeft * multi
        const y2 = cropperVideo.current.offsetTop * multi

        const cropCam = `crop=${w}:${h}:${x}:${y},scale=720:426`
        const cropVideo = `crop=${w2}:${h2}:${x2}:${y2},scale=720:854`
        // const cropVideo = `crop=${w2}:${h2}:${x2}:${y2}`

        const overlay = `overlay=0:350`

        console.log(cropCam)
        ffmpeg.FS('writeFile', name1, await fetchFile(file1))
        ffmpeg.FS('writeFile', name2, await fetchFile(file2))

        const time1 = new Date(clipStart * 1000).toISOString().substr(11, 8)
        const time2 = new Date(clipEnd * 1000).toISOString().substr(11, 8)

        console.log(time1)
        console.log(time2)

        // set clip time
        await ffmpeg.run('-ss', time1,'-to', time2, '-i', name1,  '-avoid_negative_ts', 'make_zero', '-c', 'copy', 'trim.mp4')
        //crop clip 1 -c:v libx264 -c:a aac
        await ffmpeg.run('-i', 'trim.mp4', '-filter:v', cropCam, '-c:v', 'libx264', '-preset', 'superfast', 'crop1.mp4')
        //crop clip 2
        await ffmpeg.run('-i', 'trim.mp4', '-filter:v', cropVideo, '-c:v', 'libx264', '-preset', 'superfast', 'crop2.mp4')

        //stack the cropped clips
        await ffmpeg.run('-i', 'crop1.mp4', '-i', 'crop2.mp4', '-filter_complex', 'vstack=inputs=2', '-c:v', 'libx264', '-preset', 'superfast', 'output.mp4')

        await ffmpeg.run('-i', 'output.mp4', '-i', name2, '-filter_complex', overlay, '-c:v', 'libx264', '-preset', 'superfast', 'output_overlay.mp4')

        //ffmpeg -i input.mp4 -filter:v "crop=100:100:10:20,scale=200:200" output.mp4

        //read the output
        const data = ffmpeg.FS('readFile', `output_overlay.mp4`);
        const a = document.createElement('a')
        a.download = fileName
        a.href = URL.createObjectURL(new Blob([data.buffer], { type: 'video/mp4' }));
        a.innerHTML = `download`
        document.body.appendChild(a)
    }

    const handleUploadVideo = (e) => {
        setUpload(true)
        const file = e.target.files[0]
        inputVideo.current.src = URL.createObjectURL(file)
        inputVideo.current.onloadeddata= () => {
            const seconds = Math.floor(inputVideo.current.duration)
            const mins = seconds/60
            setClipEnd(seconds)
            console.log(clipEnd)
            console.log(seconds)
        }
    }

    const handleUploadImage = (e) => {
        
    }

    return (
        <div className='page-container'>
            <form onSubmit={handleSubmit}>
                <p>input video</p>
                <input onChange={handleUploadVideo} type='file' />
                <p>input image</p>
                <input onChange={handleUploadImage} type='file' />
                <p>set file name</p>
                <input onChange={(e) => setFileName(e.target.value)} type='test' />

                {/* {upload ? 
                        <>
                    <span ref={span}>clipend {seconds}</span>
                    <input
                        ref={timeInput} 
                        type="range" min="1" max={clipEnd} defaultValue={clipEnd / 4} />
                        </>
                        :
                    <input type="range" min="1" max='100' defaultValue="50" />
                } */}
                
                
                    <p>clip start (sec)</p>
                    <input onChange={(e) => setClipStart(e.target.value)} type='number' />
                    <p>clip end (sec)</p>
                    <input onChange={(e) => setClipEnd(e.target.value)} type='number' /> 
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
                            bottom: '5px', 
                            right: '5px',
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
                            bottom: '5px', 
                            right: '5px',
                            width: '10px',
                            height: '10px',
                            backgroundColor: 'red',
                            borderRadius: '50%',
                            position: 'absolute'
                        }}
                        ></div>
                </div>
            </div>

            <nav>
                <Link to='/singleAction'>
                    <button>Single Action</button>
                </Link>
            </nav>
        </div>
    ) 
}

export default Test