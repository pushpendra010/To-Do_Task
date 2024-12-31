document.addEventListener("DOMContentLoaded", () => {
  const input = document.getElementById("todo-input");
  const button = document.getElementById("add-task-btn");
  const ul = document.getElementById("todo-list");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task) => {
    renderTask(task);
  });

  button.addEventListener("click", () => {
    const taskText = input.value.trim();
    if (taskText === "") return;

    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    renderTask(newTask);
    input.value = ""; //clear input
    console.log(tasks);
  });

  function renderTask(task) {
    // console.log(task);
    const li = document.createElement("li");
    li.setAttribute("data-id", task.id);
    if (task.completed) {
      li.classList.add("completed");
    }
    li.innerHTML = `
    <span>${task.text}</span>
    <button class="delete-btn">Delete</button>
    `;
    li.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON") {
        return;
      }
      task.completed = !task.completed;
      li.classList.toggle("completed");
      saveTasks();
    });

    li.querySelector("button").addEventListener("click", (e) => {
      e.stopPropagation(); // prevent event bubbling
      tasks = tasks.filter((t) => t.id !== task.id);
      li.remove();
      saveTasks();
    });

    ul.appendChild(li);
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

// second approach without local storage
// Add event listener to input
// input.addEventListener("keypress", (e) => {
//   if (e.key === "Enter" && input.value.trim().length > 0) {
//     const li = document.createElement("li");
//     const button = document.createElement("button");
//     button.textContent = "Delete";
//     li.textContent = input.value;
//     ul.appendChild(li);
//     li.appendChild(button);
//     input.value = "";
//   }
// });

// // Add event listener to button
// button.addEventListener("click", () => {
//   if (input.value.trim().length > 0) {
//     const li = document.createElement("li");
//     const button = document.createElement("button");
//     button.textContent = "Delete";
//     li.textContent = input.value;
//     ul.appendChild(li);
//     li.appendChild(button);
//     input.value = "";
//   }
// });

// // Add event listener to ul
// ul.addEventListener("click", (e) => {
//   if (e.target.tagName === "BUTTON") {
//     e.target.parentElement.remove();
//   }
// });
