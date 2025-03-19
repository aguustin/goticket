import axios from "axios";

export const createEventRequest = (eventData) => axios.post('http://localhost:4000/createEvent/', eventData);

export const getAllEventsRequest = () => axios.get('http://localhost:4000/allEvents');

export const getSelectedEventRequest = (eventId) => axios.get(`http://localhost:4000/getEventById/${eventId}`)  