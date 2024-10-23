import { Knex } from "knex";
export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('users', function(table) {
        table.increments('id').primary()
        table.string('firstname').notNullable()
        table.string('lastname').notNullable()
        table.string('email').notNullable()
        table.string('password').notNullable()
        table.string('avatar').nullable()
        table.timestamps(true, true) // created_at. updated_at
     })
}


export async function down(knex: Knex): Promise<void> {
    return knex.schema.dropTable('users')
}

