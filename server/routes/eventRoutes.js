import { Router } from "express";
import { createEventController, deleteEventController, getAllEventsController, getEventByCategoryController, getEventById, getMyEventsController, updateMyEventController } from "../controllers/eventsController.js";
import { upload } from "../middleware/multer.js";

const route = Router()

route.post('/createEvent', upload.single('eventImg'), createEventController)

route.get('/allEvents', getAllEventsController)

route.post('/getEventById', getEventById)

route.post('/getEventByCategory', getEventByCategoryController)

route.post('/getMyEvents', getMyEventsController)

route.post('/updateMyEvent', upload.single('eventImg'), updateMyEventController)

route.post('/deleteEvent', deleteEventController)

export default route