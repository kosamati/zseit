import React, { useState } from 'react';
import "./App.css"
function TodoApp() {
  const [todos, setTodos] = useState([
  ]);

  const addTodo = text => {
    setTodos([...todos, { text, completed: false }]);
  };

  const completeTodo = index => {
    setTodos(
      todos.map((todo, i) => {
        if (i === index) {
          return {
            ...todo,
            completed: !todo.completed
          };
        }
        return todo;
      })
    );
  };

  const removeTodo = index => {
    setTodos(todos.filter((todo, i) => i !== index));
  };
  const [action,setAction] = useState("")

  const [editingTodo, setEditingTodo] = useState(null);

  const handleTodoClick = (todo) => {
    setEditingTodo(todo);
  }
  const handleSaveTodo = (todo) => {
    setTodos(
      todos.map((oldTodo) => (oldTodo.id === todo.id ? todo : oldTodo))
    );
    setEditingTodo(null);
  };


  return (
    <div className="todo-app">
      <header>
        <ul>
          Menu
            <li><button onClick = {() => setAction("Create")} >Create</button></li>
            <li><button onClick = {() => setAction("Read")} >Read</button></li>
            <li><button onClick = {() => setAction("Update")} >Update</button></li>
            <li><button onClick = {() => setAction("Delete")} >Delete</button></li>
        </ul>
      </header>
      <div className="todo-header">
        <h1>TODO List</h1>
      </div>
      <div className='todo'>
      <div className="todo-list">
        {(action == "Read" || action == "Delete"|| action == "Update") && todos.map((todo, i) => (
          <div key={i} className="todo">
            <span className={`todo-text ${todo.completed ? 'completed' : ''}`} onClick={() => completeTodo(i)}> {todo.text} </span>
            {action == "Update" &&
             (editingTodo && editingTodo.id === todo.id ? (
              <input
                type="text"
                value={editingTodo.text}
                onChange={(event) => {
                  setEditingTodo({ ...editingTodo, text: event.target.value });
                }}
                onBlur={() => handleSaveTodo(editingTodo)}
                onKeyDown={(event) => {
                  if (event.key === "Enter") {handleSaveTodo(editingTodo);}
                  }}
                  />
                  ) : (
                  <span className='test' onClick={() => handleTodoClick(todo)}>
                  {todo.text}{" "}
                  {todo.done ? <span style={{ textDecoration: "line-through" }}>✔️</span> : ""}
                  </span>
            ))}
            {action == "Delete" && <button className="remove-todo" onClick={() => removeTodo(i)}>
              x
            </button>}
          </div>
        ))}
      </div>
      <div className="add-todo">
      {action == "Create" &&
        <form onSubmit={e => {
          e.preventDefault();
          addTodo(e.target.elements.todo.value);
          e.target.elements.todo.value = '';
        }}>
          <input type="text" name="todo" />
          <button type="submit">Add Todo</button>
        </form>
      
      }
      </div>
      </div>
    </div>
  );
}

export default TodoApp;