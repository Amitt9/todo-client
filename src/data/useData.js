import { useState, useEffect } from 'react';
import { fetchTodos, addTodo, updateTodo, deleteTodo } from './Data';

const useData = () => {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const loadTodos = async () => {
      const todos = await fetchTodos();
      setTodos(todos);
    };
    loadTodos();
  }, []);

  const handleAddTodo = async (todo) => {
    const newTodo = await addTodo(todo);
    setTodos([...todos, newTodo]);
  };

  const handleUpdateTodo = async (id, updatedTodo) => {
    await updateTodo(id, updatedTodo);
    const updatedTodos = todos.map((todo) =>
      todo.id === id ? { ...todo, ...updatedTodo } : todo
    );
    setTodos(updatedTodos);
  };

  const handleDeleteTodo = async (id) => {
    await deleteTodo(id);
    const filteredTodos = todos.filter((todo) => todo.id !== id);
    setTodos(filteredTodos);
  };

  return {
    todos,
    handleAddTodo,
    handleUpdateTodo,
    handleDeleteTodo,
  };
};

export default useData;
