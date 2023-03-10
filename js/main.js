import { createDemonstration } from "./demo.js";
let form = document.getElementById("form");
let deleteAll = document.getElementById("deleteAll");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let createDemo = document.getElementById("createDemo");
let isUpdate = false;
let test;

function sanitizeInput(input) {
    // Only allow alphanumeric characters, dashes, underscores, periods, @ symbols, and French characters
    const pattern = /^[a-zA-Z0-9\u00C0-\u00FF\-\.\@\_ ]+$/g;
    if (pattern.test(input)) {
        // If the input matches the pattern, remove any extra spaces
        const sanitizedInput = input.replace(/\s+/g, " ").trim();
        return sanitizedInput;
    } else {
        // If the input contains forbidden characters, replace them with an empty string and remove extra spaces
        const sanitizedInput = input
            .replace(/[^a-zA-Z0-9\u00C0-\u00FF\-\.\@\_ ]/g, "")
            .replace(/\s+/g, " ")
            .trim();
        return sanitizedInput;
    }
}

form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
});

let formValidation = () => {
    if (textInput.value === "") {
        console.log("failure");
        msg.innerHTML = "Task cannot be blank";
    } else {
        console.log("success");
        msg.innerHTML = "";
        acceptData();
        add.setAttribute("data-bs-dismiss", "modal");
        add.click();

        (() => {
            add.setAttribute("data-bs-dismiss", "");
        })();
    }
};

let data = [];

let acceptData = () => {
    if (isUpdate) {
        data.splice(test, 0, {
            text: sanitizeInput(textInput.value),
            date: sanitizeInput(dateInput.value),
            description: sanitizeInput(textarea.value),
        });
        isUpdate = false;
    } else {
        data.push({
            text: sanitizeInput(textInput.value),
            date: sanitizeInput(dateInput.value),
            description: sanitizeInput(textarea.value),
        });
    }

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
    createTasks();
};

let createTasks = () => {
    tasks.innerHTML = "";
    data.map((x, y) => {
        return (tasks.innerHTML += `
    <div id=${y} class="col-sm-6 col-lg-3 my-2 task-art">
          <article class="bg-black rounded h-100 p-2 d-flex flex-column">
            <div class="fw-bold">${x.text}</div>
            <div class="small text-secondary">${x.date}</div>
            <p>${x.description}</p>
            <div class="options mt-auto">
              <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
              <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
            </div>
          </article>
        </div>
    `);
    });

    resetForm();
};

let resetForm = () => {
    textInput.value = "";
    dateInput.value = "";
    textarea.value = "";
};

let deleteTask = (e) => {
    // e.parentElement.parentElement.remove();
    e.closest(".task-art").remove();
    console.log(e);

    data.splice(e.closest(".task-art").id, 1);

    localStorage.setItem("data", JSON.stringify(data));

    console.log(data);
};

deleteAll.addEventListener("click", (e) => {
    localStorage.clear();
    data = [];
    createTasks();
    deleteAll.setAttribute("data-bs-dismiss", "modal");
    deleteAll.click();

    (() => {
        deleteAll.setAttribute("data-bs-dismiss", "");
    })();
});

let editTask = (e) => {
    test = e.closest(".task-art").id;
    let selectedTask = e.parentElement.parentElement;
    console.log(e);
    textInput.value = selectedTask.children[0].innerHTML;
    dateInput.value = selectedTask.children[1].innerHTML;
    textarea.value = selectedTask.children[2].innerHTML;
    deleteTask(e);
    isUpdate = true;
};

(() => {
    data = JSON.parse(localStorage.getItem("data")) || [];
    console.log(data);
    createTasks();
})();

createDemo.addEventListener("click", (e) => {
    createDemonstration(data);
    createTasks();
});
