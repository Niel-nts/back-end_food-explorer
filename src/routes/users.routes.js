const Router = require("express")
const UsersController = require("../controllers/UsersController")

const usersRoutes = Router()
const usersController = new UsersController()

const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

function myMiddleware(request, response, next){
    next()
}

usersRoutes.post("/", myMiddleware, usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)

module.exports = usersRoutes