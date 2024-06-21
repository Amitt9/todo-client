import React, { useState, useEffect, useRef } from 'react';
import axios from 'axios';
import Item from './Item';
import AddForm from './AddForm';
import Search from './Search';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const List =  () => {
    const [todos, setTodos] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [showEditForm, setShowEditForm] = useState(false);
    const [currentTodo, setCurrentTodo] = useState(null);
    const [isOpen, setIsOpen] = useState(false);
    const [filteredTodos, setFilteredTodos] = useState([]);
    const editFormRef = useRef(null);
    const incompleteTodos = filteredTodos.filter(todo => !todo.isCompleted);
    const completedTodos = filteredTodos.filter(todo => todo.isCompleted);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };
  
    useEffect(() => {
      fetchTodos();
    }, []);

    useEffect(() => {
        if (showEditForm && editFormRef.current) {
          editFormRef.current.scrollIntoView({ behavior: 'smooth' });
        }
      }, [showEditForm]);
  
    const fetchTodos = async () => {
      try {
        const response = await axios.get('https://todoapp20240620110428.azurewebsites.net/api/ToDo');
       if(response.status === 200){
        setTodos(response.data.data);
        setFilteredTodos(response.data.data);
       }
       else{
        console.error("Error fetching Data!");
       }
      } catch (error) {
        console.error('Error fetching ToDo items', error);
      }
    };

  
    const searchTodos = async (term) => {
        if (!term) {
            setFilteredTodos(todos);
        } else {
            try {
                const response = await axios.get(`https://todoapp20240620110428.azurewebsites.net/api/ToDo/Search/${term}`);
                setFilteredTodos(response.data.data);
            } catch (error) {
                console.error('Error searching ToDo items', error);
            }
        }
    };

    const updateTodo = async (updatedTodo) => {
        try {
          await axios.put(`https://todoapp20240620110428.azurewebsites.net/api/ToDo/${updatedTodo.id}`, updatedTodo);
          fetchTodos();
          setShowEditForm(false);
          setCurrentTodo(null);
          toast.success('Todo item updated successfully !');
        } catch (error) {
          console.error('Error updating ToDo item', error);
          toast.error('failed to update Todo item');
        }
      };

      const handleEditClick = (todo) => {
        setCurrentTodo(todo);
        setShowEditForm(true);
      };
 
    const filterByCategory = async (category) => {
      try {
        const response = await axios.get(`https://todoapp20240620110428.azurewebsites.net/api/ToDo/Category/${category}`);
        setFilteredTodos(response.data.data);
      
      } catch (error) {
        console.error('Error filtering ToDo items by category', error);
      }
    };
  
    const filterByPriority = (priority) => {
      try {
        const filteredTodos = todos.filter(todo => todo.priority === priority);
        setFilteredTodos(filteredTodos);
      } catch (error) {
        console.error('Error filtering ToDo items by priority', error);
      }
    };
  
    const handlePriorityChange = (e) => {
      const priority = e.target.value;
      
      if (priority) {
        filterByPriority(priority);
      } else {
        setFilteredTodos(todos);
      }
    };
  
    const handleCategoryChange = (category) => {
      
      if (category) {
        filterByCategory(category);
       
      } else {
        setFilteredTodos(todos);
        
      }
      setIsOpen(!isOpen);
    };
  
    return (
      <div className="container mx-auto p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">ToDo List</h1>
          <Search onSearch={searchTodos} />
          <div className="flex space-x-2 ">
            <select onChange={handlePriorityChange} className="px-2 py-1 border rounded">
              <option value="">All Priorities</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <div className="relative p-4">
              <button onClick={() => setShowForm(!showForm)} className="px-4 py-2 bg-blue-500 text-white rounded">
                {showForm ? 'Hide Form' : 'Add ToDo'}
              </button>
              <div className="relative inline-block p-4">
                <button onClick={toggleDropdown} className="px-4 py-2 bg-blue-500 text-white rounded">Filter by Category</button>
                {isOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-md">
                    <span onClick={() => handleCategoryChange('Work')} className="block px-4 py-2 text-black cursor-pointer">
                        Work
                    </span>
                    <span onClick={() => handleCategoryChange('Personal')} className="block px-4 py-2 text-black cursor-pointer">
                        Personal
                    </span>
                    <span onClick={() => handleCategoryChange('Other')} className="block px-4 py-2 text-black cursor-pointer">
                        Other
                    </span>
                    <span onClick={() => handleCategoryChange('')} className="block px-4 py-2 text-black cursor-pointer">
                        All Categories
                    </span>
                </div>
            )}
              </div>
            </div>
          </div>
        </div>
        {showForm && <AddForm onAdd={fetchTodos} />}
        {showEditForm && (
        <div ref={editFormRef} className="mb-4">
          <h2 className="text-xl font-bold">Edit ToDo</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateTodo(currentTodo);
            }}
          >
            <div className="mb-2">
              <label className="block text-gray-700">Title</label>
              <input
                type="text"
                value={currentTodo.title}
                onChange={(e) => setCurrentTodo({ ...currentTodo, title: e.target.value })}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Description</label>
              <input
                type="text"
                value={currentTodo.description}
                onChange={(e) => setCurrentTodo({ ...currentTodo, description: e.target.value })}
                className="w-full px-2 py-1 border rounded"
              />
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Priority</label>
              <select
                value={currentTodo.priority}
                onChange={(e) => setCurrentTodo({ ...currentTodo, priority: e.target.value })}
                className="w-full px-2 py-1 border rounded"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            <div className="mb-2">
              <label className="block text-gray-700">Category</label>
              <div>
          <label className="inline-flex items-center">
            <input type="radio" name="category" value="Work" checked={currentTodo.category === 'Work'} onChange={(e) => setCurrentTodo({ ...currentTodo, category: e.target.value })} />
            <span className="ml-2">Work</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input type="radio" name="category" value="Personal" checked={currentTodo.category === 'Personal'} onChange={(e) => setCurrentTodo({ ...currentTodo, category: e.target.value })} />
            <span className="ml-2">Personal</span>
          </label>
          <label className="inline-flex items-center ml-4">
            <input type="radio" name="category" value="Other" checked={currentTodo.category=== 'Other'} onChange={(e) => setCurrentTodo({ ...currentTodo, category: e.target.value })} />
            <span className="ml-2">Other</span>
          </label>
        </div>
            </div>
            <div className="flex justify-between items-center">
              <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded">Update</button>
              <button onClick={() => setShowEditForm(false)} className="px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
            </div>
          </form>
        </div>
      )}
        <h2 className="text-xl font-bold">Incomplete Tasks</h2>
      <ul>
        {incompleteTodos.map(todo => (
          <Item key={todo.id} todo={todo} onEdit={handleEditClick} onUpdate={updateTodo} onDelete={fetchTodos} />
        ))}
      </ul>
      <h2 className="text-xl font-bold mt-4">Completed Tasks</h2>
      <ul>
        {completedTodos.map(todo => (
          <Item key={todo.id} todo={todo} onEdit={handleEditClick} onUpdate={updateTodo} onDelete={fetchTodos} />
        ))}
      </ul>
      </div>
    );
  };

export default List;
