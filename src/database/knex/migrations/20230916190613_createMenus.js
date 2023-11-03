exports.up = knex => knex.schema.createTable("menus", table => {
    table.increments("id")
    table.text("title")
    table.text("description")
    table.text("category")
    table.text("avatar")
    table.decimal("price")
    table.integer("user_id").references("id").inTable("users")

    table.timestamp("created_at").default(knex.fn.now())
    table.timestamp("updated_at").default(knex.fn.now())
})

exports.down = knex => knex.schema.dropTable("menus")
