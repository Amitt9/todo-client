import axios from 'axios';

const API_URL = 'https://localhost:7007/api/todo';

export const fetchTodos = async () => {
  const response = await axios.get(API_URL);
  console.log(response.data);
  return response.data;
};

export const addTodo = async (todo) => {
  const response = await axios.post(API_URL, todo);
  return response.data;
};

export const updateTodo = async (id, updatedTodo) => {
  await axios.put(`${API_URL}/${id}`, updatedTodo);
};

export const deleteTodo = async (id) => {
  await axios.delete(`${API_URL}/${id}`);
};
