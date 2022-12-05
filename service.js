// import { tasks } from "./store";

export const storage = {
    getTasks(defaultTasksList = []) {
        const tasks = localStorage.getItem("tasks");

        return tasks ? JSON.parse(tasks) : defaultTasksList;
    },
    setTasks(tasks) {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    getTheme(defaultTheme = true) {
        const state = localStorage.getItem("state");
        return state ? JSON.parse(state) : defaultTheme;
    },
    setTheme(state) {
        localStorage.setItem("state", JSON.stringify(state));
    },
    getFilter(defaultFilter = "") {
        const filter = sessionStorage.getItem("filter");
        return filter ? JSON.parse(filter) : defaultFilter;
    },
    setFilter(filter) {
        sessionStorage.setItem("filter", JSON.stringify(filter));
    },
    getList(defaultTasksList = []) {
        const list = sessionStorage.getItem("list");
        return list ?  JSON.parse(list) : defaultTasksList;
    },
    setList(list) {
        sessionStorage.setItem("list", JSON.stringify(list));
    }
};