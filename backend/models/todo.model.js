const knex = require('../config/knex');

class TodoModel {
    async add(body){
        const addTodo = {
            title: body.title,
            description: body.description,
            due_date: body.due_date,
            repeat: body.repeat
        }
        const addedTodo = await knex('todos')
        .insert(addTodo)
        .returning('*')
        return addedTodo[0]
    }

    async update(body, id){
        const updateTodo = {
            title: body.title,
            description: body.description,
            due_date: body.due_date,
            repeat: body.repeat,
            status: body.status
        }
        const updatedTodo = await knex('todos')
        .where('id', id)
        .update(updateTodo)
        .returning('*')
        return updatedTodo[0]
    }

    async delete(id){
        const deletedTodo = await knex('todos')
        .where("id", id)
        .returning('*')
        .del()
        return deletedTodo
    }

    async get(){
        const getAllTodos = await knex('todos')
        .select('*')
        return getAllTodos
    }

    async getById(id){
        const getTodo = await knex('todos')
        .select('*')
        .where('id', id)
        return getTodo[0]
    }
}

module.exports = TodoModel;