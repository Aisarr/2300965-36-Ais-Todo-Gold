const sidebar = document.getElementById('side_nav');
const mainContainer = document.querySelector('.main-container');
const popup = document.getElementById('popupMenu');
const dateInput = document.querySelector('.date-input')
const inputTodo = document.querySelector('.input-todo');
const addButton = document.querySelector('.add-button');


export const showPopup = () => {
    popup.style.display = 'block';
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