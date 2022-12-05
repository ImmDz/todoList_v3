import { storage } from "./service.js";

export const tasks = {
  list: [],
  add(title, description) {
    const newTask = {
      id: Math.floor(Math.random() * 1000),
      title,
      description,
      completed: false,
      important: false,
    };
    this.list.push(newTask);
  },
  remove(taskId) {
    this.list = this.list.filter((task) => +taskId !== +task.id);
  },
  edit(taskId) {
    const newTitle = document.querySelector("#newTitle");
    const newDescription = document.querySelector("#newDescription");
    const regExp = /^(?![0-9]+$)[а-яА-Яa-zA-Z0-9]{3,}$/;
    this.list.forEach((task) => {
      if (task.id === +taskId) {
        if (regExp.test(newTitle.value) && regExp.test(newDescription.value)) {
          task.title = newTitle.value;
          task.description = newDescription.value;
        }
        if (regExp.test(newTitle.value && newDescription.value === "")) {
          task.title = newTitle.value;
        }
        if (newTitle.value === "" && regExp.test(newDescription.value)) {
          task.description = newDescription.value;
        }
      }
    });
    newTitle.value = "";
    newDescription.value = "";
  },
  makeComplete(taskId) {
    tasks.list.forEach((task, index) => {
      if (+task.id === +taskId && task.completed === false) {
        task.completed = true;
        storage.setTasks(tasks.list);
        document
          .querySelectorAll(".tasks-list__task-wrap")
          [index].classList.add("tasks-list__task-wrap--complete");
        return;
      }
      if (+task.id === +taskId && task.completed === true) {
        task.completed = false;
        storage.setTasks(tasks.list);
        document
          .querySelectorAll(".tasks-list__task-wrap")
          [index].classList.remove("tasks-list__task-wrap--complete");
        return;
      }
    });
  },
  makeImportant(taskId) {
    tasks.list.forEach((task, index) => {
      if (+task.id === +taskId && task.important === false) {
        task.important = true;
        storage.setTasks(tasks.list);
        document
          .querySelectorAll(".tasks-list__task-wrap")
          [index].classList.add("tasks-list__task-wrap--active");
        return;
      }
      if (+task.id === +taskId && task.important === true) {
        task.important = false;
        storage.setTasks(tasks.list);
        document
          .querySelectorAll(".tasks-list__task-wrap")
          [index].classList.remove("tasks-list__task-wrap--active");
        return;
      }
    });
  },
  filterTask(target) {
    let filteredArray = [];
    tasks.list.forEach((task) => {
      if (target === "all") {
        filteredArray = tasks.list.filter((task) => {
              return task;
          });
      }
      if (target === "complete") {
        filteredArray = tasks.list.filter((task) => {
          if (task.completed === true) {
            return task;
          }
        });
      }
      if (target === "incomplete") {
        filteredArray = tasks.list.filter((task) => {
          if (task.completed === false) {
            return task;
          }
        });
      }
    });
    storage.setList(filteredArray);
    // filteredArray = storage.getList();
    return filteredArray;
  },
  setList() {
    this.list = storage.getTasks();
  },
};

tasks.setList();
