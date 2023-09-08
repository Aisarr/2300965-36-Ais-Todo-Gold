import {
    dateFormat,
    appendNewTodoElement
} from './utils.js'

const baseUrl = 'http://localhost:5000/todos'

export const handleAddTodo = async () => {
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
      appendNewTodoElement(result.data) 
        } catch (error) {
        console.error('Error:', error);
    }
};

export const handleGetTodoById = async (id) => {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

          const todoId = id
          const response = await fetch(baseUrl+'/'+todoId, requestOptions)
          const result = await response.json()
          console.log(result) 
        } catch (error) {
            console.error('Error:', error)
        }
    }


export const handleGetTodos = async() => {
    try {
        var requestOptions = {
            method: 'GET',
            redirect: 'follow'
        };

          const response = await fetch(baseUrl, requestOptions)
          const result = await response.json()
          console.log(result)
          const resultLength= result.data.length
          
          for (let i = 0; i < resultLength; i++){
            appendNewTodoElement(result.data[i])
          }

        } catch (error) {
            console.error('Error:', error)
        }
}