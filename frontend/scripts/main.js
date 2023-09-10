import {
    showPopup,
    removePopup,
    addSelectedToItems,
    removeSelectedWhenInput,
    showSidebar,
    checkTheBox,
    checkInput,
    exitTodoDetails
} from './userInterface.js'

import {
    handleAddTodo,
    handleGetTodos,
    
} from './api.js'

import { getTodoId } from './utils.js';

    const exitButton = document.querySelector('.exit-button')
    const listItems = document.querySelectorAll('.sidebar-body ul li');
    const addButton = document.querySelector('.add-button');
    const inputTodo = document.querySelector('.input-todo');
    const sidebarToggleButton = document.querySelector('.open-button');
    const repeatList = document.querySelectorAll('.repeat-dropdown li a')
    const dueDateList = document.querySelectorAll('.due-date-dropdown li a')
    
    

    document.addEventListener('DOMContentLoaded', function () {
        handleGetTodos()
        document.addEventListener('click', getTodoId)
        document.addEventListener('click',  checkTheBox)
        document.addEventListener('click',  removePopup)
        addButton.addEventListener('click', handleAddTodo)
        inputTodo.addEventListener('input', checkInput)
        inputTodo.addEventListener('click', showPopup)
        sidebarToggleButton.addEventListener('click', showSidebar)
        exitButton.addEventListener('click', exitTodoDetails )
        removeSelectedWhenInput(dueDateList)
       addSelectedToItems(listItems)
       addSelectedToItems(repeatList)
       addSelectedToItems(dueDateList)

});


    
    

