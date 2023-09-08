const {responseOk, responseError} = require('../helper/response.helper')
const { repeatTodo } = require('../models/repeatTodo.model')
const TodoModel = require('../models/todo.model')

const model = new TodoModel


const createTodo = async (req, res) => {
    try {
        const body = req.body;
        const data = await model.add(body)
        if(body.repeat) {
            await repeatTodo(data);
        }
        res.status(201).json(responseOk(`a todo has been created`, data));
    } catch (error) {
        console.error('error creating todo:', error);
        res.status(500).json(responseError('error occured while creating the todo'));
    }
}
const editTodo = async (req, res) => {
    try {
        const body = req.body
        const id = req.params['id']
        const data = await model.update(body, id)
        if(body.repeat) {
            await repeatTodo(data)
        }
        res.status(201).json(responseOk(`todo with the id ${id} has been updated`, data));
    } catch (error) {
        console.error('error editing todo:', error);
        res.status(500).json(responseError('error occured while editing the todo'));
    }
}

const deleteTodo = async (req, res) => {
    try {
        const id = req.params["id"];
        const data = await model.delete(id)
        res.status(201).json(responseOk(`todo with id ${id} has been deleted`, data))
    } catch (error) {
        console.error('error deleting todo:', error);
        res.status(500).json({ error: 'error occured while deleting the todo'}); 
    }
}

const getTodo = async (_req, res) => {
    try {
        const data = await model.get()
        res.status(200).json(responseOk('success get all todos', data));
    } catch (error) {
        console.error('error geting todos:', error);
        res.status(401).json({error: 'data not found'})
    }
}

const getTodoById = async (req, res) => {
    try {
        const id = req.params['id']
        const data = await model.getById(id)
        res.status(200).json(responseOk(`success get todo with the id ${id}`, data));
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