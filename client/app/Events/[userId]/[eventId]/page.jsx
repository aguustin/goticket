"use client"
import { useParams } from 'next/navigation'
import { useContext, useEffect, useState } from 'react'
import './ev.css'
import pruebaJpg from "@/app/assets/prueba.jpg"
import { getSelectedEventRequest } from '@/app/api/eventApi'
import { buyTicketRequest } from '@/app/api/userApi'

const Ev = () => {
    const params = useParams()
    //const {userInfo} = useContext(AppContext)
    const [eventSelected, setEventSelected] = useState([])
    const [sellsByCat, setSellsByCat] = useState(0)
    const [totalSelled, setTotalSelled] = useState(0)
    const [total, setTotal] = useState(0)
    const [serviceCost, setServiceCost] = useState(0)
    console.log(params)

    useEffect(() => {
        const getEvent = async () => {
            const res = await getSelectedEventRequest(params.eventId)
            setEventSelected(res.data)
        }
        getEvent()
    },[])
    
    console.log(eventSelected)

    /*const minusQuantity = () => {
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
    }*/


    
        const updateEventTicket =(ticketId, action, categorySells) => {
            if(action === "minus"){
                setEventSelected((prevEventSelected) => 
                    prevEventSelected.map((eventS) => {
                      return {
                        ...eventS,  // Spread the event object to keep the other properties intact
                        ticket: eventS.ticket.map((et) => {
                          if (et._id === ticketId) {
                            if(et.waiting <= 0){
                                setTotalSelled(totalSelled - 0)
                                setSellsByCat(sellsByCat - 0)
                                return {
                                    ...et,  // Spread the ticket object to keep the other properties intact
                                    waiting: et.waiting - 0,  // Update the quantity
                                    sellsByCat: et.sellsByCat - 0
                                };
                            }else{
                                const categorySellsToNum = Number(categorySells)
                                setTotalSelled(totalSelled - 1)
                                const priceToNum = Number(et.price)
                                setTotal(total - priceToNum)
        
                                return {
                                  ...et,  // Spread the ticket object to keep the other properties intact
                                  waiting: et.waiting - 1,  // Update the quantity
                                  sellsByCat:  et.sellsByCat - categorySellsToNum  
                                };
                            }
                          }
                          return et;  // If the ticket ID doesn't match, return the ticket unchanged
                        }),
                      };
                    })
                  );
                  console.log(eventSelected)
                //mandar el id del ticket para quitar la cantidad a waiting (todavia no comprado)
            }else if(action === "plus"){
                setEventSelected((prevEventSelected) => 
                    prevEventSelected.map((eventS) => {
                      return {
                        ...eventS,  // Spread the event object to keep the other properties intact
                        ticket: eventS.ticket.map((et) => {
                            if (et._id === ticketId) {
                                if(et.waiting < 10){
                                    const categorySellsToNum = Number(categorySells)
                                    setTotalSelled(totalSelled + 1)
                                    const priceToNum = Number(et.price)
                                    setTotal(total + priceToNum)
                                    const serviceToNum = Number(total * 5 / 100)
                                    setServiceCost(serviceToNum)
                                    return {
                                        ...et,  // Spread the ticket object to keep the other properties intact
                                        waiting: et.waiting + 1,  // Update the quantity
                                        sellsByCat: et.sellsByCat + categorySellsToNum,
                            
                                    };
                                }else{
                                    return {
                                        ...et,  // Spread the ticket object to keep the other properties intact
                                        waiting: et.waiting + 0,  // Update the quantity
                                        sellsByCat: et.sellsByCat + 0
                                    };
                                }
                                
                              }
                          return et;  // If the ticket ID doesn't match, return the ticket unchanged
                        }),
                      };
                    })
                );
                
               console.log("eee: ", eventSelected)
               console.log("Service cost updated:", serviceCost);
                //mandar el id del ticket para agregar la cantidad a waiting (todavia no comprado)
            }
        }
        useEffect(() => {
            if (total > 0) {
                const serviceToNum = (total * 5) / 100;
                setServiceCost(serviceToNum); // Calculate and set service cost based on the updated `total`
            }
        }, [total]);
        //console.log(sellsByCat)

    const buyTicket = async (eventBuyedId) => {
       const extractBuyedInfo = eventSelected[0].ticket.map(ticket => ({
            category: ticket.category,
            buyQuantity: ticket.waiting,
        }));

        const buyData = {
            userId:params.userId,
            eventBuyedId: eventBuyedId,
            status: 1,
            tickets: eventSelected[0].ticket,
            cost: Number(total),
            serviceCost: serviceCost,
            totalSelled: totalSelled,
            extractBuyedInfo: extractBuyedInfo
        }
        console.log("buyData: ", buyData)
        await buyTicketRequest(buyData)
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
                    <p>Personas que asisten al evento: {evS.sells}</p><br></br>
                    <h5>Compra tus entradas:</h5><br></br>
                    <div className='flex'>
                        <div className="purchase-categories">
                            {evS.ticket.map((tck) => 
                            <div className="flex items-center mt-3" key={tck._id}>
                                <p>{tck.category}:</p>
                                <div className="purchase-tickets flex ml-6 items-center justify-between w-[130px]">
                                    <button className="bg-yellow-500 text-black p-1 pl-4 pr-4" onClick={() => updateEventTicket(tck._id, "minus", tck.price)}><p>-</p></button>
                                    <p className="text-white">{tck.waiting}</p>
                                    <button className="bg-yellow-500 text-black p-1 pl-4 pr-4" onClick={() => updateEventTicket(tck._id, "plus", tck.price)}><p>+</p></button>
                                    <p>{tck.price}</p>
                                </div>
                            </div>)}
                        </div>
                        <div className='text-center ml-6'>
                            <button className='mx-auto bg-yellow-500 text-black rounded-lg p-3 ml-6 text-xl' onClick={() => buyTicket(evS._id)}>Comprar mis entrada</button>
                            <button className='mx-auto bg-slate-950 rounded-lg p-3 ml-6 text-xl'>Cancelar compra</button>
                        </div>
                    </div>
                    <div>
                        <p>Total: {total}</p>
                        <p>Tickets en el carrito: {totalSelled} </p>
                    </div>
                    <p>El costo del servicio es el 5% del valor total de las entradas: {serviceCost}</p>
                </div>
            </div>)}
        </>
    )
}

export default Ev