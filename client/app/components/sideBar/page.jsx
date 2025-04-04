"use client"
import '@/app/components/sideBar/sidebar.css'
import leftPng from '@/app/assets/left.png'
import addPng from '@/app/assets/add.png'
import categoryPng from '@/app/assets/category.png'
import favoritePng from '@/app/assets/star.png'
import myEventsPng from '@/app/assets/my-events.png'
import searchPng from '@/app/assets/search-event.png'
import logoutPng from '@/app/assets/logout.png'
import upArrowPng from '@/app/assets/up-arrow.png'
import downArrowPng from '@/app/assets/down-arrow.png'
import { useContext, useState } from 'react'
import Link from 'next/link'
import UserContext from '@/app/context/appContext'
import { redirect } from 'next/navigation'
import piechartPng from '@/app/assets/piechart.png'

const SideBar = () => {

    const [openCategoryNav, setOpenCategoryNav] = useState(false)
    const {userInfo} = useContext(UserContext)

    const logout = () => {
        localStorage.clear()
        window.location.reload();
        redirect('/Home')
    }
 
    return(
        <>
            <nav className="sidebar z-200 h-screen relative left-0 mt-0 bg-slate-800">
                <div className='top-sidebar relative flex items-center justify-center pt-6 pb-6 pl-10 pr-10 bg-slate-800'>
                    <p className=''>Go Tickets</p>
                    <button className='absolute right-3'><img src={leftPng.src} alt=""></img></button>
                </div>
                <div className='mr-3'>
                    <Link href="/Events" className='flex items-center pt-6 pb-6 border-b-2 w-full'>
                        <img className='ml-2' src={searchPng.src} alt=""></img>
                        <p className='ml-3'>Buscar eventos</p>
                    </Link>
                    <Link href="/MyEvents" className='flex items-center text-center pt-6 pb-6 border-b-2 w-full'>
                        <img className='ml-2' src={myEventsPng.src} alt=""></img>
                        <p className='ml-3'>Mis eventos</p>
                    </Link>
                    <Link href="/MyProductions" className='flex items-center text-center pt-6 pb-6 border-b-2 w-full'>
                        <img className='ml-2' src={myEventsPng.src} alt=""></img>
                        <p className='ml-3'>Mis producciones</p>
                    </Link>
                    {/*<button onClick={() => setOpenCategoryNav(!openCategoryNav)} className='flex items-center text-center pt-6 pb-6 border-b-2 w-full'>
                        <img className='ml-2' src={categoryPng.src} alt=""></img>
                        <div className='flex items-center'>
                            <p className='ml-3'>Categorias</p>
                            <img className='absolute right-4' src={openCategoryNav ? upArrowPng.src : downArrowPng.src} alt=""></img> 
                        </div>
                    </button>
                    {/*openCategoryNav && <div className='w-full ml-3'>
                        <Link href="/Events" className='sub-sidenav-categories flex items-center text-center pt-4 pb-4 border-b-2 w-full'>
                            <img className='ml-9' src={myEventsPng.src} alt=""></img>
                            <p className='ml-3'>Musica</p>
                        </Link>
                        <Link href="/Events" className='sub-sidenav-categories flex items-center text-center pt-4 pb-4 border-b-2 w-full'>
                            <img className='ml-9' src={myEventsPng.src} alt=""></img>
                            <p className='ml-3'>Musica</p>
                        </Link>
                        <Link href="/Events" className='sub-sidenav-categories flex items-center text-center pt-4 pb-4 border-b-2 w-full'>
                            <img className='ml-9' src={myEventsPng.src} alt=""></img>
                            <p className='ml-3'>Musica</p>
                        </Link>
                    </div>*/}
                    <button className='flex items-center text-center pt-6 pb-6 border-b-2 w-full'>
                        <img className='ml-2' src={favoritePng.src} alt=""></img>
                        <p className='ml-3'>Favoritos</p>
                    </button>
                    {userInfo.rol === 2 && <Link href="/Producer" className='flex items-center text-center pt-6 pb-6 border-b-2 w-full'>
                        <img className='ml-2' src={addPng.src} alt=""></img>
                        <p className='ml-3'>Crear evento</p>
                    </Link>}
                    {userInfo.rol === 2 && <Link href="/Stadistics"  className='flex items-center text-center pt-6 pb-6 border-b-2 w-full'> 
                        <img className='ml-2' src={piechartPng.src} alt=""></img>
                        <p className='ml-3'>Estadisticas</p>
                    </Link>}
                </div>
                {userInfo.rol > 0 && <button onClick={() => logout()}  className='logout-button w-full absolute bottom-0 justify-between flex items-center text-center pt-6 pb-6 pr-10 bg-slate-800'>
                    <img className='ml-3' src={logoutPng.src} alt=""></img>
                    <p className='ml-3'>Salir</p>
                </button>}
            </nav>
        </>
    )
}

export default SideBar