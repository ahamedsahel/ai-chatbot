import React, { useState } from "react";
import Chatbot from "./chatbotAi";
import TodoList from "./TodoList";

function App() {
  const [todos, setTodos] = useState([]);

  const addTodo = (todo) => {
    setTodos([...todos, { ...todo, id: Date.now() }]);
  };

  const editTodo = (id, newTodo) => {
    const newTodos = todos.map(todo => (todo.id === id ? newTodo : todo));
    setTodos(newTodos);
  };

  const deleteTodo = (id) => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  };

  return (
    <div>
      <h2>AI Chatbot</h2>
      <Chatbot />
      <h2>Uses Address App</h2>
      <TodoList todos={todos} addTodo={addTodo} editTodo={editTodo} deleteTodo={deleteTodo} />
    </div>
  );
}

export default App;
