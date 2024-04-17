import path from 'path';
import os from 'os';

import SQLite from 'better-sqlite3';
import { Kysely, SqliteDialect } from 'kysely';

import type { Todo } from '$lib/schemas';

const dbPath = path.join(os.userInfo().homedir, 'AppData', 'Local', 'todos.sqlite3');
const dialect = new SqliteDialect({
	database: new SQLite(dbPath)
});

interface Database {
	todo: Todo;
}

export const db = new Kysely<Database>({
	dialect
});

class TodoService {

	async get(): Promise<Todo[]> {
		return await db.selectFrom('todo').selectAll().execute();
	}

	async getById(id: number): Promise<Todo | undefined> {
		return await db.selectFrom('todo').selectAll().where('id', '=', id).executeTakeFirst();
	}

	async add(todo: Omit<Todo, 'id'>): Promise<void> {
		await db
			.insertInto('todo')
			.values({
				description: todo.description,
				checked: Number(todo.checked)
			})
			.execute();
	}

	async update(id: number, todo: Partial<Omit<Todo, 'id'>>): Promise<void> {
		await db
			.updateTable('todo')
			.set({
				checked: Number(todo.checked)
			})
			.where('id', '=', id)
			.execute();
	}

	async remove(id: number): Promise<void> {
		await db.deleteFrom('todo').where('id', '=', id).execute();
	}

}

export const todoService: TodoService = new TodoService();