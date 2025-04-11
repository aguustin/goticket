import { Router } from "express";
import { addFreeTicketsController, createEventController, deleteEventController, getAllEventsController, getEventByCategoryController, getEventById, getMyCreatedEventsController, sendFreeTicketController, updateMyEventController } from "../controllers/eventsController.js";
import { upload } from "../middleware/multer.js";

const route = Router()

route.post('/createEvent', upload.single('eventImg'), createEventController)

route.get('/allEvents', getAllEventsController)

route.get('/getEventById/:eventId', getEventById)

route.post('/getEventByCategory', getEventByCategoryController)

route.get('/getMyCreatedEvents/:userId', getMyCreatedEventsController)

route.post('/updateMyEvent', upload.single('eventImg'), updateMyEventController)

route.post('/deleteEvent', deleteEventController)

route.post('/sendFreeTicket', sendFreeTicketController)

//route.put('/addFreeTickets/:email/:ticketsFree/:eventId', addFreeTicketsController) //meter qrFreeData

export default route