import axios from 'axios';

const API_URL = 'http://localhost:3001/todos'; // Replace with your actual API URL

export const saveTodo = async (todo) => {
    console.log('Saving todo:', todo);
  try {
    const response = await axios.post(API_URL, todo);
    return response.data;
  } catch (error) {
    console.error('Error saving todo:', error);
    throw error;
  }
};

export const editTodo = async (id, updatedTodo) => {
  try {
    const response = await axios.put(`${API_URL}/${id}`, updatedTodo);
    return response.data;
  } catch (error) {
    console.error('Error editing todo:', error);
    throw error;
  }
};

export const deleteTodo = async (id) => {
  try {
    const response = await axios.delete(`${API_URL}/${id}`);
    return response.data;
  } catch (error) {
    console.error('Error deleting todo:', error);
    throw error;
  }
};

export const getTodos = async () => {
  try {
    const response = await axios.get(API_URL,'/todos');
    return response.data;
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};
