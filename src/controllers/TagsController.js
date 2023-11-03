const knex = require("../database/knex")

class TagsController {
    async index(request, response){
        const {menu_id} = request.params
        const tags = await knex("tags").where({menu_id}).groupBy("name")

        return response.json(tags)
    }
}

module.exports = TagsController