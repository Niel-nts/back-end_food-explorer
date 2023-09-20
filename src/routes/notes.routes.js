const {Router} = require("express")
const notesRoutes = Router()
const NotesController = require("../controllers/NotesController")
const notesController = new NotesController()

function myMiddleware(request, response, next){
    next()
}

notesRoutes.post("/:user_id", myMiddleware, notesController.create)
notesRoutes.get("/", myMiddleware, notesController.index)
notesRoutes.get("/:id", myMiddleware, notesController.show)
notesRoutes.delete("/:id", myMiddleware, notesController.delete)

module.exports = notesRoutes;