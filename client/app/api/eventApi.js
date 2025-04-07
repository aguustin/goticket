import axios from "axios";

export const createEventRequest = (eventData) => axios.post('http://localhost:4000/createEvent/', eventData);

export const getAllEventsRequest = () => axios.get('http://localhost:4000/allEvents');

export const getSelectedEventRequest = (eventId) => axios.get(`http://localhost:4000/getEventById/${eventId}`)

export const getCreatedEventsRequest = (userId) => axios.get(`http://localhost:4000/getMyCreatedEvents/${userId}`)

export const updateMyEventRequest = (eventData) => axios.post('http://localhost:4000/updateMyEvent', eventData, {
    headers:{
        'Content-Type': 'multipart/form-data'
    }
})

export const getMyCreatedEventsRequest = (userId) => axios.get(`http://localhost:4000/getMyCreatedEvents/${userId}`)

export const deleteEventRequest = (data) => axios.post('http://localhost:4000/deleteEvent', data)

export const addHelperRequest = (email, ticketsFree, eventId) => axios.put(`http://localhost:4000/addHelper/${email}/${ticketsFree}/${eventId}`)