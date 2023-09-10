import { handleGetTodoById } from "./api.js"

export const dateFormat = (inputDate) => {
    const date = new Date(inputDate)
    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    return `${year}-${month}-${day}`
}

 const generateTodoHTML = (data)=> {
    const todoDiv = document.createElement('div')
    todoDiv.classList.add('display-todo', 'd-flex')
    todoDiv.setAttribute('id', data.id)
    const checkBoxDiv = document.createElement('div')
    checkBoxDiv.classList.add('check-box', 'd-flex')
    
    const checkBoxIcons = document.createElement('span')
    checkBoxIcons.classList.add('check-box-icons')
    
    const squareIcon = document.createElement('i')
    squareIcon.classList.add('bi', 'bi-square')
  
    const checkIcon = document.createElement('i')
    checkIcon.classList.add('bi', 'bi-check2')
    
    checkBoxIcons.appendChild(squareIcon)
    checkBoxIcons.appendChild(checkIcon)
    checkBoxDiv.appendChild(checkBoxIcons)
    
    const todoDataDiv = document.createElement('div')
    todoDataDiv.classList.add('todo-datas')
    
    const viewButton = document.createElement('button')
    viewButton.classList.add('view-todo-details')
    
    const todoTitleSpan = document.createElement('span')
    todoTitleSpan.classList.add('todo-title')
    todoTitleSpan.setAttribute('id', data.id)
    
    
    todoTitleSpan.textContent = data.title
    
    viewButton.appendChild(todoTitleSpan)
    todoDataDiv.appendChild(viewButton)
    
    todoDiv.appendChild(checkBoxDiv)
    todoDiv.appendChild(todoDataDiv)
    
    return todoDiv;
}

export const appendNewTodoElement = (data) => {
    const todoList = document.getElementById('todoList')
    const todoDiv = generateTodoHTML(data)
    todoList.appendChild(todoDiv)
}

export const getTodoId = (event) => {
    const target = event.target;
    if (target.classList.contains('display-todo') || target.classList.contains('todo-title')){
        const id = target.id
        handleGetTodoById(id)
    }}

// export const openTodoDetails = (data) => {
//     const title = data.title
//     const due = data.due_date
//     const repeat = data.repeat
//     const createdAt = data.created_at
//     const updatedAt = data.updated_at
//     const id = data.id

//     const todoTitleInput = document.querySelector('.todo-title-input')
//     todoTitleInput.setAttribute('value', title)

//     const dueValue = document.querySelector('.due-value')
//     dueValue.textContent = dateFormat(due)

//     const repeatValue = document.querySelector('.repeat-value')
//     repeatValue.textContent = repeat

//     const createdAtValue = document.querySelector('.created-at')
//     createdAtValue.textContent = createdAt

//     const updatedAtValue = document.querySelector('.updated-at')
//     updatedAtValue.textContent = updatedAt

//     const todoDetails = document.querySelector('.todo-details')
//     todoDetails.setAttribute('id', id)
//     todoDetails.classList.add('active')
// }