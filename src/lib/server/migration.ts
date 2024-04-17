import type { Kysely } from 'kysely';

export async function up(db: Kysely<any>): Promise<void> {
	await db.schema
		.createTable('todo')
		.addColumn('id', 'integer', (col) => col.primaryKey())
		.addColumn('description', 'text', (col) => col.notNull())
		.addColumn('checked', 'integer')
		.execute()
}

export async function down(db: Kysely<any>): Promise<void> {
	await db.schema.dropTable('todo').execute()
}