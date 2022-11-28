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
        }
        this.list.push(newTask);
    },
    remove(taskId) {
        this.list = this.list.filter(task => +taskId !== +task.id);
    },
    edit(taskId) {
        const newTitle = document.querySelector("#newTitle");
        const newDescription = document.querySelector("#newDescription");
        const regExp = /^(?![0-9]+$)[а-яА-Яa-zA-Z0-9]{3,}$/;
        this.list.forEach(task => {
            if (task.id === +taskId) {
                if (regExp.test(newTitle.value) && regExp.test(newDescription.value)) {
                    task.title = newTitle.value;
                    task.description = newDescription.value;
                }
                if(regExp.test(newTitle.value && newDescription.value === "")) {
                    task.title = newTitle.value;
                }
                if(newTitle.value === "" && regExp.test(newDescription.value)) {
                    task.description = newDescription.value;
                }
            }
        })
        newTitle.value = "";
        newDescription.value = "";
    },
    setList() {
        this.list = storage.getTasks();
    }
}

tasks.setList();