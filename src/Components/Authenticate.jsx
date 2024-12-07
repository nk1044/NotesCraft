import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import { useUser } from '../Store/Zustand.js'

export default function Protected({children}) {

    const navigate = useNavigate()
    const [loader, setLoader] = useState(true);
    const User = useUser((state)=>(state.User));
    // console.log(User);
    
    useEffect(() => {
        if(User === undefined || Object.keys(User).length === 0 || User.name === undefined){
            navigate("/login");
        }
        setLoader(false)
    }, [navigate])

  return loader ? <h1>Loading...</h1> : <>{children}</>
}