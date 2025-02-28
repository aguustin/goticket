import express from "express"
import morgan from "morgan"
import { dbConnection } from "./connections/database.js"
import { port } from "./config.js"
import userRoutes from "./routes/userRoutes.js"
import eventRoutes from "./routes/eventRoutes.js"
import bodyParser from "body-parser"
import cors from 'cors'

dbConnection()

const app = express()
//settings
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
     // some legacy browsers (IE11, various SmartTVs) choke on 204
}


//middlewares
app.use(cors(corsOptions))
app.use(express.json())
app.use(express.text())
app.use(bodyParser.json())
app.use(express.urlencoded({extended: false}))
app.use(morgan('tiny'))

//routes
app.use(userRoutes)
app.use(eventRoutes)
//listening

app.listen(port, console.log(`corriendo en puerto: ${port}`))