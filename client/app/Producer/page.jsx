'use client'
import { useContext, useState } from 'react';
import './producer.css';
import imageUploadPng from '@/app/assets/imageUpload.png';
import addTicketPng from '@/app/assets/addTicket.png';
import { addHelperRequest, createEventRequest } from '../api/eventApi';
import AppContext from '../context/appContext';
import Link from 'next/link';
import { useRouter } from "next/navigation"

const Producer = () => {

    const {userInfo, myEventState} = useContext(AppContext)
    const [nuevoTicket, setNuevoTicker] = useState(1)
    const [newHelper, setNewHelper] = useState(1)
    const [ticketsFree, setTicketsFree] = useState(0)
    const [price, setPrice] = useState(0)
    const [category, setCategory] = useState('')
    const [quantity, setQuantity] = useState(0)
    const [isCreated, setIsCreated] = useState(0)
    const [visible, setVisible] = useState()
    console.log('myEventState: ', myEventState)

    const newTicketFunc = async (e) => {
        e.preventDefault()
     
        /*if(isCreated._id <= 0 || price <= 0 || category.length <= 0 || quantity <= 0){
            console.log('poner mensaje de que tiene que rellenar los campos')
            return 0
        }*/
        const eventData = new FormData()

        if(price <= 0 || category.length <= 0 || quantity <= 0){
            eventData.append('eventId', isCreated._id)
            eventData.append('organizationId', userInfo._id)
            eventData.append('eventImg', e.target.elements.eventImg.files[0])
            eventData.append('eventName', e.target.elements.eventName.value)
            eventData.append('eventAdress', e.target.elements.eventAdress.value)
            eventData.append('eventDescription', e.target.elements.eventDescription.value)
            eventData.append('eventDate', e.target.elements.eventDate.value)
        }else{
            eventData.append('eventId', isCreated._id)
            eventData.append('organizationId', userInfo._id)
            eventData.append('eventImg', e.target.elements.eventImg.files[0])
            eventData.append('price', price)
            eventData.append('category', category)
            eventData.append('quantity', quantity)
            eventData.append('visible', visible)
            eventData.append('ticketsFree', ticketsFree)
            setNuevoTicker(nuevoTicket + 1)
            setTicketsFree(0)
        }
        
        setPrice(0)
        setCategory('')
        setQuantity(0)
        setVisible()

        const res = await createEventRequest(eventData)

        console.log(res.data);
        if(res.data === 2){
            console.log(isCreated)
            
        }else{
            setIsCreated(res.data)
        }
    }

    /*const sendFreeTickets = async (e, category) => {
        e.preventDefault()
        const freeTicketData = {
            eventId: isCreated._id,
            mail:email,
            category:category,
            freeQuantity:e.target.elements.freeQuantity.value,
        }
        const res = await freeTicketDataRequest(freeTicketData)
    }*/
      
    return(
        <>
        <div className="bg-slate-900 p-9 w-screen">
            <form encType="multipart/form-data" className="mx-auto mt-16 w-[900px]" onSubmit={(e) => newTicketFunc(e)}>
            <div className="flex justify-between">
                <div>
                    <label htmlFor="upload-file-event" className="custom-file-upload bg-slate-950"><img className='mx-auto' src={imageUploadPng.src}></img></label><br></br>
                    <input id="upload-file-event" type="file" name="eventImg" />
                    {/*isCreated.ticket?.map((innerState) => 
                    innerState.ticketsFree.length > 0 &&
                    <div>
                        <div>
                            <p>Tickets de cortesia:</p>
                            <input placeholder='Email' name="sendToEmail" onChange={(e) => setEmail(e.target.value)}></input>
                            <input placeholder='Cantidad de tickets' name="freeQuantity"></input>
                            <button onClick={(e) => sendFreeTickets(e, innerState.category)}>Enviar tickets</button>
                        </div>
                    </div>
                    )*/}
                </div>
                <div>
                    <div>
                        <label className="text-xl">Nombre del evento:</label><br></br>
                        <input className="rounded-lg bg-slate-950 p-1 w-[450px]" type="text" name="eventName"></input>
                    </div><br></br>
                    <div>
                        <label className="text-xl">Direccion:</label><br></br>
                        <input className="rounded-lg bg-slate-950 p-1 w-[450px]" type="text" name="eventAdress"></input>
                    </div><br></br>
                    <div>
                        <label className="text-xl">Descripcion (opcional):</label><br></br>
                        <input className="rounded-lg bg-slate-950 p-1 w-[450px]" type="text" name="eventDescription"></input>
                    </div><br></br>
                    <div>
                        <label className="text-xl">Fecha:</label><br></br>
                        <input className="rounded-lg bg-slate-950 p-1" type="date" name="eventDate"></input>
                    </div><br></br>
                        <button type="submit" className='mt-3 flex items-center'><img src={addTicketPng.src} alt=""></img><p className='ml-3 text-xl'>Crear evento</p></button>
                        {isCreated._id && <div className='tickets h-[300px]'>
                            {[...Array(nuevoTicket)].map((_, index) => (
                                <div className='mt-9' key={index}>
                                    <div className='relative'>
                                        <p className='text-yellow-500'>Ticket #{index + 1}</p>
                                        <div className='mt-2'>
                                            <label>Precio:</label>
                                            <input className='rounded-lg bg-slate-950 p-1 w-[150px]' type="number" onChange={(e) => setPrice(e.target.value)}></input>
                                        </div>
                                        <div className='mt-2'>
                                            <label>Categoria:</label>
                                            <input className='rounded-lg ml-6 bg-slate-950 p-1 w-[150px]' type="text" name="category" onChange={(e) => setCategory(e.target.value)}></input>
                                        </div>
                                        <div className='mt-2'>
                                            <label>Cantidad:</label>
                                            <input className='rounded-lg ml-1 bg-slate-950 p-1 w-[150px]' type="number" onChange={(e) => setQuantity(e.target.value)}></input>
                                        </div>
                                        <div className='mt-2'>
                                            <label>Tickets de cortesia:</label>
                                            <input className='rounded-lg ml-1 bg-slate-950 p-1 w-[150px]' type="number" onChange={(e) => setTicketsFree(e.target.value)}></input>
                                        </div>
                                        <div className='flex items-center mt-2'>
                                            <label>Visible:</label>
                                            <input className='rounded-lg bg-slate-950 w-[30px]' type="checkbox" onChange={(e) => setVisible(e.target.value)}></input>
                                        </div>
                                        <button className='absolute right-10 bottom-0 bg-yellow-500 text-black p-1 text-xl rounded-lg' type="submit">Agregar</button>
                                    </div>
                                </div>
                            ))}
                            <Link href="/MyEvents">Continuar</Link>                 
                        </div>}
                </div>
            </div>
            </form>
        </div>
        </>
    )
}

export default Producer;