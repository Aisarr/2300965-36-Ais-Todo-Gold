const knex = require('../config/knex');
const { repeatTodo } = require('../models/repatTodo.model')


const createTodo = async (req, res) => {
    try {
        const body = req.body;
        const addedTodo = {
            title: body.title,
            description: body.description,
            due_date: body.due_date,
            repeat: body.repeat
        }
        const todo = await knex('todos').insert(addedTodo)
        if(body.repeat === 'everyMinute' || 'daily' || 'weekdays' || 'weekly' || 'monthly' ) {
            await repeatTodo(addedTodo);
        }
        const data = {
            msg: `a todo has been created`,
            todo: addedTodo
        }
        res.status(201).json(data);
    } catch (error) {
        console.error('error creating todo:', error);
        res.status(500).json({ error: 'error occured while creating the todo'});
    }
}
const editTodo = async (req, res) => {
    try{
        const body = req.body
        const id = req.params['id']
        const updatedTodo = {
            title: body.title,
            description: body.description,
            due_date: body.due_date,
            repeat: body.repeat,
            status: body.status
        }
        const todo = await knex('todos').where('id', id).update(updatedTodo)
        const data = {
          msg: `todo with the id ${id} has been updated`,
          todo:  updatedTodo
        }
    res.status(201).json(data);
    }catch (error) {
        console.error('error editing todo:', error);
        res.status(500).json({ error: 'error occured while editing the todo'});
    }
}

const deleteTodo = async (req, res) => {
    try {
        const id = req.params["id"];
        const todo = await knex('todos').where("id", id).del()
        const msg = `todo with id ${id} has been deleted`;
        res.status(201).json(msg)
    } catch (error) {
        console.error('error deleting todo:', error);
        res.status(500).json({ error: 'error occured while deleting the todo'}); 
    }
}

const getTodo = async (_req, res) => {
    try {
        const todos = await knex('todos').select('*')
    res.status(200).json(todos);
    } catch (error) {
        console.error('error geting todos:', error);
        res.status(401).json({error: 'data not found'})
    }
}

const getTodoById = async (req, res) => {
    try {
        const id = req.params['id']
        const todo = await knex('todos').select('*').where('id', id)
    res.status(200).json(todo);
    } catch (error) {
        console.error('error geting the todo:', error);
        res.status(401).json({error: 'data not found'})
    }
}

module.exports = {
    createTodo,
    editTodo,
    deleteTodo,
    getTodo,
    getTodoById
}