const schedule = require('node-schedule');
const knex = require('../config/knex');

async function repeatTodo(body) {
  const currentDueDate = new Date(body.due_date);
  

  const repeatIntervals = {
    everyMinute: `* * * * *`,
    Daily: `${currentDueDate.getMinutes()} ${currentDueDate.getHours()} * * *`,
    Weekdays: `${currentDueDate.getMinutes()} ${currentDueDate.getHours()} * * 1-5`,
    Weekly: `${currentDueDate.getMinutes()} ${currentDueDate.getHours()} * * ${currentDueDate.getDay()}`,
    Monthly: `${currentDueDate.getMinutes()} ${currentDueDate.getHours()} ${currentDueDate.getDate()} * *`,
  };

  const repeatInterval = repeatIntervals[body.repeat];

  const insertRepeatTodo = schedule.scheduleJob(repeatInterval, async () => {
    try {
      if(body.status === true){
        await knex('todos').insert({
          title: body.title,
          description: body.description,
          due_date: body.due_date,
          repeat: body.repeat,
        });
      }
      insertRepeatTodo.cancel();
    } catch (error) {
      console.error('Error inserting todo:', error);
      insertRepeatTodo.cancel();
    }
  });
}
 



































module.exports = {
  repeatTodo,
};
