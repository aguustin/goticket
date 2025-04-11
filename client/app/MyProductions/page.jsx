"use client"
import './myProductions.css'
import { useContext, useEffect, useState } from "react"
import AppContext from "../context/appContext"
import Link from "next/link"
import { deleteEventRequest, getCreatedEventsRequest } from "../api/eventApi"
import peopleBlackPng from "@/app/assets/peopleBlack.png"
import { redirect } from 'next/navigation'

const MyProductions = () => {
    
    const {userInfo, myEventState, setMyEventState} = useContext(AppContext)

    useEffect(() => {
        const getMyEvents = async () => {
            console.log(userInfo._id)
             const res = await getCreatedEventsRequest(userInfo._id)
             setMyEventState(res.data)
        }
        getMyEvents()
    },[userInfo._id])
    console.log(myEventState)

    const deleteEvent = async (userId, eventId) => {
        const data = {
            userId:userId, 
            eventId:eventId
        }

        const res = await deleteEventRequest(data)

        if(res.data){
            redirect('/MyProductions')
        }else{
            console.log("Hubo un problema al borrar el evento")
        }
    }

    return(
        <div className="myProductions relative p-9 mt-[70px] flex flex-wrap bg-slate-900 w-screen h-screen">
        {myEventState.map((ei) => 
            <div key={ei._id} className="mx-auto mb-6">
                    <div className="mx-auto m-3 max-w-sm bg-white rounded-lg">
                        <img className="object-fill rounded-t-lg h-[350px] w-[350px]" src={ei.eventImg} alt=""/>
                        <div className="pt-5 pb-5 bg-slate-950 w-full">
                            <h5 className="mb-2 ml-3 mr-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ei.eventName}</h5>
                            <p className="mb-3 ml-3 mr-3 font-normal text-gray-700 dark:text-gray-400">Adress: {ei.eventAdress}</p> 
                            <p className="mb-3 ml-3 mr-3">Fecha: {ei.eventDate}</p>
                            <div className="flex ml-3 mr-3 justify-between">
                                <Link className="flex bg-slate-700 items-center px-3 py-2 w-full mr-2" href={`/Producer/${ei._id}`}>
                                    <p>Actualizar</p>
                                </Link>
                                <button className="flex bg-orange-600 items-center px-3 py-2 w-full ml-2" onClick={() => deleteEvent(userInfo._id, ei._id)}>
                                    <p>Borrar</p>
                                </button>
                            </div>
                            <div className="flex items-center justify-between ml-3 mr-3">
                                <Link href={`/Events/${userInfo?._id}/${ei._id}`} className="inline-flex justify-between mt-6 items-center px-3 py-2 text-sm font-medium text-center text-black text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-yellow-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800 w-full">
                                    <p className="flex items-center">Ver evento
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                    </p>
                                    <div className="flex items-center">
                                        <p className="ml-2 text-black">{ei.assists}</p>
                                        <img src={peopleBlackPng.src} alt=""></img>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div> 
    )
}

export default MyProductions