import React from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Item = ({ todo, onUpdate, onDelete, onEdit}) => {
    const handleDelete = async () => {
        try {
          await axios.delete(`https://todoapp20240620110428.azurewebsites.net/api/ToDo/${todo.id}`);
          onDelete();
          toast.success('Todo Item deleted successfully !');
        } catch (error) {
          console.error('Error deleting ToDo item', error);
          toast.error('failed to delete Todo item');
        }
      };

      const handleToggleComplete = () => {
        const updatedTodo = { ...todo, isCompleted: !todo.isCompleted };
        onUpdate(updatedTodo);
      };
    
      return (
        <li className="flex justify-between items-center mb-2 p-2 border rounded">
          <div>
            <h3 className="text-xl font-bold">{todo.title}</h3>
            <p>{todo.description}</p>
            <p>Priority: {todo.priority}</p>
            <p>Category: {todo.category}</p>
            <p>Status: {todo.isCompleted ? 'Completed' : 'Not Completed'}</p>
            <button onClick={handleToggleComplete}  className={`px-4 py-2 rounded ${todo.isCompleted ? 'bg-red-400' : 'bg-green-500'} text-white`}
>
          {todo.isCompleted ? 'Mark as Incomplete ' : 'Mark as Complete'} </button>            
          </div>
          <div>
          <button onClick={() => onEdit(todo)} className="px-2 py-1 bg-yellow-500 text-white rounded">Edit</button>
          <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
          </div>
        </li>
      );
};

export default Item;
