import mongoose from "mongoose";
import cloudinary from "../lib/cloudinary.js";
import eventsModel from "../models/eventsModel.js"
import usersModel from "../models/usersModel.js";

export const createEventController = async (req, res) => {
    const { eventId, organizationId, eventName, eventAdress, eventCategory, eventDescription, price, category, quantity, visible, ticketsFree } = req.body;
    console.log(req.body)
    console.log(req.file)

    if (req.file) {
        try {
            if(eventId && mongoose.Types.ObjectId.isValid(eventId)){  
                const passEveToId = new mongoose.Types.ObjectId(organizationId)
                console.log(passEveToId)
                await eventsModel.updateOne(
                    {_id: eventId},
                    {
                        $addToSet:{
                            ticket:[{
                                price: price,
                                category: category,
                                quantity: quantity,
                                waiting:0,
		                        sellsByCat:0,
                                visible: visible,
                                ticketsFree: ticketsFree
                            }]
                        }
                    }
                )
                res.status(200).json(2)
            }else{
                    // Using await to properly wait for Cloudinary upload
                    const result = await cloudinary.uploader.upload(req.file.path, {
                        transformation: [
                            { width: 350, height: 350, crop: "scale" }
                        ],
                        resource_type: 'auto',
                        folder: 'goticket'
                    });
                    
                    // ACORDATE DE HACER LA GENERACION DEL QR Y METERLA EN EL MODELO DIOOOS
                    const newEvent = await eventsModel.create({	
                        organizationId: organizationId,
                        eventImg: result.secure_url,
                        eventName: eventName,
                        eventAdress: eventAdress,
                        eventCategory: eventCategory,
                        eventDescription: eventDescription,
                        eventDate: Date.now(),
                        sells: 0,
                        profits: 0,
                        serviceCost: 5
                        /*ticket: [{
                            /*price:price,
                            category:category,
                            quantity:quantity,
                            waiting:0,
		                    sellsByCat:0,
                            visible:visible
                        }]*/
                    });
                    console.log(organizationId, ' ', newEvent._id)
                    await usersModel.updateOne(
                        {_id: organizationId},
                        {
                            $addToSet:{
                                createdEvents:[{
                                    eventId: newEvent._id
                                }]
                            }
                        }
                    )
                    res.status(200).json(newEvent); // Sending the created event back
            }
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
    const {eventId} = req.params
    console.log('parametro', eventId)
    const getEvent = await eventsModel.find({_id: eventId})
    res.send(getEvent)
}

export const getEventByCategoryController = async (req, res) => {
    const {eventCategory} = req.body

    const getEvents = await eventsModel.find({category: eventCategory})
    res.send(getEvents)
}

export const getMyCreatedEventsController = async (req, res) => {
    const {userId} = req.params
    console.log(userId)
    const getEvents = await eventsModel.find({organizationId: userId})
    console.log(getEvents)
    res.send(getEvents)
}

export const updateMyEventController = async (req, res) => {
    //const {eventSelected} = req.body
    const eventSelected = JSON.parse(req.body.eventSelected)

    if(req.file){
      const result = await cloudinary.uploader.upload(req.file.path, {
        resource_type: 'auto',
        folder: 'goticket'
    })
        
        await eventsModel.updateOne(
            {_id:eventSelected[0]._id},
            {
                $set:{
                    eventImg: result.secure_url,
                    eventName: eventSelected[0]?.eventName,
                    eventAdress: eventSelected[0]?.eventAdress,
                    eventCategory: eventSelected[0]?.eventCategory,
                    eventDescription: eventSelected[0]?.eventDescription,
                    ticket: eventSelected[0]?.ticket
                }
            }
        )
    }else{
        await eventsModel.updateOne(
            {_id:eventSelected[0]?._id},
            {
                $set:{
                    eventName: eventSelected[0]?.eventName,
                    eventAdress: eventSelected[0]?.eventAdress,
                    eventCategory: eventSelected[0]?.eventCategory,
                    eventDescription: eventSelected[0]?.eventDescription,
                    ticket: eventSelected[0]?.ticket
                }
            }
        )
    }
    res.sendStatus(200)
}

export const deleteEventController = async (req, res) => {
    const {userId, eventId} = req.body
    console.log(userId, " ", eventId)
    const getEvent = await eventsModel({_id:eventId, organizationId: userId})
    console.log(getEvent)
    if(getEvent){
        await eventsModel.deleteOne({_id:eventId}) 
        res.status(200).json(1) 
    }else{
        res.status(300).json(2)
    } 
}

export const addFreeTicketsController = async (req, res) => {
    const {email, ticketsFree, eventId} = req.params

    const findUser = await usersModel.find({mail: email})

    if(findUser.length > 0){
        await eventsModel.updateOne(
            {_id: eventId},
            {
                $addToSet:{
                    ticketsFree:[{
                        email:email,
                        quantity: ticketsFree,
                        qrFreeData:{type:String}
                    }]
                }
            }
        )
    }else{
        console.log('funciona mal!!')
    }
  

    res.status(200).json(2)
}

export const sendFreeTicketController = async (req, res) => {
    const { eventId, mail, eventName, category, freeQuantity } = req.body;
  
    const user = await usersModel.findOne({ mail });

    const event = await eventsModel.findOne({_id: eventId})
  
    if (!user) return res.status(404).json({ error: 'User not found' });
  
    const eventIndex = user.eventHelper.findIndex(e => e.eventId === eventId);
  
    if (eventIndex !== -1) {
      const ticketIndex = user.eventHelper[eventIndex].ticketsToSend.findIndex(
        t => t.category === category
      );
  
      if (ticketIndex !== -1) {
        // ✅ Increment existing freeQuantity
        const path = `eventHelper.${eventIndex}.ticketsToSend.${ticketIndex}.freeQuantity`;
  
        await usersModel.updateOne(
          { mail },
          { $inc: { [path]: freeQuantity } }
        );

        const ticketIndexEV = event.ticket.findIndex(
            t => t.category === category
          );
          console.log(ticketIndexEV)

         const evpath = `ticket.${ticketIndexEV}.ticketsFree`;
      
          await eventsModel.updateOne(
              { _id: eventId },
              { 
                  $inc: 
                      { 
                          [evpath]: - freeQuantity
                      } 
              }
            );
  
        return res.status(200).json(3); // existing updated
      } else {
        // ➕ Add new category to existing event
        const path = `eventHelper.${eventIndex}.ticketsToSend`;
  
        await usersModel.updateOne(
          { mail },
          {
            $push: {
              [path]: {
                eventName: eventName,
                category,
                freeQuantity
              }
            }
          }
        );
  
        return res.status(200).json(4); // new category added
      }
    }
  
    // 📦 Add new event with category
  /*  await usersModel.updateOne(
      { mail },
      {
        $push: {
          eventHelper: {
            eventId,
            ticketsToSend: [
              {
                category,
                freeQuantity
              }
            ]
          }
        }
      }
    );
  
    res.status(200).json(2); // new event created*/
  };