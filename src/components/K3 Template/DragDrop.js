import React, { useState } from 'react'

function DragDrop() {
    const [dragOver, setDragOver] = useState(false)
    const [file1Upload, setFile1Upload] = useState(false)
    const [file2Upload, setFile2Upload] = useState(false)

    
    const onDragOver = (e) => {
        e.preventDefault();
        setDragOver(true);
      }
    
    const onDrop1 = (e) => {
        e.preventDefault();
        setDragOver(false);
        // Get the dropped files
        const files = e.dataTransfer.files;
        console.log(e.dataTransfer.files)
        if (files.length > 1) {
            setFile1Upload(true)
        }
        // Do something with the files (upload, etc...)
      }

    const onDrop2 = (e) => {
        e.preventDefault();
        setDragOver(false);
        // Get the dropped files
        const files = e.dataTransfer.files;
        console.log(files)
        if (files.length > 1) {
            setFile2Upload(true)
        }
        
    }


  return (
    <>
    <div className='drag-drop-container'>
        <div
        onDrop={onDrop1}
        onDragOver={onDragOver}
        >
            Drop Video Here
        </div>
        <div
        onChange={onDrop2}
        onDragOver={onDragOver}
        >
            Drop Overlay Here
        </div>
    </div>

    </>
  )
}

export default DragDrop