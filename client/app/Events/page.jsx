"use client"
import React, { useContext, useEffect, useState } from "react"
import "./events.css"
import pruebaJpg from "@/app/assets/prueba.jpg"
import Link from "next/link"
import peoplePng from "@/app/assets/people.png"
import AppContext from "../context/appContext"
import { useParams } from "next/navigation"
import starSvg from "@/app/assets/star.svg"

export default function Events() {
    const params = useParams()
    const {eventsInfo, userInfo} = useContext(AppContext)
    const [search, setSearch] = useState('')
    console.log(params)
      return (
        <>
            <div className="events relative p-9 mt-[70px] flex flex-wrap bg-slate-900 w-screen h-screen">
                <form className="fixed right-10">
                    <input className="p-3 rounded-lg bg-slate-950" type="text" placeholder="Buscar evento" onChange={(e) =>setSearch(e.target.value)}></input>
                </form>
                {eventsInfo.filter((ef) => {
                    return search.toLowerCase() === ''
                    ? ef 
                    : ef.eventName.toLowerCase().includes(search)
                }).map((ei) => 
                    <div key={ei._id} className="mx-auto mb-6">
                    <Link href={`/Events/${userInfo?._id}/${ei._id}`} className="event-card mx-auto m-3 max-w-sm bg-white rounded-lg">
                        <img className="object-fill rounded-t-lg h-[350px] w-[350px]" src={ei.eventImg} alt=""/>
                        <div className="pt-5 pb-5 bg-slate-950 w-full">
                            <div className="flex items-center justify-between">
                                <h5 className="mb-2 ml-3 mr-3 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">{ei.eventName}</h5>
                            </div>
                            <p className="mb-3 ml-3 mr-3 font-normal text-gray-700 dark:text-gray-400">Adress: {ei.eventAdress}</p> 
                            <p className="mb-3 ml-3 mr-3">Fecha: {ei.eventDate}</p>
                            <div className="flex items-center justify-between ml-3 mr-3">
                                <button href="#" className="inline-flex mt-6 items-center px-3 py-2 text-sm font-medium text-center text-black text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-yellow-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Ver evento
                                    <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                    </svg>
                                </button>
                                <div className="flex items-center mt-6 mr-3">
                                    <img src={peoplePng.src} alt=""></img>
                                    <p className="ml-2">{ei.assists}</p>
                                </div>
                            </div>
                        </div>
                    </Link>
                </div>)}
            </div>
        </>
      )
  }