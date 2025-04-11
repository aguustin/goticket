import eventsModel from "../models/eventsModel.js"
import usersModel from "../models/usersModel.js";
import users from "../models/usersModel.js"
import bcrypt from "bcrypt"
import { v4 as uuidv4 } from 'uuid';
import nodemailer from 'nodemailer';
import QRCode from 'qrcode';

export const signUpController = async (req, res) => {
    const {name, mail, password, confirmPassword, rol} = req.body
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
                mail: mail,
                password: encryptedPass,
                rol:2
            })
            res.status(200).json(user)
        }
    }
}


export const signInController = async (req, res) => {
    const {mail, emailVerified, name, password} = req.body
    console.log(emailVerified)
    if(emailVerified === true){
        const getCredentials = await users.find({mail: mail})
        if(getCredentials.length > 0){
            return res.send(getCredentials)
        }else{
            let salt = 10
            const uidForPass = await uuidv4();
            const encryptedPass = await bcrypt.hash(uidForPass, salt)
            const user = await users.create({
                name: name,
                mail: mail,
                password: encryptedPass,
                rol:2
            })
            return res.status(200).json(user)
        }

    }
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
    const { userId, eventBuyedId,  status, tickets, cost, serviceCost, totalSelled, extractBuyedInfo } = req.body

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
            acc[`ticket.$[elem${index}].sellsByCat`] = (acc[`ticket.$[elem${index}].sellsByCat`] || 0) + ticket.sellsByCat;
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
                        serviceCost: serviceCost
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

export const getListController = async (req, res) => {
 
    const getList = await usersModel.find(
        {_id: req.params.userId}
    )

    return res.send(getList)
}

const transporter = nodemailer.createTransport({
    service: 'gmail', // or another email service
    auth: {
      user: 'agustin.molee@gmail.com',
      pass: 'jvgo tncm zrlg oujd', // use App Password if 2FA enabled
    },
  });

export  const sendEmailController = async (req, res) => {
        try {
          const { email, eventName, category, tickets } = req.body;
      
          const subject = `Tickets para evento: ${eventName}`;
          const body = `Categoría: ${category}\nCantidad de tickets: ${tickets}`;
          //const qrData = `${subject}\n${body}`; ESTO ANDA PERO CRREO QUE ES MUY PESADA LA INFO
          const event = await eventsModel.findOne({ eventName });
          if (!event) return res.status(404).json({ error: 'Event not found' });
          
          const user = await usersModel.findOne({ mail: email });
          if (!user) return res.status(404).json({ error: 'User not found' });
          
          const eventBuyedId = event._id.toString(); // or event.id
          
          // Check if user already has this event in their buys
          const existingBuy = user.buys.find(buy => buy.eventBuyedId === eventBuyedId);
            console.log(existingBuy.category)
            const transactionId = uuidv4()
          if (existingBuy) {
            // ✅ User already has this event — push new tickets
            await usersModel.updateOne(
              { mail: email, 'buys.eventBuyedId': eventBuyedId, 'buys.category': existingBuy.category},
              {
                $inc: {
                  'buys.$.tickets':  Number(tickets) ,
                }
              }
            );
          } else {
            await usersModel.updateOne(
              { mail: email },
              {
                $push: {
                  buys: {
                    eventBuyedId,
                    status: 1,
                    tickets: tickets,
                    category: category,
                    transactionId: transactionId
                  }
                }
              }
            );
          }
          
          const qrData = `http://127.0.0.1:4000/ticket/${transactionId}`;

      
          // Generate QR code as Data URL (base64 PNG)
          //const qrImage = await QRCode.toDataURL(qrData);  esto sirve genera el qr bien

          const qrImage = await QRCode.toDataURL(qrData, { 
            width: 400,       // higher resolution
            errorCorrectionLevel: 'H', // more robust
          });
      
          // Convert Data URL to Buffer
          const base64Data = qrImage.replace(/^data:image\/png;base64,/, '');
          const qrBuffer = Buffer.from(base64Data, 'base64');
      
          // Compose email
          const mailOptions = {
            from: 'your_email@gmail.com',
            to: email,
            subject,
            text: body,
            attachments: [
              {
                filename: 'ticket-qr.png',
                content: qrBuffer,
                contentType: 'image/png',
              },
            ],
          };
      
          // Send email
          await transporter.sendMail(mailOptions);
      
          res.status(200).json({ message: 'Email with QR sent successfully!' });
        } catch (error) {
          console.error('Error sending email with QR:', error);
          res.status(500).json({ error: 'Failed to send email' });
        }
};


export const borrarUnUsuariocontroller = async (req, res) => {
    await users.deleteOne({mail: "agustin.molee@gmail.com"})
    res.sendStatus(200)
}