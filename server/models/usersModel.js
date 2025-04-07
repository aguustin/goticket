import  mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type:String},
    mail: {type:String},
    password: {type:String},
    country:{type:String},
    rol:{type:Number},
    buys:[{
        eventBuyedId:{type: String},
       /* eventDate:{type:String},
        buyedEventImg:{type:String},
        buyedEventName:{type:String},
        buyedEventAdress:{type:String},*/
        status:{type:Number},
        tickets:{type:Array},
        cost:{type:Number},
        qrData:{type:String},
    }],
    favorites:[{
        eventFavId:{type:String},
       /* eventFavImg:{type:String},
        eventFavName:{type:String},
        eventFavAddres:{type:String}*/
    }],
    createdEvents:[{
        eventId: {type:String}
    }],
    eventHelper:[{
        eventId:{type:String},
        qrticketsToSell:{type:String}
    }]
})

export default mongoose.model('user', userSchema)