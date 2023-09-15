const AppError = require("../utils/AppError")
const sqliteConnection = require("../database/sqlite")
class UsersController {
    async create(request, response){
        const { name, email, password } = request.body;

        const database = await sqliteConnection()     
        
        const checkUserExists = await database.get('select * from users where email = (?)', [email])

        if(checkUserExists){
            throw new AppError("Este email ja está em uso")
        }

        await database.run("insert into users (name, email, password) values (?, ?, ?)", [name, email, password])

        return response.status(201).json()
    }
}

module.exports = UsersController