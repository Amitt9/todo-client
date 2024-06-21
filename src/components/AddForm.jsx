import React, { useState } from 'react'
import axios from 'axios';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddForm = ({ onAdd }) => {
    const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [priority, setPriority] = useState('Low');
  const [category, setCategory] = useState('Work');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newToDo = { title, description, priority, category };
      await axios.post('https://todoapp20240620110428.azurewebsites.net/api/ToDo', newToDo);
      onAdd();
      setTitle('');
      setDescription('');
      toast.success('ToDo item added successfully!');
    } catch (error) {
      console.error('Error adding ToDo item', error);
      toast.error('Failed to add ToDo item.');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4">
      <div className="mb-2">
        <label className="block">Title</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full px-2 py-1 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Description</label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full px-2 py-1 border rounded"
          required
        />
      </div>
      <div className="mb-2">
        <label className="block">Priority</label>
        <select value={priority} onChange={(e) => setPriority(e.target.value)} className="w-full px-2 py-1 border rounded">
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>
      <div className="mb-2">
        <label className="block">Category</label>
        <div>
          <label className="inline-flex items-center">
            <input type="radio" name="category" value="Work" checked={category === 'Work'} onChange={(e) => setCategory(e.target.value)} />
            <span className="ml-2">Work</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input type="radio" name="category" value="Personal" checked={category === 'Personal'} onChange={(e) => setCategory(e.target.value)} />
            <span className="ml-2">Personal</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input type="radio" name="category" value="Other" checked={category === 'Other'} onChange={(e) => setCategory(e.target.value)} />
            <span className="ml-2">Other</span>
          </label>
        </div>
      </div>
      <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Add ToDo</button>
    </form>
  );
  };

  
export default AddForm
