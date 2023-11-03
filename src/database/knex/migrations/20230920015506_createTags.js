exports.up = knex => knex.schema.createTable("tags", table => {
    table.increments("id")
    table.text("name")
    table.integer("menu_id").references("id").inTable("menus").onDelete("cascade")
    table.integer("user_id").references("id").inTable("users")
})

exports.down = knex => knex.schema.dropTable("tags")
