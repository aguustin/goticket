import axios from "axios";

export const createEventRequest = (eventData) => axios.post('http://localhost:4000/createEvent/', eventData);