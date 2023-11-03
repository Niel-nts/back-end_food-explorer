const { Router } = require("express")
const tagsRoutes = Router()
const TagsController = require("../controllers/TagsController")
const tagsController = new TagsController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

function myMiddleware(request, response, next){
    next()
}

tagsRoutes.get("/:menu_id", ensureAuthenticated, tagsController.index)

module.exports = tagsRoutes