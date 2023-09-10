import { dateFormat } from "./utils.js";

const sidebar = document.getElementById('side_nav');
const mainContainer = document.querySelector('.main-container');
const popup = document.getElementById('popupMenu');
const dateInput = document.querySelector('.date-input')
const inputTodo = document.querySelector('.input-todo');
const addButton = document.querySelector('.add-button');
const inputWrapper = document.querySelector('.input-wrapper')


export const showPopup = () => {
    popup.style.display = 'block';
}
export const removePopup = (event) => {
    if(!inputWrapper.contains(event.target)){
        popup.style.display = 'none'
    }
}
export const addSelectedToItems = (items) => {
    items.forEach((item) => {
        item.addEventListener('click', function () {
            items.forEach((li) => {
                li.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
}

export const removeSelectedWhenInput = (items) => {
    items.forEach(() => {
        dateInput.addEventListener('click', function () {
            items.forEach((li) => {
                li.classList.remove('selected');
            });
        });
    });
}

export const showSidebar = () => {
    if(sidebar.classList.contains('active') && mainContainer.classList.contains('active')){
        
        sidebar.classList.remove('active');
        mainContainer.classList.remove('active');
      }else{
          sidebar.classList.add('active');
          mainContainer.classList.add('active');
      }
}
export const checkTheBox = (event) => {
    const target = event.target;
    if (target.classList.contains('bi-check2')) {
        target.classList.toggle('complete')
    }
}
export const checkInput = () => {
    const inputValue = inputTodo.value.trim();
    
    if (inputValue === '') {
        addButton.disabled = true;
    } else {
        addButton.disabled = false;
    }
}

export const exitTodoDetails = () =>{
        const todoDetails = document.querySelector('.todo-details')
        todoDetails.classList.remove('active')
        mainContainer.classList.remove('active-right')
    } 

    export const openTodoDetails = (data) => {
        const title = data.title
        const due = new Date(data.due_date)
        const repeat = data.repeat
        const createdAt = new Date(data.created_at)
        const updatedAt = new Date (data.updated_at)
        const id = data.id
    
        const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

        const todoTitleInput = document.querySelector('.todo-title-input')
        todoTitleInput.setAttribute('value', title)
    
        const dueValue = document.querySelector('.due-value')
        dueValue.textContent = `${dayNames[due.getDay()]} ${monthNames[due.getMonth()]} ${due.getDate()} ${due.getFullYear()}`
    
        const repeatValue = document.querySelector('.repeat-value')
        repeatValue.textContent = repeat
    
        const createdAtValue = document.querySelector('.created-at')
        createdAtValue.textContent = `${dayNames[createdAt.getDay()]} ${monthNames[createdAt.getMonth()]} ${createdAt.getDate()} ${createdAt.getFullYear()}`
    
        const updatedAtValue = document.querySelector('.updated-at')
        updatedAtValue.textContent = `${dayNames[updatedAt.getDay()]} ${monthNames[updatedAt.getMonth()]} ${updatedAt.getDate()} ${updatedAt.getFullYear()}`
    
        const todoDetails = document.querySelector('.todo-details')
        todoDetails.setAttribute('id', id)
        todoDetails.classList.add('active')
        mainContainer.classList.add('active-right')
    }
