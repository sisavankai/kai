import type { Knex } from "knex";


export async function up(knex: Knex): Promise<void> {
    return knex.schema.createTable('products', function(table) {
        table.increments('id').primary()
        table.string('name').notNullable()
        table.text('description').nullable()
        table.string('barcode').notNullable
        table.string('image').nullable()
        table.integer('price').notNullable()
        table.integer('category_id').unsigned().notNullable()
        table.integer('user_id').unsigned().notNullable()
        table.integer('status_id').unsigned().notNullable()
        table.timestamps(true, true) // created_at. updated_at
     })
}

export async function down(knex: Knex): Promise<void> {
}

