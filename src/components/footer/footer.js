import React from 'react';

import './footer.css';
import TaskFilter from '../tasks-filter';

const Footer = ({ counterCompletedTasks, todos, filter, onFilterChange, clearCompleted }) => {
  const taskCounter = counterCompletedTasks;

  return (
    <footer className="footer">
      <span className="todo-count">{taskCounter} items left</span>
      <TaskFilter todos={todos} filter={filter} onFilterChange={onFilterChange} />
      <button className="clear-completed" onClick={() => clearCompleted()}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
