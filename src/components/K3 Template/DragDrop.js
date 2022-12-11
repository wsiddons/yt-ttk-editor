import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { UseCtx } from '../../contexts/Context'

function DragDrop() {
    const [dragOver, setDragOver] = useState(false)
    const [file1Upload, setFile1Upload] = useState(false)
    const [mp4, setMp4] = useState(null)
    const {currentVideo, setCurrentVideo} = UseCtx()

    
    const onDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
      }
    
    const onDrop1 = (e) => {
        e.preventDefault();
        setDragOver(false);
        // Get the dropped files
        const files = e.dataTransfer.files;
        console.log(e.dataTransfer.files[0].type)
        if (e.dataTransfer.files[0].type === 'video/mp4') {
            setFile1Upload(true)
            setCurrentVideo(files[0])
        }
      }

      console.log(currentVideo)

console.log(mp4)
  return (
    <>
    <div className='drag-drop-container'>
      <h1>Drag File Below</h1>
        <div
        onDrop={onDrop1}
        onDragOver={onDragOver}
        >
          {file1Upload ? <p>{currentVideo.name}</p> : <p>File .mp4</p>}
          {file1Upload ? <Link to='/edit'><button>Edit for TikTok</button></Link> : <></>}
        </div>
    </div>
    </>
  )
}

export default DragDrop