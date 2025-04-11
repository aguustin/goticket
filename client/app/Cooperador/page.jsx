"use client"
import './cooperador.css'
import pruebaPng from '@/app/assets/prueba.jpg'
import { useContext, useEffect, useState } from 'react'
import AppContext from '../context/appContext'
import { listRequest, loginRequest, sendEmailRequest } from '../api/userApi'
import EmailQrCode from '../components/Qrcode/page'

const Cooperador = () => {
    const {userInfo} = useContext(AppContext)
    const [openSendForm, setOpenSendForm] = useState(false)
    const [listCortesyTck, setListCortesyTck] = useState([])
    const [tickets, setTickets] = useState(0)
    const [email, setEmail] = useState('')
    const [qrData, setQrData] = useState(null);

    useEffect(() => {
        const getCortesyTcKFunc = async () => {
            const res = await listRequest(userInfo._id)
            console.log("getlist: ", res.data)
            setListCortesyTck(res.data)
        }

        if(qrData){
            console.log('Updated qrData:', qrData);
            // You can also trigger any side effects here, like sending the QR code, etc.
        }
        
        getCortesyTcKFunc()
    }, [userInfo, qrData])


    const sendQrCode = async (e, eventName, category) => {
        e.preventDefault()
        const email = e.target.elements.email.value
        const tickets = e.target.elements.tickets.value
        setQrData({
            email,
            eventName,
            category,
            tickets
        });
        console.log(qrData)

        await sendEmailRequest(qrData) //quedo aca
    }
   
    const SendForm = () => {
        return(
            <div className="fixed overflow-x-auto shadow-md sm:rounded-lg mx-auto" >
            
                <table>

                     <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                                    <tr>
                                                        <th scope="col" className="px-6 py-3">
                                                            Product name
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Color
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Category
                                                        </th>
                                                        <th scope="col" className="px-6 py-3">
                                                            Price
                                                        </th>
                                                     
                                                    </tr>
                                                </thead>
                </table>
                        {listCortesyTck.map((lct) => 
                            lct.eventHelper.map((lctEv) => 
                                lctEv.ticketsToSend.map((tts) => 
                                    <>
                                    <form onSubmit={(e) => sendQrCode(e, tts.eventName, tts.category)}>
                                        <div className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 border-gray-200 hover:bg-gray-50 dark:hover:bg-blue-900 hover:cursor-pointer">
                                
                                            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                           
                                                <tbody>
                                            <tr className="bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-600">
                                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                                                {tts.eventName}
                                            </th>
                                            <td className="px-6 py-4">
                                                {tts.category}
                                            </td>
                                            <td className="px-6 py-4">
                                                <input className='p-2 bg-slate-950 text-white' type="text" name="email" placeholder="example@mail.com"></input>
                                            </td>
                                            <td className="px-6 py-4">
                                                <input className='p-2 bg-slate-950 text-white' type="number" name="tickets" placeholder="0" ></input>
                                            </td>
                                            <td className="px-6 py-4 text-right">
                                                <button className="font-medium text-blue-600 dark:text-blue-500 hover:underline" type="submit">Enviar</button>
                                            </td>
            </tr>
        </tbody>
    </table>
                                        </div>
                                    </form>
                                    </>
                                )
                            )
                        )}
                  
           
                {qrData && <EmailQrCode email={qrData.email} subject={qrData.subject} body={qrData.body} />}
            </div>

        )
    }

    return(
         <div className="p-12 pt-24 flex flex-wrap bg-slate-900 w-screen h-full">
            {openSendForm &&
            <>
                <div className='back-div fixed z-90 bg-black top-0 bottom-0 left-0 right-0'></div>
                <SendForm/>
            </>}
            <div className='p-3 bg-slate-950 rounded-lg w-[350px] text-center'>
                <div className='mb-3'>
                    <p className='text-2xl'>Nombre del evento en el que coopera</p>
                </div>
                <div>
                    <img src={pruebaPng.src} alt=""></img>
                </div>
                <div>
                    <p className='text-xl mt-5'>Fecha: 17/02/1994</p>
                    <div className='flex items-center justify-between pl-6 pr-6 mt-5 mb-3'>
                        <button className='p-3 bg-yellow-500 w-[120px] rounded-lg text-black font-s' onClick={() => setOpenSendForm(!openSendForm)}>Cortesia</button>
                        <button className='p-3 bg-slate-700 w-[120px] rounded-lg'>Salir</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cooperador