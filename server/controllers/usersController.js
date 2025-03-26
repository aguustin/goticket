import eventsModel from "../models/eventsModel.js"
import users from "../models/usersModel.js"
import bcrypt from "bcrypt"

export const signUpController = async (req, res) => {
    const {name, lastname, mail, password, confirmPassword, country, rol} = req.body
    console.log(req.body)
    if(password === confirmPassword){
        let findUser = await users.find({mail: mail})
        if(findUser.length > 0){
            res.status(200).json(2)
        }else{
            let salt = 10
            const encryptedPass = await bcrypt.hash(password, salt)
            const user = await users.create({
                name: name,
                lastname: lastname,
                mail: mail,
                password: encryptedPass,
                country: country,
                rol:rol
            })
            res.status(200).json(user)
        }
    }
}


export const signInController = async (req, res) => {
    const {mail, password} = req.body
    const getCredentials = await users.find({mail: mail})
    const decryptPass = await bcrypt.compare(password, getCredentials[0].password)
    decryptPass ? res.send(getCredentials) :  res.status(200).json(2)
}


export const allUsersController = async (req, res) => {
    const getAllUsers = await users.find()
    res.send(getAllUsers)
}


export const addToFavoritesController = async (req, res) => {
        const {userId, eventId} = req.body
        console.log(req.body)
        await users.updateOne(
            {_id: userId},
            {
                $addToSet:{
                    favorites:[{
                        eventFavId:eventId
                    }]
                }
            }
        )
        res.sendStatus(200)
}

export const getMyFavoritesController = async (req, res) => {
    
    const getUser = await users.find({_id: req.params.userId})
    if(getUser.length > 0){
        const favEvents = getUser[0]?.favorites.map(fav => fav.eventFavId)
        const getFavEvents = await eventsModel.find({'_id': { $in : favEvents}})
        res.send(getFavEvents)
    }else{
        res.status(300).json(2)
    }

}

export const buyTicketController = async (req, res) => {
    const { userId, eventBuyedId,  status, tickets, cost, totalSelled, extractBuyedInfo } = req.body

    //console.log(req.body)

    const getUser = await users.find({_id: userId})

    /*if(getUser.length > 0){
        const eventIsOnList = await getUser[0].buys.some(buy => buy.eventBuyedId === eventBuyedId)
        if(eventIsOnList){
            res.status(200).json(2)
        }else{*/
        const arrayFilters = tickets.map((ticket, index) => ({
            [`elem${index}._id`]: ticket._id,  // Use a unique field name for each filter
          }));
        const setFields = tickets.reduce((acc, ticket, index) => {
            acc[`ticket.$[elem${index}].sellsByCat`] = ticket.sellsByCat;
            return acc;
        }, {});
        
        if(getUser.length > 0){
            await users.updateOne(
                {_id: userId},
                {
                    $addToSet:{
                        buys:[{
                            eventBuyedId: eventBuyedId, 
                            //eventDate: Date.now(), 
                            //buyedEventImg: buyedEventImg, 
                            //buyedEventName: buyedEventName, 
                            //buyedEventAdress: buyedEventAdress,
                            status: status, 
                            tickets:extractBuyedInfo,
                            cost: cost,
                            qrData: 'en espera'//qrData
                        }]
                    }
                }
            )
            await eventsModel.updateOne(
                { _id: eventBuyedId },  // Match the event by its ID
                {
                    $inc: {
                    sells: totalSelled,  // Increment total sells
                    profits: cost,       // Increment total profits
                    },
                    $set: setFields
                },
                {
                    arrayFilters,  // Array filters for each ticket
                }
            );
            await eventsModel.aggregate([
                 // Unwind buys array to work with each event buy
                { $unwind: "$buys" },

                // Unwind tickets array to work with individual tickets
                { $unwind: "$buys.tickets" },

                // Group by parent document _id and ticket category, summing the "waiting" field
                {
                    $group: {
                    _id: { documentId: "$eventBuyedId", category: "$buys.tickets.category" },  // Group by parent document _id and ticket category
                    totalWaiting: { $sum: "$buys.tickets.waiting" },  // Sum the waiting values
                    totalQuantity: { $first: "$buys.tickets.quantity" }  // Get the quantity for the category (we use $first since quantity is the same for all tickets in that category)
                    }
                },

                // Subtract waiting tickets from total quantity
                {
                    $project: {
                    documentId: "$eventBuyedId.documentId",  // Include the parent document _id
                    category: "$eventBuyedId.category",      // Include the ticket category
                    remainingTickets: { 
                        $subtract: ["$totalQuantity", "$totalWaiting"]  // Subtract waiting tickets from the total quantity
                    },
                    _id: 0                         // Remove the internal _id field
                    }
                },

                // Sort by document _id and category if needed
                { $sort: { documentId: 1, category: 1 } }
            ])

            await eventsModel.updateMany(
                {
                  "buys.eventBuyedId": { $in: eventBuyedId}
                },
                {
                  $set: {
                    "buys.$[eventBuyedId].tickets.$[].waiting": 0
                  }
                },
                {
                  arrayFilters: [
                    { "ticket.waiting": { $gte: 0 } }
                  ]
                }
              );
            res.status(200).json(1)
        }else{
            res.status(300).json('El usuario no existe')
        }
    //}
}
