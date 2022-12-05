import { storage } from "./service.js";
import { tasks } from "./store.js";

const todoList = {
  body: document.body,
  inputTitle: document.querySelector(".form__input-title"),
  inputDescription: document.querySelector(".form__input-description"),
  form: document.querySelector(".form"),
  taskList: document.querySelector(".tasks-list"),
  modalWindow: document.querySelector(".modal-window"),
  search: document.querySelector(".search-wrap"),
  searchInput: document.querySelector(".search-input"),
  filterBlock: document.querySelector(".filter-block"),
  filterList: document.querySelector(".filter-block__options"),
  filterOptions: document.querySelectorAll(".filter-block__option"),
  filterInput: document.querySelector(".filter-block__select-box"),
  switcher: document.querySelector(".theme-changer__switch"),
  switch: document.querySelector(".theme-changer__wrap"),
  addTask() {
    this.form.addEventListener("click", (e) => {
      const regExp = /^(?![0-9]+$)[а-яА-Яa-zA-Z0-9]{3,}$/;
      if (e.target.type === "submit") {
        e.preventDefault();
        if (
          regExp.test(this.inputTitle.value) &&
          regExp.test(this.inputDescription.value)
        ) {
          tasks.add(this.inputTitle.value, this.inputDescription.value);
          storage.setTasks(tasks.list);
          this.form.reset();
          this.renderTasks();
        }
      }
    });
  },
  renderTasks(list = tasks.list) {
    this.taskList.innerHTML = null;
    console.log(list);
    list.forEach((task) => {
      this.taskList.innerHTML += `
            <li class="tasks-list__task-wrap ${
              task.important ? "tasks-list__task-wrap--active" : ""
            } ${task.completed ? "tasks-list__task-wrap--complete" : ""}" id="${
        task.id
      }">
                <div class="tasks-list__task">
                    <h2>${task.title}</h2>
                    <p>${task.description}</p>       
                    <button class="tasks-list__task-btn" id="edit" data-task-id="${
                      task.id
                    }" ${task.completed ? "disabled='true'" : ""} >Edit</button>
                    <button class="tasks-list__task-btn" id="complete" data-task-id="${
                      task.id
                    }">Complete</button>
                    <button class="tasks-list__task-btn" id="important" data-task-id="${
                      task.id
                    }" ${
        task.completed ? "disabled='true'" : ""
      }>Important</button>
                    <button class="tasks-list__task-btn" id="delete" data-task-id="${
                      task.id
                    }">Delete</button>
                </div>
            </li>
            `;
    });
  },
  editTask() {
    let taskId = 0;
    this.taskList.addEventListener("click", (e) => {
      taskId = e.target.getAttribute("data-task-id");
      if (e.target.id === "edit") {
        this.modalWindow.classList.add("modal-window--active");
      }
    });
    this.modalWindow.addEventListener("click", (e) => {
      if (e.target.id === "save") {
        tasks.edit(taskId);
        this.modalWindow.classList.remove("modal-window--active");
        storage.setTasks(tasks.list);
        this.renderTasks();
      }
      if (e.target.id === "close") {
        this.modalWindow.classList.remove("modal-window--active");
      }
    });
  },
  searchTask() {
    this.search.addEventListener("click", (e) => {
      if (e.target.classList.contains("search-icon")) {
        this.searchInput.value = "";
        this.search.classList.toggle("search-wrap--active");
      }
    });
    let filteredArray = [];
    this.searchInput.addEventListener("input", (e) => {
      filteredArray = tasks.list.filter((el) => {
        if (+el.title.search(e.target.value) === -1) {
          return;
        } else {
          return el;
        }
      });
      this.renderTasks(filteredArray);
    });
  },
  filterTask() {
    this.filterInput.value = storage.getFilter();
    let filteredArray = storage.getList();
    this.renderTasks(filteredArray);

    this.filterBlock.addEventListener("click", (e) => {
      this.filterBlock.classList.toggle("filter-block--active");
      this.filterList.classList.toggle("filter-block__options--active");
      this.filterOptions.forEach((option) => {
        if (e.target.id === "all") {
          this.filterInput.value = e.target.id;
          storage.setFilter("all");
        }
        if (e.target.id === "complete") {
          this.filterInput.value = e.target.id;
          storage.setFilter("complete");
        }
        if (e.target.id === "incomplete") {
          this.filterInput.value = e.target.id;
          storage.setFilter("incomplete");
        }
      });
    });

    this.filterList.addEventListener("click", (e) => {
      const targetId = e.target.id;
      filteredArray = tasks.filterTask(targetId);
      this.renderTasks(filteredArray);
    });
  },
  makeComplete() {
    this.taskList.addEventListener("click", (e) => {
      if (e.target.id === "complete") {
        let taskId = e.target.getAttribute("data-task-id");
        tasks.makeComplete(taskId);
        this.renderTasks();
      }
    });
  },
  makeImportant() {
    this.taskList.addEventListener("click", (e) => {
      if (e.target.id === "important") {
        const taskId = e.target.getAttribute("data-task-id");
        tasks.makeImportant(taskId);
        this.renderTasks();
      }
    });
  },
  deleteTask() {
    this.taskList.addEventListener("click", (e) => {
      let taskId = e.target.getAttribute("data-task-id");
      if (e.target.id === "delete") {
        tasks.remove(taskId);
        storage.setTasks(tasks.list);
        this.renderTasks();
      }
    });
  },
  switchTheme() {
    storage.getTheme()
      ? (this.switch.checked = true)
      : (this.switch.checked = false);
    storage.getTheme()
      ? this.body.setAttribute("data-id-theme", "light-theme")
      : this.body.setAttribute("data-id-theme", "dark-theme");
    storage.getTheme()
      ? this.switcher.classList.add("theme-changer__switch--active")
      : this.switcher.classList.remove("theme-changer__switch--active");
    this.switch.addEventListener("click", (e) => {
      console.log(this.switch.checked);
      storage.setTheme(this.switch.checked);
      if (storage.getTheme() === true) {
        this.switcher.classList.add("theme-changer__switch--active");
        this.body.setAttribute("data-id-theme", "light-theme");
      } else {
        this.switcher.classList.remove("theme-changer__switch--active");
        this.body.setAttribute("data-id-theme", "dark-theme");
      }
    });
  },
  init() {
    this.addTask();
    this.renderTasks();
    this.editTask();
    this.searchTask();
    this.filterTask();
    this.makeComplete();
    this.makeImportant();
    this.deleteTask();
    this.switchTheme();
  },
};

todoList.init();
