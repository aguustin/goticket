"use client"
import '@/app/Home/home.css'
import { useContext } from 'react'
import UserContext from '@/app/context/userContext'
import ticketPng from '@/app/assets/ticket.png'
import Link from 'next/link'

const Home = () => {
    const {userInfo} = useContext(UserContext)
    console.log(userInfo)
    return(
        <div className='home h-screen w-screen overflow-scroll relative right-0 bg-slate-900 p-10 text-center'>
            <div>
                <h1 className='text-5xl'>Crea, organiza y compra tus entradas con Go ticket</h1>
                <h2 className='mt-6 text-2xl'>Con Go Ticket, tienes todo lo que necesitas para llevar tus eventos al siguiente nivel. Crea tu evento, organiza todos los detalles y compra tus entradas de manera rápida y sencilla. Todo en un solo lugar, para que tú solo te concentres en disfrutar el momento. ¡Haz de tu evento una experiencia inolvidable con Go Ticket!</h2>
            </div>
            <div className='flex mt-10'>
                <Link href="/Create" className="card text-center pt-7 pb-7 pr-5 pl-5 rounded-xl bg-slate-950 w-[1000px] mx-10">
                <div className='relative '>
                    <p className='text-2xl'>Crea tus eventos</p>
                    <img src={ticketPng.src} alt="" className='mx-auto mt-5 mb-5'></img>
                    <p className='text-lg' style={{color:'white'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi pariatur, omnis deleniti illo aut velit delectus iure quibusdam sed. Eos, vel sit id quasi at animi enim minus quae saepe!</p>
                </div>
                </Link>
                <Link href="/Events" className="card relative text-center pt-7 pb-7 pr-5 pl-5 rounded-xl bg-slate-950 w-[1000px] mx-10">
                <div className='relative'>
                    <p className='text-2xl'>Buscar eventos</p>
                    <img src={ticketPng.src} alt="" className='mx-auto mt-5 mb-5'></img>
                    <p className='text-lg' style={{color:'white'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi pariatur, omnis deleniti illo aut velit delectus iure quibusdam sed. Eos, vel sit id quasi at animi enim minus quae saepe!</p>
                </div>
                </Link>
                <Link href="/Contact" className="card relative text-center pt-7 pb-7 pr-5 pl-5 rounded-xl bg-slate-950 w-[1000px] mx-10">
                <div className='relative'>
                    <p className='text-2xl'>¿Tienes dudas? Contactanos</p>
                    <img src={ticketPng.src} alt="" className='mx-auto mt-5 mb-5'></img>
                    <p className='text-lg' style={{color:'white'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi pariatur, omnis deleniti illo aut velit delectus iure quibusdam sed. Eos, vel sit id quasi at animi enim minus quae saepe!</p>
                </div>
                </Link>
                <Link href="/" className="card relative text-center pt-7 pb-7 pr-5 pl-5 rounded-xl bg-slate-950 w-[1000px] mx-10">
                <div className='relative'>
                    <p className='text-2xl'>Visitar Go market</p>
                    <img src={ticketPng.src} alt="" className='mx-auto mt-5 mb-5'></img>
                    <p className='text-lg' style={{color:'white'}}>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Eligendi pariatur, omnis deleniti illo aut velit delectus iure quibusdam sed. Eos, vel sit id quasi at animi enim minus quae saepe!</p>
                </div>
                </Link>
            </div>
            <div className='absolute bottom-14 left-0 p-5  bg-slate-700'>
                <p>Aviso: GoTicket actúa exclusivamente como plataforma para la venta de entradas online y no se responsabiliza de la calidad ni de la satisfacción de los eventos publicados. Al utilizar este servicio, usted acepta los términos y condiciones de la aplicación. Copyright © 2025 GoTicket.</p>
            </div>
            
        </div>
    )
}

export default Home