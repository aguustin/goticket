import axios from "axios";

export const signUpRequest = (signUpData) => axios.post('http://127.0.0.1:4000/signUpUser', signUpData)

export const loginRequest = (loginData) => axios.post('http://127.0.0.1:4000/signInUser', loginData)

export const buyTicketRequest = (buyData) => axios.post('http://127.0.0.1:4000/buyTicket', buyData)

export const addFavoriteRequest = (data) => axios.post('http://127.0.0.1:4000/addFavorite', data)

export const listRequest = (userId) => axios.get(`http://127.0.0.1:4000/getList/${userId}`)

export const sendEmailRequest = (qrData) => axios.post('http://127.0.0.1:4000/sendEmail', qrData)