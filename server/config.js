import dotenv from "dotenv"
dotenv.config()

export const port = process.env.port
export const mongo_uri = process.env.mongo_uri