const {Router} = require("express")
const notesRoutes = Router()
const NotesController = require("../controllers/NotesController")
const notesController = new NotesController()
const ensureAuthenticated = require("../middlewares/ensureAuthenticated")

function myMiddleware(request, response, next){
    next()
}

notesRoutes.use(ensureAuthenticated)
notesRoutes.post("/:user_id", notesController.create)
notesRoutes.get("/", notesController.index)
notesRoutes.get("/:id", notesController.show)
notesRoutes.delete("/:id", notesController.delete)

module.exports = notesRoutes;