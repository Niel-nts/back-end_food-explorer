const Router = require("express")
const UsersController = require("../controllers/UsersController")

const usersRoutes = Router()
const usersController = new UsersController()

function myMiddleware(request, response, next){
    next()
}

usersRoutes.post("/", myMiddleware, usersController.create)
usersRoutes.post("/:id", usersController.update)

module.exports = usersRoutes