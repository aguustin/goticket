import { Router } from "express";
import { addToFavoritesController, allUsersController, buyTicketController, getMyFavoritesController, signInController, signUpController } from "../controllers/usersController.js";

const route = Router()

route.post('/signUpUser', signUpController)

route.post('/signInUser', signInController)

route.get('/allUsers', allUsersController)

route.post('/addFavorite', addToFavoritesController)

route.get('/getFavorites/:userId', getMyFavoritesController)

route.post('/buyTicket', buyTicketController)

export default route