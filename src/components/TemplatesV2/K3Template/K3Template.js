import React, { useEffect, useRef, useState } from 'react'
import CropBot from '../../Croppers/CropBot'
import CropTop from '../../Croppers/CropTop'
import Nav from '../../Navbar/Nav'
import Cropper from '../../RANDDY/Cropper'
import PreviewCanvas from './PreviewCanvas'
import { UseCtx } from '../../../contexts/Context'
import Trim from '../../Trim/Trim'
import { useNavigate } from 'react-router-dom'
import { k3Templify } from '../../../hooks/K3Templify'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import OutputModal from './OutputModal'

function K3Template() {
  const video = useRef(null)
  const canvas = useRef(null)

  const navigate = useNavigate()

  const [staticVid, setStaticVid] = useState(null)
  const [torf, setTorf] = useState(false)
  const [overlay, setOverlay] = useState(null)

  const [topCropWidth, setTopCropWidth] = useState(window.innerWidth / 4)
  const [botCropWidth, setBotCropWidth] = useState(window.innerWidth / 7)


  const { 
    currentVideo, 
    botCrop, 
    topCrop, 
    topPos, 
    botPos,
    startTime, 
    endTime,
    outputVideo,
    setOutputVideo,
    fileName,
    setFileName
   } = UseCtx()

  useEffect(() => {
    if (currentVideo === null) {
      navigate('/menu')
    }
    setStaticVid(URL.createObjectURL(currentVideo))
    setTopCropWidth(window.innerWidth / 5)
    setBotCropWidth(window.innerWidth / 7)
  }, [])

  const makeClip = () => {
    k3Templify(
      video, currentVideo, 
      overlay, topCrop, botCrop, topPos, botPos, startTime, endTime, 
      createFFmpeg, fetchFile, 
      setOutputVideo)
    setTorf(true)
  }

  const videoStyle = {
    maxWidth: '80%',
    margin: '5vh 0',
    border: '4px solid #f2507b',

  }
  const canvasStyle = {
    width: '20%',
    minWidth: '300px',
    aspectRatio: '9/16',
  }

  const testStyle = { 
    position: 'absolute',
    top: '0px',
    display: 'flex',
    justifyContent: 'center'
  }
  
  return (
    <>
    {outputVideo === null?
      <></>
      :
      <OutputModal
      />
      }
    <>
    {/* <Nav /> */}
    <div className='video-edit-container'>
    <div style={testStyle}>
      
      
    </div>
    {/* {outputVideo ? <OutputModal /> : <></>} */}
      <div className='control-container'>
        <video 
          src={staticVid} 
          ref={video}
          style={videoStyle}
          controls={true}        
        />
        <CropTop 
          cropWidth={topCropWidth}
          video={video}
          id={'videoCrop'}
          aspectRatio={341/405}
          borderColor={'#F2507B'}
        />
        <CropBot 
          cropWidth={botCropWidth}
          video={video}
          id={'camCrop'}
          aspectRatio={341/202}
          borderColor={'#8762D9'}
        />
        <Trim />
        <div className='button-container'>
          <div className='left-buttons'>
            <div>
              <h3>Add Overlay</h3>
              <input onChange={(e) => setOverlay(e.target.files[0])} type='file' />
            </div>
            <div>
              <h3>Change File Name</h3>
              <input onChange={(e) => setFileName(e.target.value)} type='text' />
            </div>
          </div>
          <div className='right-buttons'>
            <h3 onClick={makeClip}>Create Video</h3>
            {/* <h3 onClick={() => setTorf(!torf)}>toggle modal</h3> */}
          </div>
        </div>
      </div>
    </div>
    </>

    </>
  )
}

export default K3Template