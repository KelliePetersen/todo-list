/* This creates a todoList object. It contains an empty todos array that the
   user may add todos to. It contains methods for displaying todos, adding 
   todos, changing todos, deleting todos, and marking todos as complete.    */
var todoList = {
  todos: [],
  //This method adds a todo. Text for the todo is written in the brackets.
  addTodo: function(todoText) {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  },
  //This method changes a todo. It is selected by its index in the array.
  changeTodo: function(position, todoText) {
    this.todos[position].todoText = todoText;
  },
  //This method deletes a todo. It is selected by its index in the array.
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  //This method marks a todo as complete. It is selected by its index in the array.
  toggleCompleted: function(position) {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
  },
  /*This method marks all todos as complete. If all todos are already completed,
    then all todos are marked as incomplete.*/
  toggleAll: function() {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
 
    this.todos.forEach(function(todo) {
      if (todo.completed === true) {
        completedTodos++;
      }
    });
    this.todos.forEach(function(todo) {
      if (completedTodos === totalTodos) {
        todo.completed = false;
      } else {
        todo.completed = true;
      }
    });
  }
};

//Buttons and Forms are handled by this object.
var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById("addTodoTextInput");
    todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = "";
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById("changeTodoPositionInput");
    var changeTodoTextInput = document.getElementById("changeTodoTextInput");
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = "";
    changeTodoTextInput.value = "";
    view.displayTodos();
  },
  deleteTodo: function(position) {
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById("toggleCompletedPositionInput");
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = "";
    view.displayTodos();
  },
  toggleAll: function () {
    todoList.toggleAll();
    view.displayTodos();
  }
};

//Controls what the user sees.
var view = {
  displayTodos: function() {
    var todosUl = document.querySelector("ul");
    todosUl.innerHTML = "";

    //OPTIONALLY ADD:
    //if (todoList.todos.length === 0) {
    // ("I have no Todos!"); }
    
    todoList.todos.forEach(function(todo, position) {
      var todoLi = document.createElement("li");
      var todoTextWithCompletion = "( ) ";
      if (todo.completed === true) {
        todoTextWithCompletion = "(x) " + todo.todoText;
      } else {
        todoTextWithCompletion = "( ) " + todo.todoText;
      }
      todoLi.id = position;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todosUl.appendChild(todoLi);
    }, this);
  },
  createDeleteButton: function() {
    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.className = "deleteButton";
    return deleteButton;
  },
  setUpEventListeners: function() {
    var todosUl = document.querySelector("ul");
    todosUl.addEventListener("click", function(event) {
      var elementClicked = event.target;
      if (elementClicked.className === "deleteButton") {
        handlers.deleteTodo(parseInt (elementClicked.parentNode.id));
      }
    });
  }
};

view.setUpEventListeners();