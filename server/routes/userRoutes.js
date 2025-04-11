import { Router } from "express";
import { addToFavoritesController, allUsersController, borrarUnUsuariocontroller, buyTicketController, getListController, getMyFavoritesController, sendEmailController, signInController, signUpController } from "../controllers/usersController.js";

const route = Router()

route.post('/signUpUser', signUpController)

route.post('/signInUser', signInController)

route.get('/allUsers', allUsersController)

route.post('/addFavorite', addToFavoritesController)

route.get('/getFavorites/:userId', getMyFavoritesController)

route.get('/getList/:userId', getListController)

route.post('/buyTicket', buyTicketController)

route.post('/deleteUser', borrarUnUsuariocontroller)

route.post('/sendEmail', sendEmailController)

export default route