import React, { useEffect, useRef, useState } from 'react'
import Nav from '../../Navbar/Nav'
import { UseCtx } from '../../../contexts/Context'
import Trim from '../../Trim/Trim'
import { useNavigate } from 'react-router-dom'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
import CropFullHeight from '../../Croppers/CropFullHeight'
import OutputModal from '../K3Template/OutputModal'
import { fullHeightify } from '../../../hooks/fullHeightify'

function FullHeightTemplate() {
  const video = useRef(null)
  const canvas = useRef(null)

  const navigate = useNavigate()

  const [staticVid, setStaticVid] = useState(null)
  const [torf, setTorf] = useState(false)
  const [overlay, setOverlay] = useState(null)

  const [botCropWidth, setBotCropWidth] = useState(window.innerWidth / 10)


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
    setBotCropWidth(window.innerWidth / 7)
  }, [])

  const makeClip = () => {
    fullHeightify(
      video, currentVideo, 
      overlay, botCrop, botPos, startTime, endTime, 
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
        <CropFullHeight 
          cropWidth={botCropWidth}
          video={video}
          id={'videoCrop'}
          aspectRatio={9/16}
          borderColor={'green'}
        />
        <Trim />
        <div className='button-container'>
          <div className='left-buttons'>
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

export default FullHeightTemplate