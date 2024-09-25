import { fileURLToPath } from 'url';
import { dirname } from 'path';

import fs from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const DATA_FILE_NAME = `${__dirname}/data.json`;

const args = process.argv.splice(2);

console.log(args);

switch (args[0]) {
  case 'add':
    if (args.length === 2) addTask(args[1]);
    else displayHelp();

    break;

  case 'mark-in-progress':
    markInProgress(args[1]);
    break;

  case 'mark-done':
    markDone(args[1]);
    break;

  case 'list':
    if (args[1]) {
      fetchTasks(args[1]);
    } else {
      fetchTasks();
    }
    break;

  default:
    displayHelp();
}

export function addTask(description) {
  try {
    let data = JSON.parse(fs.readFileSync(DATA_FILE_NAME, 'utf-8'));

    if (fs.existsSync(DATA_FILE_NAME) && data.length !== 0) {
      const taskId = getTaskId(data);

      data.push({
        id: taskId,
        description: description,
        status: 'in-progress',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });

      const newData = JSON.stringify(data);

      fs.writeFileSync(DATA_FILE_NAME, newData);
    } else {
      const newTask = {
        id: 1,
        description: description,
        status: 'in-progress',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };

      const newData = JSON.stringify([newTask]);
      fs.writeFileSync(DATA_FILE_NAME, newData);
    }

    console.log(
      `Output: Task addded successfully (ID:${data[data.length - 1].id})`
    );
  } catch (error) {
    console.error('Error adding task: ', error.message);
  }
}

export function removeTask(id) {
  try {
    if (typeof id !== 'number') {
      throw new Error('Please provide a valid id');
    }
    if (!fs.existsSync(DATA_FILE_NAME))
      throw new Error("Data file doesn't exists");

    const tasks = JSON.parse(fs.readFileSync(DATA_FILE_NAME, 'utf-8'));

    const tasksExist = tasks.some((task) => task.id === id);

    if (!tasksExist) {
      throw new Error(
        `Task with ID ${id} does not exist. Please provide a valid task ID.`
      );
    }

    const newTasks = JSON.stringify(tasks.filter((task) => task.id !== id));

    fs.writeFileSync(DATA_FILE_NAME, newTasks);
  } catch (error) {
    console.error('Error removing task:', error.message);
  }
}

export function updateTask(id, description) {
  try {
    const tasks = JSON.parse(fs.readFileSync(DATA_FILE_NAME, 'utf-8'));

    const taskIndex = tasks.findIndex((t) => t.id === id);

    if (taskIndex === -1) throw new Error('Task not found');

    tasks[taskIndex].description = description;
    tasks[taskIndex].updatedAt = new Date().toISOString();

    fs.writeFileSync(DATA_FILE_NAME, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error updating task: ', error.message);
  }
}

export function markInProgress(id) {
  try {
    const tasks = JSON.parse(fs.readFileSync(DATA_FILE_NAME, 'utf-8'));

    const taskIndex = Number(tasks.findIndex((task) => task.id === +id));

    if (taskIndex === -1) throw new Error(`Task not found`);

    tasks[taskIndex].status = 'in-progress';

    fs.writeFileSync(DATA_FILE_NAME, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error marking task:', error.message);
  }
}

export function markDone(id) {
  try {
    const tasks = JSON.parse(fs.readFileSync(DATA_FILE_NAME, 'utf-8'));

    const taskIndex = Number(tasks.findIndex((task) => task.id === +id));

    if (taskIndex === -1) throw new Error(`Task not found`);

    tasks[taskIndex].status = 'done';

    fs.writeFileSync(DATA_FILE_NAME, JSON.stringify(tasks));
  } catch (error) {
    console.error('Error marking task:', error.message);
  }
}

export function fetchTasks(statusType) {
  try {
    const tasks = JSON.parse(fs.readFileSync(DATA_FILE_NAME, 'utf-8'));

    switch (statusType?.toLowerCase()) {
      case 'done':
        const doneTasks = tasks.filter((task) => task.status === 'done');
        console.log(doneTasks);

        break;

      case 'todo':
        const todoTasks = tasks.filter((task) => task.status === 'todo');
        console.log(todoTasks);

        break;

      case 'in-progress':
        const inProgressTasks = tasks.filter(
          (task) => task.status === 'in-progress'
        );
        console.log(inProgressTasks);
        break;

      default:
        console.log(tasks);

        break;
    }
  } catch (error) {
    console.error('Something went wrong', error.message);
  }
}

function getTaskId(tasks) {
  const lastTask = tasks[tasks.length - 1];

  return lastTask.id + 1;
}

function displayHelp() {
  console.log(`
  Usage: task-cli [options]

  Options:
    help                  Show help information
    add [desc]            Adds task with provided description
    update [id] [desc]    Updates the description of the task with corresponding id
    delete [id]           Deletes the task with the provided task id
`);
}
