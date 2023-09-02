const schedule = require('node-schedule');
const knex = require('../config/knex');

async function repeatTodo({ title, description, due_date, repeat }) {
  const currentDueDate = new Date(due_date);

  const repeatIntervals = {
    everyMinute: `* * * * *`,
    daily: `${currentDueDate.getMinutes()} ${currentDueDate.getHours()} * * *`,
    weekdays: `${currentDueDate.getMinutes()} ${currentDueDate.getHours()} * * 1-5`,
    weekly: `${currentDueDate.getMinutes()} ${currentDueDate.getHours()} * * ${currentDueDate.getDay()}`,
    monthly: `${currentDueDate.getMinutes()} ${currentDueDate.getHours()} ${currentDueDate.getDate()} * *`,
  };

  const repeatInterval = repeatIntervals[repeat];

  let count = 0;
  const insertRepeatTodo = schedule.scheduleJob(repeatInterval, async () => {
    try {
      await knex('todos').insert({
        title: `${title}`,
        description: `${description}`,
        due_date: `${due_date}`,
        repeat: `${repeat}`,
      });

      count++;

      if (count >= 5) {
        insertRepeatTodo.cancel();
      }
    } catch (error) {
      console.error('Error inserting todo:', error);
      insertRepeatTodo.cancel();
    }
  });
}

module.exports = {
  repeatTodo,
};
