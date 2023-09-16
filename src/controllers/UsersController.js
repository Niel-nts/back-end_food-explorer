const { hash } = require("bcryptjs")
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

        const hashedPassword = await hash(password, 8)

        await database.run("insert into users (name, email, password) values (?, ?, ?)", [name, email, password])

        return response.status(201).json()
    }

    async update (request, response){
        const {name, email} = request.body
        const {id} = request.params

        const database = await sqliteConnection()
        const user = await database.get("select * from users where id = (?)", [id])

        if(!user){
            throw new AppError("Usuário não encontrado")
        }

        const userWithUpdateEmail = await database.get("select * from users where email = (?)", [email])

        if(userWithUpdateEmail && userWithUpdateEmail.id != user.id){
            throw new AppError("Este email está em uso")
        }

        user.name = name
        user.email = email

        await database.run(`
            updata users set 
            name = ?,
            email = ?,
            password = ?,
            update_at = datetime('now')
            where id = ?`,
            [user.name, user.email, user.password, id]
        )

        return response.json()
    }
}

module.exports = UsersController