"use client"

import { getAllEventsRequest } from "../api/eventApi";

const { createContext, useState, useEffect } = require("react");

const AppContext = createContext()

export const AppContextProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState([])
    const [showResIng, setShowResIng] = useState(false)
    const [signForm, setSignInForm] = useState(false)
    const [eventsInfo, setEventsInfo] = useState([])
    const [session, setSession] = useState([])

    useEffect(() => {
        const getSessionFunc = async () => {
            const items = await JSON.parse(localStorage.getItem('items'))
            if(items){
                setUserInfo(items?.[0])
            }
        }
        
        const getAllEvents = async () => {
            const res = await getAllEventsRequest()
            setEventsInfo(res.data)

        }
        getSessionFunc()
        getAllEvents()
    }, [])
  
    console.log(eventsInfo)

    return(
        <AppContext.Provider value={{userInfo, setUserInfo, showResIng, setShowResIng, signForm, setSignInForm, eventsInfo}}>{children}</AppContext.Provider>
    )
}

export default AppContext