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

    const todoTitleSpan = todoDiv.querySelector('.todo-title');
    todoTitleSpan.addEventListener('click', function () {
        const id = this.getAttribute('id');
        handleGetTodoById(id)
    });
}