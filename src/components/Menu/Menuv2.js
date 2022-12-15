import React, {useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import { UseCtx } from '../../contexts/Context'
import ItemTemplate from './ItemTemplate'

function Menuv2() {
  return (
    <div className='menu-page-container'>
        <h1>DRAG FILE OVER TEMPLATE TO BEGIN</h1>
        <div className='menu-container'>
            <ItemTemplate 
            itemName={'FPS'}
            img={'FPS_template.png'}
            link={'/fps-template'}
            desc={[
                'upload video file',
                'select timestamps for clip',
                'position facecam and gameplay crop zone'
            ]}
            />
            <ItemTemplate 
            itemName={'Full Width + Cam'}
            img={'full_width_with_cam.png'}
            link={'/full-width-cam-template'}
            desc={[
                'upload video file',
                'select timestamps for clip',
                'position top video crop and gameplay crop',
                'add background and clip-splitter overlay (optional)'
            ]}
            />
             <ItemTemplate 
            itemName={'Full Height Gameplay'}
            img={'full_height_gameplay.png'}
            link={'/full-template'}
            desc={[
                'upload video file',
                'select timestamps for clip',
                'position gameplay crop'
            ]}
            />
            <ItemTemplate 
            itemName={'50 50 Split'}
            img={'horizontal_split_template.png'}
            link={'/50-50-template'}
            desc={[
                'upload video file',
                'select timestamps for clip',
                'position top crop and bottom crop'
            ]}
            />
            <ItemTemplate 
            itemName={'DEVZONE'}
            img={'horizontal_split_template.png'}
            link={'/dirtyburger'}
            desc={[
                'doink n amish'
            ]} />
            
        </div>
    </div>
  )
}

export default Menuv2