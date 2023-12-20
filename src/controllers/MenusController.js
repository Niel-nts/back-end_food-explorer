const knex = require("../database/knex")
const sqliteConnection = require("../database/sqlite")
const DiskStorage = require("../providers/diskStorage")

class MenusController{
    async create(request, response){
        const { title, description, tags, price, category } = request.body
        const user_id = request.user.id

        const menu_id = await knex("menus").insert({
            title,
            description,
            user_id,
            price,
            category,
        })

        if(tags){
            const tagsInsert = tags.map(name => {
                return {
                    menu_id: menu_id[0],
                    name,
                    user_id
                }
            })
            await knex("tags").insert(tagsInsert)
        }


        return response.json(menu_id)
    }

    async updateAvatar(request, response){
        const menu_id = request.params.id
        const avatarFilename = request.file.filename
        const diskStorage = new DiskStorage()
        
        const menu = await knex("menus").where({id: menu_id}).first()
        
        if(menu.avatar){
            await diskStorage.deleteFile(menu.avatar)
        }

        const fileName = await diskStorage.saveFile(avatarFilename)
        menu.avatar = fileName

        await knex("menus").update(menu).where({id: menu_id})

        return response.json()
    }

    async show(request, response){
        const {id} = request.params

        if(id == 'all'){
            const menus = await knex("menus")
            
            return response.json({
                menus
            })

        } else {
            const menu = await knex("menus").where({id}).first()
            const tags = await knex("tags").where({menu_id: id}).orderBy("name")
            
            return response.json({
                ...menu,
                tags
            })
        }
        
    }

    async delete(request, response){
        const {id} = request.params
        await knex("menus").where({id}).delete()

        return response.json()
    }

    async index(request, response){
        const {title} = request.query

        const menus = await knex("menus").where('menus.title', 'like', `%${title}%`)
        
        return response.json(menus)
    }

    async update(request, response){
        const {title, description, tags, price, category} = request.body
        const {id} = request.params
        const menu_id = id
        const user_id = request.user.id
      
        const database = await sqliteConnection()
        const menu = await database.get("select * from menus where id = (?)", [id])

        if(!menu){
            throw new AppError("Prato não encontrado")
        }
        
        await knex("menus").update(menu).where({id: menu_id})

        menu.title = title ?? menu.title
        menu.description = description ?? menu.description
        menu.price = price ?? menu.price
        menu.category = category ?? menu.category

        await database.run(`
            update menus set 
            title = ?,
            description = ?,
            price = ?,
            category = ?,
            updated_at = datetime('now')
            where id = ?`,
            [menu.title, menu.description, menu.price, menu.category, id]
        )

        await knex("tags").where({menu_id}).delete()

        const tagsInsert = tags.map(name => {
            return {
                menu_id: menu_id[0],
                name,
                user_id
            }
        })

        await knex("tags").insert(tagsInsert)
        
        return response.json()
    }
}

module.exports = MenusController;