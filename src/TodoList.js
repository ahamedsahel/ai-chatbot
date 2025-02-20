import React, { useState, useEffect } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import { getTodos, saveTodo, editTodo as apiEditTodo, deleteTodo as apiDeleteTodo } from './service';

function TodoList({ addTodo, editTodo, deleteTodo }) {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState({
    name: "",
    age: "",
    place: "",
    date: "",
    description: ""
  });
  const [isEditing, setIsEditing] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({});

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const fetchedTodos = await getTodos();
        setTodos(fetchedTodos);
      } catch (error) {
        console.error('Error fetching todos:', error);
      }
    };

    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const fetchedTodos = await getTodos();
      setTodos(fetchedTodos);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {
    if (newTodo.name.trim()) {
      try {
        const savedTodo = await saveTodo(newTodo);
        addTodo(savedTodo);
        setNewTodo({
          name: "",
          age: "",
          place: "",
          date: "",
          description: ""
        });
      } catch (error) {
        console.error('Error adding todo:', error);
      }
    }
  };

  const handleEditTodo = (id) => {
    setIsEditing(true);
    const todo = todos.find(todo => todo.id === id);
    setCurrentTodo({
      id,
      ...todo
    });
  };

  const handleSaveTodo = async () => {
    try {
      const updatedTodo = await apiEditTodo(currentTodo.id, currentTodo);
      editTodo(currentTodo.id, updatedTodo);
      setIsEditing(false);
      setCurrentTodo({});
      await fetchTodos(); // Fetch todos after saving
    } catch (error) {
      console.error('Error saving todo:', error);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      await apiDeleteTodo(id);
      deleteTodo(id);
      await fetchTodos(); // Fetch todos after deleting
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div className="container col-md-6">
      <div className="form-group mt-2">
        <input
          type="text"
          className="form-control"
          value={newTodo.name}
          onChange={(e) => setNewTodo({ ...newTodo, name: e.target.value })}
          placeholder="Name"
        />
      </div>
      <div className="form-group mt-2">
        <input
          type="text"
          className="form-control"
          value={newTodo.age}
          onChange={(e) => setNewTodo({ ...newTodo, age: e.target.value })}
          placeholder="Age"
        />
      </div>
      <div className="form-group mt-2">
        <input
          type="text"
          className="form-control"
          value={newTodo.place}
          onChange={(e) => setNewTodo({ ...newTodo, place: e.target.value })}
          placeholder="Place"
        />
      </div>
      <div className="form-group mt-2">
        <input
          type="date"
          className="form-control"
          value={newTodo.date}
          onChange={(e) => setNewTodo({ ...newTodo, date: e.target.value })}
          placeholder="Date"
        />
      </div>
      <div className="form-group mt-2">
        <input
          type="text"
          className="form-control"
          value={newTodo.description}
          onChange={(e) => setNewTodo({ ...newTodo, description: e.target.value })}
          placeholder="Description"
        />
      </div>
      <button className="btn btn-primary mt-2" onClick={handleAddTodo}>Add</button>
      {isEditing && (
        <div>
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              value={currentTodo.name}
              onChange={(e) => setCurrentTodo({ ...currentTodo, name: e.target.value })}
              placeholder="Name"
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              value={currentTodo.age}
              onChange={(e) => setCurrentTodo({ ...currentTodo, age: e.target.value })}
              placeholder="Age"
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              value={currentTodo.place}
              onChange={(e) => setCurrentTodo({ ...currentTodo, place: e.target.value })}
              placeholder="Place"
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="date"
              className="form-control"
              value={currentTodo.date}
              onChange={(e) => setCurrentTodo({ ...currentTodo, date: e.target.value })}
              placeholder="Date"
            />
          </div>
          <div className="form-group mt-2">
            <input
              type="text"
              className="form-control"
              value={currentTodo.description}
              onChange={(e) => setCurrentTodo({ ...currentTodo, description: e.target.value })}
              placeholder="Description"
            />
          </div>
          <button className="btn btn-success mt-2" onClick={handleSaveTodo}>Save</button>
        </div>
      )}
      <div className="mt-3">
        {todos.map((todo) => (
          <div key={todo.id} className="card mb-3">
            <div className="card-body">
              <h5 className="card-title">Name : {todo.name}</h5>
              <h6 className="card-subtitle mb-2 text-muted">Age :{todo.age} - {todo.place}</h6> <br />
              <p className="card-text">Date:{todo.date}</p>
              <p className="card-text">Description{todo.description}</p>
              <button className="btn btn-warning btn-sm mr-2" onClick={() => handleEditTodo(todo.id)}>Edit</button>
              <button className="btn btn-danger btn-sm" onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default TodoList;
