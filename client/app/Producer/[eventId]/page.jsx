"use client"
import './updateEvent.css'
import { getSelectedEventRequest, updateMyEventRequest } from "@/app/api/eventApi"
import { useParams } from "next/navigation"
import { useEffect, useState } from "react"
import updatePng from '@/app/assets/update.png'
import Link from "next/link"

const UpdateEvent = () => {
    const param = useParams()
    const [eventSelected, setEventSelected] = useState([])
    const [newTicketState, setNewTicketState] = useState(0)
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [visible, setVisible] = useState()
    const [disableAdd, setDisableAdd] = useState(false)
    let i = 0
    
    useEffect(() => {
            const getEvent = async () => {
                const res = await getSelectedEventRequest(param.eventId)
                setEventSelected(res.data)
            }
            getEvent()
    },[])
    console.log('event: ', eventSelected)

    const newTicket = (e) => {
        e.preventDefault()
        setNewTicketState(newTicketState + 1)
        setDisableAdd(true)
    }

    const updateTicketsFunc = (e) => {
        e.preventDefault()
        if(price <= 0 || quantity <= 0){
            console.log('faltan datos')
        }else{
            /*const event = {
                eventAdress:'',
                eventDate:'',
                eventDescription:'',
                eventImg: "https://res.cloudinary.com/drmcrdf4r/image/upload/v1743017009/goticket/htkvh0dzlcnbjtmgbkdt.png",
                eventName: eventName
            }*/
            const ticket = {
                price: price,
                category: category,
                quantity: quantity,
                waiting: 0,
                sellsByCat: 0,
                visible: visible,
            }
            setEventSelected((prevState) => {
                // Map through the array to find the event and update the ticket array
                return prevState.map((event) => {
                  // Find the specific event by _id
                    return {
                      ...event,
                      ticket: [...event.ticket, ticket] // Append the new ticket to the existing ticket array
                    };
                });
              });
              setDisableAdd(false)
              setNewTicketState(0)
           
        } 
    }
    
    console.log("updateado: " ,eventSelected)

    const updateEventFunc = async (e) => { 
        e.preventDefault()
        const eventData = new FormData();
        eventData.append('eventSelected', JSON.stringify(eventSelected));
   
        if (e.target.elements.eventImg.files[0]) {
            eventData.append('eventImg', e.target.elements.eventImg.files[0]);
        }

        try {
            const res = await updateMyEventRequest(eventData);  
            console.log(res.data);
        } catch (error) {
            console.error(error);
        }

    }

    const handleChange = (id, field, value) => {
        setEventSelected((prevState) =>
            prevState.map((event) =>
                event._id === id ? { ...event, [field]: value } : event
            )
        );

    };
    
    const handleFileChange = (id, event) => {
        const file = event.target.files[0];
        const fileURL = URL.createObjectURL(file); // Assuming you're uploading the file and displaying it as a URL
        setEventSelected((prevState) =>
            prevState.map((ev) =>
                ev._id === id ? { ...ev, eventImg: fileURL } : ev
            )
        );
    };

return(
    <>
        <div className="bg-slate-900 p-9 w-screen">
            <form encType="multipart/form-data" className="tickets-form mx-auto mt-16 w-[700px] max-h-[800px] pr-3" onSubmit={(e) => updateEventFunc(e)}>
                <div className="flex justify-between">
                    {eventSelected.map((evS) =>
                    <div key={evS._id}>
                    <div>
                        <label htmlFor="upload-file-event" className="custom-file-upload bg-slate-950"><img className='mx-auto' src={evS.eventImg}></img></label><br></br>
                        <input id="upload-file-event" type="file" name="eventImg"  onChange={(e) => handleFileChange(evS._id, e)} />
                    </div>
                    <div>
                        <label className="text-xl">Nombre del evento:</label><br></br>
                        <input className="rounded-lg bg-slate-950 p-1 w-[370px]" type="text" name="eventName" value={evS.eventName || ''} onChange={(e) => handleChange(evS._id, 'eventName', e.target.value)}></input>
                    </div><br></br>
                    <div>
                        <label className="text-xl">Direccion:</label><br></br>
                        <input className="rounded-lg bg-slate-950 p-1 w-[370px]" type="text" name="eventAdress" value={evS.eventAdress} onChange={(e) => handleChange(evS._id, 'eventAdress', e.target.value)}></input>
                    </div><br></br>
                    <div>
                        <label className="text-xl">Descripcion (opcional):</label><br></br>
                        <input className="rounded-lg bg-slate-950 p-1 w-[370px]" type="text" name="eventDescription" value={evS.eventDescription} onChange={(e) => handleChange(evS._id, 'eventDescription', e.target.value)} ></input>
                    </div><br></br>
                    <div>
                        <label className="text-xl">Fecha:</label><br></br>
                        <div className="flex items-center">
                            <input className="rounded-lg bg-slate-950 p-1" type="date" name="eventDate" value={evS.eventDate ? new Date(parseInt(evS.eventDate)).toISOString().split('T')[0] : ''} onChange={(e) => handleChange(evS._id, 'eventDate', new Date(e.target.value).getTime())}></input>
                            <p className="ml-3">Fecha actual: {evS.eventDate ? new Date(parseInt(evS.eventDate)).toISOString().split('T')[0] : ''} </p>
                        </div>
                    </div><br></br>
                    <div className='flex items-center'>
                        <button className='bottom-0 mt-6 bg-yellow-500 text-black p-2 text-xl rounded-lg mr-3' disabled={disableAdd ? true : false} onClick={(e) => newTicket(e)}>Agregar Tickets</button>
                        {disableAdd && <button className='bottom-0 mt-6 bg-yellow-500 text-black p-2 text-xl rounded-lg mr-3' onClick={(e) => updateTicketsFunc(e)}>Actualizar Tickets</button> }
                    </div>
                        <button type="submit" className='mt-3 flex items-center bg-yellow-500 p-3'><img src={updatePng.src} alt=""></img><p className='ml-3 text-xl text-black'>Actualizar evento</p></button>       
                    </div>
                )}
                    <div className="tickets-container relative h-[800px]">
                            {eventSelected.map((evS) => 
                            <div key={evS._id} className='tickets pr-2 h-[300px]'>
                                {evS.ticket.map((tck) => 
                                    <>
                                    <div className='mt-9' key={tck._id}>
                                        <div className='relative'>
                                        <p className='text-yellow-500'>Ticket #</p>
                                        <div className='mt-2'>
                                        <label>Precio:</label>
                                        <input className='rounded-lg bg-slate-950 p-1 w-[150px]' type="number" value={tck.price} onChange={(e) => setPrice(e.target.value)}></input>
                                        </div>
                                        <div className='mt-2'>
                                        <label>Categoria:</label>
                                        <input className='rounded-lg ml-6 bg-slate-950 p-1 w-[150px]' type="text" name="category" value={tck.category} onChange={(e) => setCategory(e.target.value)}></input>
                                        </div>
                                        <div className='mt-2'>
                                        <label>Cantidad:</label>
                                        <input className='rounded-lg ml-1 bg-slate-950 p-1 w-[150px]' type="number" value={tck.quantity} onChange={(e) => setQuantity(e.target.value)}></input>
                                        </div>
                                        <div className='flex items-center mt-2'>
                                        <label>Visible:</label>
                                        <input className='rounded-lg bg-slate-950 w-[30px]' type="checkbox" value={tck.visible} onChange={(e) => setVisible(e.target.value)}></input>
                                        </div>
                                        </div>
                                    </div>
                                     </>
                                    )}
                                    {[...Array(newTicketState)].map((index) => 
                                        <>
                                            <div className='mt-9' key={index}>
                                                <div className='relative'>
                                                <p className='text-yellow-500'>Ticket #{index + 1}</p>
                                                <div className='mt-2'>
                                                <label>Precio:</label>
                                                <input className='rounded-lg bg-slate-950 p-1 w-[150px]' type="number" onChange={(e) => setPrice(e.target.value)}></input>
                                                </div>
                                                <div className='mt-2'>
                                                <label>Categoria:</label>
                                                <input className='rounded-lg ml-6 bg-slate-950 p-1 w-[150px]' type="text" name="category"  onChange={(e) => setCategory(e.target.value)}></input>
                                                </div>
                                                <div className='mt-2'>
                                                <label>Cantidad:</label>
                                                <input className='rounded-lg ml-1 bg-slate-950 p-1 w-[150px]' type="number" onChange={(e) => setQuantity(e.target.value)}></input>
                                                </div>
                                                <div className='flex items-center mt-2'>
                                                <label>Visible:</label>
                                                <input className='rounded-lg bg-slate-950 w-[30px]' type="checkbox" onChange={(e) => setVisible(e.target.value)}></input>
                                                </div>
                                                </div>
                                            </div>
                                        </>
                                    )}
                            </div>)}        
                    </div>
                </div>
            </form>
        </div>
    </>
)
}

export default UpdateEvent