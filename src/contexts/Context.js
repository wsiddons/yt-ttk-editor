import React, { useContext, useEffect, useState } from 'react'

const Context = React.createContext()

export function UseCtx() {
    return useContext(Context)
}

export function Provider({ children }) {
    const [loading, setLoading] = useState(true)
    const [currentVideo, setCurrentVideo] = useState(null)

    const value = {
        currentVideo, 
        setCurrentVideo
    }

    return (
        <Context.Provider value={value}>
            {children}
        </Context.Provider>
    )
}