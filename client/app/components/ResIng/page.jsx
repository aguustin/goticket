"use client"
import '@/app/components/ResIng/resing.css'
import { useContext, useState } from "react"
import googlePng from '@/app/assets/google.png'
import applePng from '@/app/assets/apple.png'
import closePng from '@/app/assets/close.png'
import UserContext from '@/app/context/userContext'
import { loginRequest, signUpRequest } from '@/app/api/userApi'
import { redirect } from 'next/navigation'

const ResIng = () => {

    const {setUserInfo, setShowResIng, signForm, setSignInForm} = useContext(UserContext)
    const [isChecked, setIsChecked] = useState(false)
    const [showMsg, setShowMsg] = useState(false)
    const [message, setMessage] = useState('')

    const login = async (e) => {
        e.preventDefault()
        const loginData = {
            mail:e.target.elements.mail.value, 
            password:e.target.elements.password.value
        }
        const res = await loginRequest(loginData)
        if(res.data.length > 0){
            setUserInfo(res.data)
            setShowResIng(false)
            redirect('/Home')
        }else{
            setShowMsg(true)
            setMessage('Las credenciales son incorrectas')
        }
    }

    const Message = () => {
        return(
            <p>{message}</p>
        )
    }

    const signUp = async (e) => {
        e.preventDefault()
        const password = e.target.elements.password.value
        const confirmPassword = e.target.elements.confirmPassword.value
        if(password === confirmPassword){
            const signUpData = {
                name:e.target.elements.name.value,
                lastname:e.target.elements.lastname.value,
                mail:e.target.elements.mail.value,
                password:e.target.elements.password.value,
                confirmPassword:e.target.elements.confirmPassword.value,
                country:e.target.elements.country.value,
                rol: isChecked ? 1 : 0
            }
            signUpRequest(signUpData);
        }else{
            setShowMsg(true)
            setMessage('Las contraseñas no coinciden')
        }
    }

  return(
            <div className='resing fixed flex items-center'>
            {signForm 
            ?
            <>
            <div className='back-color-div-forms fixed top-0 bottom-0 right-0 left-0'></div>
                <form className="forms fixed bg-slate-800 pt-6 pb-6 pl-8 pr-8 rounded-lg mx-auto mt-16 mb-10" style={{width:'500px'}} onSubmit={(e) => login(e)}>
                <button onClick={() => setShowResIng(false)} className="absolute right-6 top-5"><img src={closePng.src} alt=""></img></button>
                <div>
                    <h3 className="text-2xl mb-4">Ingresa tu cuenta</h3>
                </div>
                <div className="form-group w-full mt-5 mb-5">
                    <label className="text-white">Tu mail</label>
                    <input type="email" placeholder="ejemplo@gmail.com" className="bg-slate-700 p-2 rounded-lg w-full" name="mail"></input>
                </div>
                <div className="form-group w-full mt-5 mb-5">
                    <label className="text-white">Contraseña</label>
                    <input type="password" placeholder="******" className="bg-slate-700 p-2 rounded-lg w-full" name="password"></input>
                </div>
                <button type="submit" className="loginb bg-blue-800 text-white pt-3 pb-3 w-full rounded-lg mb-6 mt-3">Entrar</button>
                <div className="flex items-center">
                <p className="text-slate-400">Ya tienes cuenta?</p>
                <button className="text-sky-500 ml-2" onClick={() => setSignInForm(false)}>Registrate aqui</button>
                </div>
            </form>
            </>
            :
            <>
            <div className='back-color-div-forms fixed top-0 bottom-0 right-0 left-0'></div>
            {showMsg ? <Message/> : ''}
            <form className="forms fixed bg-slate-800 pt-6 pb-6 pl-8 pr-8 rounded-lg mt-6 mb-10" style={{width:'500px'}} onSubmit={(e) => signUp(e)}>
             <button onClick={() => setShowResIng(false)} className="absolute right-6 top-5"><img src={closePng.src} alt=""></img></button>
               <div>
                   <h3 className="text-2xl mb-4">Crea tu cuenta</h3>
               </div>
               <div className="flex items-center justify-between mb-4">
                   <button style={{border: '1px solid gray'}} className="flex items-center mx-3 text-slate-400 p-3 rounded-lg text-sm"><img src={googlePng.src} alt="" className="mr-3"></img>Registrate con Google</button>
                   <button style={{border: '1px solid gray'}} className="flex items-center mx-3 text-slate-400 p-3 rounded-lg text-sm"><img src={applePng.src} alt="" className="mr-3"></img>Registrate con Apple</button>
               </div>
               <div className="text-center">
                 <p className=" text-slate-400">or</p>
               </div>
               <div className="form-group w-full mt-5 mb-5">
                   <label className="text-white">Escribe tu nombre</label>
                   <input type="text" className="bg-slate-700 p-2 rounded-lg w-full" name="name"></input>
               </div>
               <div className="form-group w-full mt-5 mb-5">
                   <label className="text-white">Escribe tu apellido</label>
                   <input type="text" className="bg-slate-700 p-2 rounded-lg w-full" name="lastname"></input>
               </div>
               <div className="form-group w-full mt-5 mb-5">
                   <label className="text-white">Tu mail</label>
                   <input type="email" placeholder="ejemplo@gmail.com" className="bg-slate-700 p-2 rounded-lg w-full" name="mail"></input>
               </div>
               <div className="form-group w-full mt-5 mb-5">
                   <label className="text-white">Contraseña</label>
                   <input type="password" placeholder="Contraseña" className="bg-slate-700 p-2 rounded-lg w-full" name="password"></input>
               </div>
               <div className="form-group w-full mt-5 mb-5">
                   <label className="text-white">Repetir Contraseña</label>
                   <input type="password" placeholder="Escribe tu contraseña nuevamente" className="bg-slate-700 p-2 rounded-lg w-full" name="confirmPassword"></input>
               </div>
               <div className="form-group w-full mt-5 mb-5">
                   <label className="text-white">Pais</label>
                   <input type="text" placeholder="Ej: Argentina" className="bg-slate-700 p-2 rounded-lg w-full" name="country"></input>
               </div>
               <div className="form-group flex w-auto mt-7 mb-5">
                   <label className="text-white underline">¿Eres productor de eventos?</label>
                   <input id="rolChecked" type="checkbox" className="bg-slate-700 ml-3" name="rol" onChange={() => setIsChecked(!isChecked)} value={isChecked} style={{width:'20px'}}></input>
               </div>
               <button type="submit" className="loginb bg-blue-800 text-white pt-3 pb-3 w-full rounded-lg mb-6 mt-3">Crear cuenta</button>
               <div className="flex items-center">
                 <p className="text-white">Ya tienes cuenta?</p>
                 <button className="text-sky-500 ml-2" onClick={() => setSignInForm(true)}>Ingresar aqui</button>
               </div>
             </form>
             </>
            } 
           </div>
         )
}

export default ResIng