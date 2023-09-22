const Router = require("express")
const UsersController = require("../controllers/UsersController")
const multer = require("multer")
const uploadConfig = require("../configs/upload")
const usersRoutes = Router()
const usersController = new UsersController()
const UsersAvatarController = require("../controllers/UserAvatarController")
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

const upload = multer(uploadConfig.MULTER)
const userAvatarController = new UsersAvatarController()

function myMiddleware(request, response, next){
    next()
}

usersRoutes.patch("/avatar", ensureAuthenticated, upload.single("avatar"), userAvatarController.update)
usersRoutes.post("/", myMiddleware, usersController.create)
usersRoutes.put("/", ensureAuthenticated, usersController.update)

module.exports = usersRoutes