import  mongoose from "mongoose";

const userSchema = mongoose.Schema({
    name: {type:String},
    lastname: {type:String},
    mail: {type:String},
    password: {type:String},
    country:{type:String},
    rol:{type:Number},
    buys:[{
        eventBuyedId:{type: String},
        eventDate:{type:String},
        buyedEventImg:{type:String},
        buyedEventName:{type:String},
        buyedEventAdress:{type:String},
        status:{type:Number},
        buyedDescription:{type:String},
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
    }]

    /*organizationId: {type:String},
    eventImg:{type:String},
    eventName:{type:String},
    eventAdress:{type:String},
    eventCategory:{type:Number},
	eventDescription:{type:String},
	eventDate:{type:String},
    qrGeneration:{type:String},
	ticket:[{
		price:{type:String},
		category:{type:String},
		quantity:{type:Number},
		visible:{type:Number}
	}],
	review:[{
		userImg:{type:String},
		name:{type:String},
		lastname:{type:String},
		note:{type:Number},
		reviewDescription:{type:String}
	}]*/
})

export default mongoose.model('user', userSchema)