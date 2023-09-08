const baseUrl = 'http://localhost:5000/todos'
const listItems = document.querySelectorAll('.sidebar-body ul li');
const sidebar = document.getElementById('side_nav');
const closeButton = document.querySelector('.close-button');
const mainContainer = document.querySelector('.main-container');
const popup = document.getElementById('popupMenu');
const addButton = document.querySelector('.add-button');
const inputTodo = document.querySelector('.input-todo');
const sidebarToggleButton = document.querySelector('.open-button');
const repeatList = document.querySelectorAll('.repeat-dropdown li a')
const dueDateList = document.querySelectorAll('.due-date-dropdown li a')
const dateInput = document.querySelector('.date-input')

const checkInput = () => {
    const inputValue = inputTodo.value.trim();
    
    if (inputValue === '') {
        addButton.disabled = true;
    } else {
        addButton.disabled = false;
    }
}

const dropdownOption = (list) => {
    list.addEventListener('click' ())
}
const showPopup = () => {
    popup.style.display = 'block';
}

const addSelectedToItems = (items) => {
    items.forEach((item) => {
        item.addEventListener('click', function () {
            items.forEach((li) => {
                li.classList.remove('selected');
            });
            this.classList.add('selected');
        });
    });
}

const removeSelectedWhenInput = (items) => {
    items.forEach(() => {
        dateInput.addEventListener('click', function () {
            items.forEach((li) => {
                li.classList.remove('selected');
            });
        });
    });
}
  
const showSidebar = () => {
      if(sidebar.classList.contains('active') && mainContainer.classList.contains('active')){
        
          sidebar.classList.remove('active');
        mainContainer.classList.remove('active');
    }else{
        sidebar.classList.add('active');
        mainContainer.classList.add('active');
    }
}

const dateFormat = (inputDate) => {
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

    
    todoTitleSpan.textContent = data.title

    viewButton.appendChild(todoTitleSpan)
    todoDataDiv.appendChild(viewButton)
  
    todoDiv.appendChild(checkBoxDiv)
    todoDiv.appendChild(todoDataDiv)
    
    return todoDiv;
}

const generateTodoOnClick = (data) => {
    const todoList = document.getElementById('todoList')
    const generatedTodo = generateTodoHTML(data)
    todoList.appendChild(generatedTodo)
}

const handleAddTodo = async () => {
    try {
      const data = {
        title: document.querySelector('.input-todo').value,
        due_date: dateFormat(document.querySelector('.date-input').value)
      };
  
      const raw = JSON.stringify(data);
  
      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");
  
      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
      };
  
      const response = await fetch(baseUrl, requestOptions);
      const result = await response.json();
      console.log(result);
      generateTodoOnClick(result.data) 
    } catch (error) {
      console.error('Error:', error);
    }
  };

const handleGetTodo = async () => {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
          };
          
        const response = await fetch(baseUrl, requestOptions)
        const result = await response.json()
        console.log(result) 
    } catch (error) {
        console.error('Error:', error)
    }
}

const checkBox = document.querySelector('.check-box')
checkBox.addEventListener('click', () => {
    const check = document.querySelector('.bi-check2')
    if(check.classList.contains('complete')){
        check.classList.remove('complete')
    }else{
        check.classList.add('complete')
    }
})

document.addEventListener('DOMContentLoaded', function () {
    
    


    addButton.addEventListener('click', handleAddTodo);
    inputTodo.addEventListener('input', checkInput);
    inputTodo.addEventListener('click', showPopup);
    sidebarToggleButton.addEventListener('click', showSidebar);
    removeSelectedWhenInput(dueDateList)
    addSelectedToItems(listItems)
    addSelectedToItems(repeatList)
    addSelectedToItems(dueDateList)
    
});



