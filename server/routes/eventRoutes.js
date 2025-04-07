import { Router } from "express";
import { addHelperController, createEventController, deleteEventController, getAllEventsController, getEventByCategoryController, getEventById, getMyCreatedEventsController, updateMyEventController } from "../controllers/eventsController.js";
import { upload } from "../middleware/multer.js";

const route = Router()

route.post('/createEvent', upload.single('eventImg'), createEventController)

route.get('/allEvents', getAllEventsController)

route.get('/getEventById/:eventId', getEventById)

route.post('/getEventByCategory', getEventByCategoryController)

route.get('/getMyCreatedEvents/:userId', getMyCreatedEventsController)

route.post('/updateMyEvent', upload.single('eventImg'), updateMyEventController)

route.post('/deleteEvent', deleteEventController)

route.put('/addHelper/:email/:ticketsFree/:eventId', addHelperController) //meter qrFreeData

export default route