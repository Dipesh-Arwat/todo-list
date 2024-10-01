import React, { useState, useEffect } from 'react';
import './Todo.css';
import icon from '../assets/icon.png';


function TodoApp() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    // Function to load tasks from localStorage when component mounts
    useEffect(() => {
        const savedTasks = localStorage.getItem('tasks');
        if (savedTasks) {
            setTasks(JSON.parse(savedTasks));
        }
    }, []);

    // Function to save tasks to localStorage whenever tasks change
    useEffect(() => {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }, [tasks]);

    // Function to add a new task
    const addTask = () => {
        if (input.trim() === '') {
            alert('You must write something');
        } else {
            const newTask = { text: input, completed: false };
            setTasks([...tasks, newTask]);
            setInput('');
        }
    };

    // Function to toggle task completion
    const toggleTask = (index) => {
        const newTasks = tasks.map((task, idx) =>
            idx === index ? { ...task, completed: !task.completed } : task
        );
        setTasks(newTasks);
    };

    // Function to delete a task
    const deleteTask = (index) => {
        const newTasks = tasks.filter((_, idx) => idx !== index);
        setTasks(newTasks);
    };

    return (
        <div className="container">
            <div className="todo-app">
                <h2>To-Do List <img src={icon} alt="" /></h2>

                <div className="row">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Add your text"
                    />
                    <button onClick={addTask}>Add</button>
                </div>

                <ul id="list-container">
                    {tasks.map((task, index) => (
                        <li
                            key={index}
                            className={task.completed ? 'checked' : ''}
                            onClick={() => toggleTask(index)}
                        >
                            {task.text}
                            <span onClick={(e) => {
                                e.stopPropagation();
                                deleteTask(index);
                            }}>
                                &times;
                            </span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
}

export default TodoApp;
