"use client"
import { useContext, useEffect, useState } from 'react'
import './stadistics.css'
import progressPng from '@/app/assets/progress.png'
import { getMyCreatedEventsRequest } from '../api/eventApi'
import { useParams } from 'next/navigation'
import AppContext from '../context/appContext'
import { Line } from 'react-chartjs-2'

const Stadistics = () => {
    const param = useParams()
    const {userInfo} = useContext(AppContext)
    const [createdEv, setCreatedEv] = useState([])
    const [stadisticsEv, setStadisticsEv] = useState([])
    
    useEffect(() => {
        const getMyCreatedEvents = async () => {
            const res = await getMyCreatedEventsRequest(userInfo?._id)
            setCreatedEv(res.data)
        }
        getMyCreatedEvents()
    },[userInfo?._id])
    
    console.log("createEv: ", createdEv)

    const openStadistics = (eventId) => {
        setStadisticsPanel(true)
        setStadisticsEv.filter(createdEv.filter((item) => item === eventId));
    }

    let stadisticsData = {
        labels: "Enero",
        datasets:[
            {
                label:"Profits",
                data: stadisticsEv
            }
        ]
    }

    let myOptions = {
        
    }

    const LineChart = () =>{
        return <Line data={stadisticsEv} options={myOptions}/>
    }

    return(
        <>
        <div className="relative p-9 mt-[70px] flex flex-wrap bg-slate-900 w-screen">
            {createdEv.map((cev) => 
                    <div key={cev._id} className='relative z-7 event-stats bg-slate-800 w-[350px] mx-auto'>
                        <div>
                            <p>Evento: {cev.eventName}</p>
                        </div>
                        <div>
                            <p>Adress:{cev.eventAdress}</p>
                        </div>
                        <div>
                            <div>
                                <p>Tickets selled:{cev.sells}</p>
                            </div>
                            <div>
                                <p>Total profits:{cev.profits}</p>
                            </div>
                        </div>
                        <img src={progressPng.src} alt="" className=' top-0 w-full'></img>
                        <button className='bg-slate-600' onClick={() => openStadistics(cev._id)}>Abrir Estadisticas</button>
                    </div>
            )}
            <div>
                {stadisticsEv.map((ste) =>
                <div>
                    <div></div>
                    {ste.ticket.map((steTicket) => 
                        <div></div>
                    )}
                </div> 
                )}
            </div>
        </div>
    </>
)
}

export default Stadistics