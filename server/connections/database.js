import mongoose from "mongoose"
import { mongo_uri } from "../config.js"

export const dbConnection = async () => {
    try{
        await mongoose.connect(mongo_uri)
    }catch(error){
        console.log(error)
    }
}