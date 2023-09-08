import {
    showPopup,
    addSelectedToItems,
    removeSelectedWhenInput,
    showSidebar,
    checkTheBox,
    checkInput
} from './userInterface.js'

import {
    handleAddTodo,
    handleGetTodos
} from './api.js'


const listItems = document.querySelectorAll('.sidebar-body ul li');
const addButton = document.querySelector('.add-button');
const inputTodo = document.querySelector('.input-todo');
const sidebarToggleButton = document.querySelector('.open-button');
const repeatList = document.querySelectorAll('.repeat-dropdown li a')
const dueDateList = document.querySelectorAll('.due-date-dropdown li a')


document.addEventListener('DOMContentLoaded', function () {
       handleGetTodos()
       document.addEventListener('click',  checkTheBox)
       addButton.addEventListener('click', handleAddTodo);
       inputTodo.addEventListener('input', checkInput);
       inputTodo.addEventListener('click', showPopup);
       sidebarToggleButton.addEventListener('click', showSidebar);
       removeSelectedWhenInput(dueDateList)
       addSelectedToItems(listItems)
       addSelectedToItems(repeatList)
       addSelectedToItems(dueDateList)

});


    
    

