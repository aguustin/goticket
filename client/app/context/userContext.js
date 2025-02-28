"use client"
const { createContext, useState } = require("react");

const UserContext = createContext()

export const UserContextProvider = ({children}) => {
    const [userInfo, setUserInfo] = useState([])
    const [showResIng, setShowResIng] = useState(false)
    const [signForm, setSignInForm] = useState(false)

    return(
        <UserContext.Provider value={{userInfo, setUserInfo, showResIng, setShowResIng, signForm, setSignInForm}}>{children}</UserContext.Provider>
    )
}

export default UserContext