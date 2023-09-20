const { Router } = require("express")
const tagsRoutes = Router()
const TagsController = require("../controllers/TagsController")
const tagsController = new TagsController()

function myMiddleware(request, response, next){
    next()
}

tagsRoutes.get("/:user_id", myMiddleware, tagsController.index)

module.exports = tagsRoutes