"use client"
import { useParams } from 'next/navigation'
import { useEffect, useState } from 'react'
import './ev.css'
import pruebaJpg from "@/app/assets/prueba.jpg"
import { getSelectedEventRequest } from '@/app/api/eventApi'

const Ev = () => {
    const params = useParams()
    const [eventSelected, setEventSelected] = useState([])
    const [quantity, setQuantity] = useState(0)

    useEffect(() => {
        const getEvent = async () => {
            const res = await getSelectedEventRequest(params.eventId)
            setEventSelected(res.data)
        }
        getEvent()
    },[])
    
    console.log(eventSelected)

    const minusQuantity = () => {
        if(quantity <= 0){
            setQuantity(0)
        }else{
            setQuantity(quantity - 1)
        }
    }

    const plusQuantity = () => {
        if(quantity < 10){
            setQuantity(quantity + 1)
        }else if(quantity === 10){
            setQuantity(10)
        }
    }

    
        const updateEventTicket = (ticketId, action) => {
            if(action === "minus"){
//mandar el id del ticket para quitar la cantidad a waiting (todavia no comprado)
            }else if(action === "plus"){
//mandar el id del ticket para agregar la cantidad a waiting (todavia no comprado)
            }
        }
    

    return(
        <>
            {eventSelected.map((evS) => 
            <div className="flex p-9 mt-16 bg-slate-900 w-screen" key={evS._id}>
                <div className="p-6">
                    <img className='w-[450px] h-[450px]' src={evS.eventImg} alt=""></img>
                </div>
                <div className="p-6">
                    <h5 className='text-3xl'>{evS.eventName} </h5><br></br>
                    <p className='text-xl'>Adress: {evS.eventAdress} </p><br></br>
                    <p className='text-xl'>Fecha: {evS.eventDate}</p><br></br>
                    <p>{evS.eventDescription}</p><br></br>
                    <p>Personas que asisten al evento: {evS.assists}</p><br></br>
                    <h5>Compra tus entradas:</h5><br></br>
                    <div className='flex'>
                        <div className="purchase-categories">
                            {evS.ticket.map((tck) => 
                            <div className="flex items-center mt-3" key={tck._id}>
                                <p>{tck.category}:</p>
                                <div className="purchase-tickets flex ml-6 items-center justify-between w-[130px]">
                                    <button className="bg-yellow-500 text-black p-1 pl-4 pr-4" onClick={() => updateEventTicket(tck._id, "minus")}><p>-</p></button>
                                    <p className="text-white">{tck.waiting}</p>
                                    <button className="bg-yellow-500 text-black p-1 pl-4 pr-4" onClick={() => updateEventTicket(tck._id, "plus")}><p>+</p></button>
                                    <p>{tck.price}</p>
                                </div>
                            </div>)}
                        </div>
                        <div className='text-center ml-6'>
                            <button className='mx-auto bg-yellow-500 text-black rounded-lg p-3 ml-6 text-xl'>Comprar mis entrada</button>
                            <button className='mx-auto bg-slate-950 rounded-lg p-3 ml-6 text-xl'>Cancelar compra</button>
                        </div>
                    </div>
                </div>
            </div>)}
        </>
    )
}

export default Ev