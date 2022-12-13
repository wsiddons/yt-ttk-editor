import React, {useState} from 'react'
import { UseCtx } from '../../contexts/Context'
import { Link } from 'react-router-dom'

function ItemTemplate(props) {
    const [dragOver, setDragOver] = useState(false)
    const [file1Upload, setFile1Upload] = useState(false)
    const [mp4, setMp4] = useState(null)
    const {currentVideo, setCurrentVideo} = UseCtx()

    console.log(props.desc)

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
  return (
    <div className='item-container'
                onDrop={onDrop1}
                onDragOver={onDragOver}
            >
                <img src={require(`../../assets/${props.img}`)} />
                <div className='product-text'>
                    <h3>{props.itemName}</h3>
                    <div>
                        <ul>
                            {props.desc.map((ele) => 
                            <li>{ele}</li>
                            )}
                        </ul>
                    </div>
                    <p>Free</p>
                    <div>
                        {file1Upload ? <p>{currentVideo.name}</p> : <p style={{fontSize: '0.8em'}}>No File Detected*</p>}
                        {file1Upload ? <Link to={props.link}><button>Edit for TikTok</button></Link> : <></>}
                    </div>
                </div>
            </div>
  )
}

export default ItemTemplate