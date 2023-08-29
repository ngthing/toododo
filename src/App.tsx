import React, { useState } from 'react';
import './App.css';

interface TodoItemProps {
  content: string;
  isCompleted: boolean;
  index: number;
  onChange: (content: string, i: number) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, i: number) => void;
};

const TodoItem = (ps: TodoItemProps) => (
  <div className="todo">
    <div className="checkbox" />
    <input type="text" value={ps.content} id={`todo-input-${ps.index}`}
      onKeyDown={(e) => ps.handleKeyDown(e, ps.index)}
      onChange={(e) => ps.onChange(e.target.value, ps.index)} />
    <button className="btn-action">x</button>
  </div>
)
function App() {
  const [todos, setTodos] = useState([
    {
      content: '"Enter" in any todo to add a new todo below it',
      isCompleted: true,
    },
    {
      content: 'Or Click + to add a todo in the bottom of the list',
      isCompleted: false,
    },
    {
      content: 'Build a todo app in React',
      isCompleted: false,
    }
  ]);
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, i: number) => {
    if (e.key === 'Enter') createTodoAtIndex(i + 1);
  }
  const createTodoAtIndex = (i: number) => {
    const newTodos = [...todos];
    newTodos.splice(i, 0, {
      content: '',
      isCompleted: false,
    });
    setTodos(newTodos);
    setTimeout(() => {
      (document.getElementById(`todo-input-` + i) as HTMLElement).focus();
    }, 0);
  }
  const updateTodoAtIndex = (content: string, i: number) => {
    const newTodos = [...todos];
    newTodos[i].content = content;
    setTodos(newTodos);
  }
  return (
    <div className="app">
      <div className="todo-list-container">
        <ul className="todo-list">
          {todos.map((todo, i) => (
            <TodoItem key={`todo-` + i} {...todo} index={i} onChange={updateTodoAtIndex} handleKeyDown={handleKeyDown}></TodoItem>
          ))}
        </ul>

        <button className="btn-action" onClick={() => createTodoAtIndex(todos.length)}>+</button>
      </div>
    </div >
  );
}

export default App;