"use client"
import { useEffect, useState } from "react"

export function fetchLink(suffix){
    return 'https://blackgoldapi.tsasoft.com/'+suffix
}

export function useScreen(){    
    const [width, setWidth] = useState(0)
    useEffect(()=>{
        setWidth(window.innerWidth)
        function handleWidth(){
            setWidth(window.innerWidth)
        }
        window.addEventListener('resize', handleWidth)
        return () => window.removeEventListener('resize', handleWidth)
    },[width])
    return width > 450
}
