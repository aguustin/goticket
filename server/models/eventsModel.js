import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
	organizationId: {type:String},
    eventImg:{type:String},
    eventName:{type:String},
    eventAdress:{type:String},
    eventCategory:{type:Number},
	eventDescription:{type:String},
	eventDate:{type:String},
	eventCountry:{type:String},
    qrGeneration:{type:String},
	sells:{type:Number},
	profits:{type:Number},
	ticket:[{
		price:{type:String},
		category:{type:String},
		quantity:{type:Number},
		waiting:{type:Number},
		sellsByCat:{type:Number},
		visible:{type:String}
	}],
	review:[{
		userImg:{type:String},
		name:{type:String},
		lastname:{type:String},
		note:{type:Number},
		reviewDescription:{type:String}
	}]
	//creo que la tabla para los pagos deberia ir aca (ya sea token o lo que sea que devuelvan las pasarelas de pago)
})

export default mongoose.model('event', eventSchema)