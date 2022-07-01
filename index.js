window.addEventListener("load", () => {
  todos = JSON.parse(localStorage.getItem("todos")) || [];
  const newTodoForm = document.querySelector("#new-todo-form");

  newTodoForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // TODO OBJECT
    const todo = {
      content: e.target.elements.content.value,
      category: e.target.elements.category.value,
      done: false,
      date: new Date().toJSON(),
    };

    // Prevents empty todos
    if (!e.target.elements.content.value) {
      alert("Please add a todo");
      return;
    }

    // Prevents empty category
    if (!e.target.elements.category.value) {
      alert("Please select a category");
      return;
    }

    todos.push(todo);

    localStorage.setItem("todos", JSON.stringify(todos));

    e.target.reset();

    DisplayTodos();
  });

  DisplayTodos();
});

function DisplayTodos() {
  const todoList = document.querySelector("#todo-list");

  todoList.innerHTML = "";

  // TODO Elements
  todos.forEach((todo) => {
    const todoItem = document.createElement("div");
    todoItem.classList.add("todo-item");

    const label = document.createElement("label");
    const input = document.createElement("input");
    const span = document.createElement("span");
    const content = document.createElement("div");
    const actions = document.createElement("div");
    const edit = document.createElement("button");
    const deleteBtn = document.createElement("button");

    input.type = "checkbox";
    input.checked = todo.done;
    span.classList.add("bubble");

    if (todo.category == "private") {
      span.classList.add("private");
    } else {
      span.classList.add("business");
    }

    content.classList.add("todo-content");
    actions.classList.add("actions");
    edit.classList.add("edit");
    deleteBtn.classList.add("delete");

    content.innerHTML = `<input type="text" value="${todo.content}" readonly>`;

    edit.innerHTML = "Edit";
    deleteBtn.innerHTML = "Delete";

    label.appendChild(input);
    label.appendChild(span);
    actions.appendChild(edit);
    actions.appendChild(deleteBtn);
    todoItem.appendChild(label);
    todoItem.appendChild(content);
    todoItem.appendChild(actions);

    todoList.appendChild(todoItem);

    // Todo Done
    if (todo.done) {
      todoItem.classList.add("done");
    }

    input.addEventListener("click", (e) => {
      todo.done = e.target.checked;
      localStorage.setItem("todos", JSON.stringify(todos));

      if (todo.done) {
        todoItem.classList.add("done");
      } else {
        todoItem.classList.remove("done");
      }

      DisplayTodos();
    });

    // Edit Button
    edit.addEventListener("click", (e) => {
      const input = content.querySelector("input");
      if (edit.innerText.toLowerCase() == "edit") {
        input.removeAttribute("readonly");
        input.focus();
        edit.innerText = "Save";
      } else {
        input.setAttribute("readonly", "readonly");
        edit.innerText = "Edit";
      }

      input.addEventListener("blur", (e) => {
        input.setAttribute("readonly", true);
        todo.content = e.target.value;
        localStorage.setItem("todos", JSON.stringify(todos));
        DisplayTodos();
      });
    });

    // Delete Button
    deleteBtn.addEventListener("click", (e) => {
      todos = todos.filter((t) => t != todo);
      localStorage.setItem("todos", JSON.stringify(todos));
      DisplayTodos();
    });
  });
}
