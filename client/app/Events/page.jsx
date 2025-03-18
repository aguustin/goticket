"use client"
import React from "react"
import "./events.css"
import pruebaJpg from "@/app/assets/prueba.jpg"
import Link from "next/link"
import peoplePng from "@/app/assets/people.png"

export default function Events() {
    
      return (
        <>
            <div className="p-9 mt-16 flex flex-wrap bg-slate-900 w-screen">
                <Link href="/Events/id" className="event-card mx-auto m-3 max-w-sm bg-white border border-gray-200 rounded-lg shadow-sm dark:bg-slate-950 dark:border-gray-700">
                    <img className="rounded-t-lg" src={pruebaJpg.src} alt="" />
                    <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Noteworthy technology acquisitions 2021</h5>
                        <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">Adress: 9 de julio Mendoza Argentina</p>
                        <p>Fecha: 17/02/2025</p>
                        <div className="flex items-center justify-between">
                            <button href="#" className="inline-flex mt-6 items-center px-3 py-2 text-sm font-medium text-center text-black text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-yellow-500 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                Ver evento
                                <svg className="rtl:rotate-180 w-3.5 h-3.5 ms-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 5h12m0 0L9 1m4 4L9 9"/>
                                </svg>
                            </button>
                            <div className="flex items-center mt-6 mr-3">
                                <img src={peoplePng.src} alt=""></img>
                                <p className="ml-2">26</p>
                            </div>
                        </div>
                    </div>
                </Link>
            </div>
        </>
      )
  }