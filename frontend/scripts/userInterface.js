import { dateFormat } from "./utils.js";
import { 
    handleUpdateTodo,
    handleDeleteTodo
 } from "./api.js";
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
    if (target.classList.contains('bi-check2') || target.classList.contains('inner-check-box')) {
        const todoDetails = document.querySelector('.todo-details.active')
        const id = target.id || todoDetails.id
        const checkboxes = document.querySelectorAll(`.id${id}`);
        
        checkboxes.forEach((checkbox) => {
            checkbox.classList.toggle('complete');
        });
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
    const description = data.description
    const status = data.status
    
    

    const todoDetails = document.querySelector('.todo-details')
    todoDetails.id = id

    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

    const innerCheckBox = document.querySelector('.inner-check-box')
    innerCheckBox.classList.add(`id${id}`)
    
    const todoTitleInput = document.querySelector('.todo-title-input')
    todoTitleInput.value = title
    todoTitleInput.classList.add(`id${id}`)
    todoTitleInput.setAttribute('id', id)
    
    if(status === true){
        innerCheckBox.classList.add('complete')
        todoTitleInput.classList.add('complete')
    }
    const dueValue = document.querySelector('.due-value')
    dueValue.textContent = `${dayNames[due.getDay()]}, ${monthNames[due.getMonth()]} ${due.getDate()} ${due.getFullYear()}`

    const repeatValue = document.querySelector('.repeat-value')
    repeatValue.textContent = repeat

    const inputDescription = document.querySelector('.input-description-value')
    if(description !== null){
        inputDescription.value = description
    }  else{
        inputDescription.value = inputDescription.placeholder
    }

    const createdAtValue = document.querySelector('.created-at')
    createdAtValue.textContent = ` created on ${dayNames[createdAt.getDay()]}, ${monthNames[createdAt.getMonth()]} ${createdAt.getDate()} ${createdAt.getFullYear()}`

    const updatedAtValue = document.querySelector('.updated-at')
    updatedAtValue.textContent = `Last update at ${updatedAt.getHours()}:${updatedAt.getMinutes()} ${dayNames[updatedAt.getDay()]}, ${monthNames[updatedAt.getMonth()]} ${updatedAt.getDate()}`

    todoDetails.classList.add('active')
    mainContainer.classList.add('active-right')
}

export const editTodoDetails = (event) => {
    const todoDetails = document.querySelector(`.todo-details`);
    const todoId = todoDetails.id;
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    
    if (event.key === 'Enter') {
        if (event.target.classList.contains('todo-title-input')) {
            const title = event.target.value;
            const data = {
                id: todoId,
                title: title
            };
            const todoTitleElement =document.querySelector(`.todo-title.id${todoId}`)
            todoTitleElement.textContent = title
            handleUpdateTodo(data);
        } else if (event.target.classList.contains('input-description-value')) {
            const description = event.target.value;
            const data = {
                id: todoId,
                description: description
            };
            handleUpdateTodo(data);
        } else if (event.target.classList.contains('date-input')) {
            const dueValue = dateFormat(event.target.value);
            const data = {
                id: todoId,
                due_date: dueValue
            };
            handleUpdateTodo(data);
        }
    }
}



export const updateStatus = (event) => {    
    const target = event.target;

    if (target.classList.contains('bi-check2') && !target.classList.contains('complete') && target.id) {
        const data = {
            id: target.id,
            status: false
        }
        handleUpdateTodo(data)
    }  
    if(target.classList.contains('bi-check2') && target.classList.contains('complete') && target.id){
        const data = {
            id: target.id,
            status: true
        }
        handleUpdateTodo(data)
    }
}

export const handleEnterKey = (event) =>{
    if (event.key === 'Enter') {
    
        event.preventDefault();
        editTodoDetails(event);
    }
}

export const deleteTodo = () => {
    const todoDetails = document.querySelector('.todo-details');
    const todoId = todoDetails.id;
    handleDeleteTodo(todoId)

}

export const removeDisplayedTodo = (id) => {
    const displayedTodo = document.getElementById(id)
    if(displayedTodo){
        displayedTodo.remove()
    }
    exitTodoDetails()
}

export const selectedDue = (event) => {
    const target = event.target
    const dueDateOptions = document.querySelector('.due-date-value');
    const currentDate = new Date();

    const timeOption = {
      Today: currentDate.setHours(20, 0, 0, 0),
      Tomorrow: currentDate.setDate(currentDate.getDate() + 1),
      Nextweek: currentDate.setDate(currentDate.getDate() + 7),
    };
    if(target.classList.contains('due-date-value')){
        if (target.classList.contains('selected')) {
          const selectedDueValue = document.querySelector('.due-date-value.selected').textContent;
          const dueDateInput = document.querySelector('.date-input');
          dueDateInput.value = dateFormat(timeOption[selectedDueValue.replace(/\s+/g, '')]);
        }
      };
  
    }