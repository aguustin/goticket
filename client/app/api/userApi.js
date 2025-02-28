import axios from "axios";

export const signUpRequest = (signUpData) => axios.post('http://127.0.0.1:4000/signUpUser', signUpData)
export const loginRequest = (loginData) => axios.post('http://127.0.0.1:4000/signInUser', loginData)