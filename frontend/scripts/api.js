const baseUrl = 'http://localhost:5000/todos'
const title = document.querySelector('.input-todo').value
const repeat = document.querySelector('.repeat-value').innerHTML
const inputDate = document.querySelector('.date-input').value

const dateFormat = (inputDate) => {
    const date = new Date(inputDate)
    const year = date.getFullYear()
    const month = date.getMonth()
    const day = date.getDay()
    return `${year}-${month}-${day}`
}
const due_date = dateFormat(inputDate)

document.addEventListener('DOMContentLoaded', function() {
    async function addTodo(){
        const data = {
            title: title,
            due_date: due_date
          }
          const raw = JSON.stringify(data);
          
          var myHeaders = new Headers();
          myHeaders.append("Content-Type", "application/json");
          
          var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
          };
          
          try {
            const response = await fetch(baseUrl, requestOptions);
            const result = await response.json();
            console.log(result);
          } catch (error) {
            console.log('error', error);
          }
    }    
  });

export { addTodo }