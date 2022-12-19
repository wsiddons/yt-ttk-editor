import React, { useContext, useEffect, useState } from 'react'

const Context = React.createContext()

export function UseCtx() {
    return useContext(Context)
}

export function Provider({ children }) {
    const [loading, setLoading] = useState(true)
    const [currentVideo, setCurrentVideo] = useState(null)

    //crop dims
    const [topCrop, setTopCrop] = useState({width: 0, height: 0})
    const [topPos, setTopPos] = useState({x: 0, y: 0})

    const [botCrop, setBotCrop] = useState({width: 0, height: 0})
    const [botPos, setBotPos] = useState({x: 0, y: 0})

    //trim stuff 
    const [startTime, setStartTime] = useState(0)
    const [endTime, setEndTime] = useState(0)

    //output video
    const [outputVideo, setOutputVideo] = useState(null)

    // file name 
    const [fileName, setFileName] = useState('')


    const value = {
        currentVideo, 
        setCurrentVideo,
        topCrop,
        setTopCrop,
        botCrop,
        setBotCrop,
        startTime,
        setStartTime,
        endTime,
        setEndTime,
        topPos, 
        setTopPos,
        botPos,
        setBotPos,
        outputVideo,
        setOutputVideo,
        fileName,
        setFileName
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}