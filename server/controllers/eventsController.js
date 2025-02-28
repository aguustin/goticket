import cloudinary from "../lib/cloudinary.js";
import eventsModel from "../models/eventsModel.js"

export const createEventController = async (req, res) => {
    const { organizationId, eventName, eventAdress, eventCategory, tickets } = req.body;

    if (req.file) {
        try {
            // Using await to properly wait for Cloudinary upload
            const result = await cloudinary.uploader.upload(req.file.path, {
                resource_type: 'auto',
                folder: 'goticket'
            });

            // Create the event
            const createEvent = await eventsModel.create({
                eventImg: result.secure_url,
                organizationId,
                eventName,
                eventAdress,
                eventCategory,
                eventDescription,
                eventDate: Date.now(),
                ticket: [{
                    ...tickets
                }]
            });

            res.status(200).json(createEvent); // Sending the created event back
        } catch (error) {
            console.log(error); // Log any errors
            res.sendStatus(500); // Server error response
        }
    } else {
        res.status(400).json({ error: "No file uploaded" }); // If no file uploaded
    }
};

export const getAllEventsController = async (req, res) => {
    const getAllEvents = await eventsModel.find()

    res.send(getAllEvents)
}

export const getEventById = async (req, res) => {
    const {eventId} = req.body

    const getEvent = await eventsModel.find({_id: eventId})
    res.send(getEvent)
}

export const getEventByCategoryController = async (req, res) => {
    const {eventCategory} = req.body

    const getEvents = await eventsModel.find({category: eventCategory})
    res.send(getEvents)
}

export const getMyEventsController = async (req, res) => {
    const {userId} = req.body

    const getEvents = await eventsModel.find({_id: userId})
    res.send(getEvents)
}

export const updateMyEventController = async (req, res) => {
    const {eventId, eventName, eventAdress, eventCategory, tickets} = req.body
    console.log(eventId)

    if(req.file){
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto',
        folder: 'goticket'
    })
        
        await eventsModel.updateOne(
            {_id:eventId},
            {
                $set:{
                    eventImg: result.secure_url,
                    eventName,
                    eventAdress,
                    eventCategory,
                    eventDescription,
                    ticket:[{
                        ...tickets
                    }]
                }
            }
        )
    }else{
        await eventsModel.updateOne(
            {_id:eventId},
            {
                $set:{
                    eventName,
                    eventAdress,
                    eventCategory,
                    eventDescription,
                    ticket:[{
                        ...tickets
                    }]
                }
            }
        )
    }
    res.sendStatus(200)
}

export const deleteEventController = async (req, res) => {
    const {userId, eventId} = req.body

    const getEvent = await eventsModel({_id:eventId, organizationId: userId})
    if(getEvent.length > 0){
        await eventsModel.deleteOne({_id:eventId}) 
        res.sendStatus(200) 
    } 
     res.status(300).json(2)
}