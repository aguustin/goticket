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

export const buyEventController = async (req, res) => {
    const { userId, eventBuyedId, eventDate, buyedEventImg, buyedEventName, buyedEventAdress, status, buyedDescription, qrData } = req.body

    const getUser = await users.find({_id: userId})
    if(getUser.length > 0){
        const eventIsOnList = await getUser[0].buys.some(buy => buy.eventBuyedId === eventBuyedId)
        if(eventIsOnList){
            res.status(200).json(2)
        }else{
            await users.updateOne(
                {_id: userId},
                {
                    $addToSet:{
                        buys:[{
                            eventBuyedId: eventBuyedId, 
                            eventDate: Date.now(), 
                            buyedEventImg: buyedEventImg, 
                            buyedEventName: buyedEventName, 
                            buyedEventAdress: buyedEventAdress, 
                            status: status, 
                            buyedDescription: buyedDescription,
                            qrData: qrData
                        }]
                    }
                }
            )
            res.status(200).json(1)
        }
    }
    res.status(300).json('El usuario no existe')
}
