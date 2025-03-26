"use client"
import '@/app/components/NavBar/navbar.css'
import certificatePng from '@/app/assets/certificate.png'
import ResIng from '../ResIng/page'
import { useContext } from 'react'
import UserContext from '@/app/context/appContext'
import { loginRequest } from '@/app/api/userApi'

const NavBar = () => {
    const { userInfo, showResIng, setShowResIng,  setSignInForm } = useContext(UserContext)

    const showRes = () => {
        setShowResIng(true)
        setSignInForm(false)
    }

    const showIng = () => {
        setShowResIng(true)
        setSignInForm(true)
    }

    return(
        <>
            <nav className="navbar fixed w-full flex items-center top-0 bg-slate-800">
                <img src={certificatePng.src} alt=""></img>
                {userInfo.length <= 0 ? 
                <div className='nav-div-buttons absolute right-10 flex items-center'>
                    <button className='rounded-2xl pt-2 pb-2 pl-3 pr-3 mr-6' onClick={() => showRes()}>Crear cuenta</button>
                    <button className='rounded-2xl pt-2 pb-2 pl-3 pr-3' onClick={() => showIng()}>Ingresar</button>
                </div>
                :
                <div className='nav-div-buttons absolute right-10 flex items-center'>
                    <p>Hola {userInfo?.name} {userInfo?.lastname}</p>
                </div>
                }   
            </nav>
            {showResIng && <ResIng/>}
        </>
    )
}

export default NavBar