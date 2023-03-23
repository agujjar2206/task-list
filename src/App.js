import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [];
  });
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (inputValue.trim()) {
      setTasks([...tasks, { text: inputValue, completed: false }]);
      setInputValue('');
    }
  };

  const handleToggleTask = (index) => {
    const newTasks = tasks.slice();
    newTasks[index].completed = !newTasks[index].completed;
    setTasks(newTasks);
  };

  const handleDeleteTask = (index) => {
    const newTasks = tasks.slice();
    newTasks.splice(index, 1);
    setTasks(newTasks);
  };

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleClearCompleted = () => {
    setTasks(tasks.filter(task => !task.completed));
  };

  const filteredTasks = tasks.filter(task => {
    if (filter === 'completed') return task.completed;
    if (filter === 'active') return !task.completed;
    return true;
  });

  return (
    <div className="App">
      <h1>Task List</h1>
      <div>
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          placeholder="Enter a task"
        />
        <button className="add-task" onClick={handleAddTask}>
          Add Task
        </button>
      </div>
      <div className="button-group">
        <button className="all" onClick={() => setFilter('all')}>
          All
        </button>
        <button
          className="completed"
          onClick={() => setFilter('completed')}
        >
          Completed
        </button>
        <button className="active" onClick={() => setFilter('active')}>
          Active
        </button>
        <button className="clear" onClick={handleClearCompleted}>
          Clear Completed
        </button>
      </div>
      <ul>
      {filteredTasks.map((task, index) => (
  <li 
    key={index}
    onClick={() => handleToggleTask(index)}
  >
    <span
      style={{
        textDecoration: task.completed ? 'line-through' : 'none',
      }}
    >
      {task.text}
    </span>
    <button
      className="delete"
      onClick={(event) => {
        event.stopPropagation();
        handleDeleteTask(index);
      }}
    >
      Delete
    </button>
  </li>
))}

      </ul>
    </div>
  );
};

export default App;
