const {Router} = require("express")
const menusRoutes = Router()
const MenusController = require("../controllers/MenusController")
const menusController = new MenusController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")
const multer = require("multer")
const uploadConfig = require("../configs/upload")
const upload = multer(uploadConfig.MULTER)

function myMiddleware(request, response, next){
    next()
}

menusRoutes.use(ensureAuthenticated)
menusRoutes.post("/", menusController.create)
menusRoutes.patch("/:id", upload.single("avatar"), menusController.updateAvatar)
menusRoutes.get("/", menusController.index)
menusRoutes.get("/:id", menusController.show)
menusRoutes.delete("/:id", menusController.delete)
menusRoutes.put("/:id", menusController.update)

module.exports = menusRoutes;