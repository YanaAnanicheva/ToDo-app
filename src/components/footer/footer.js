import React from 'react';

import './footer.css';
import TaskFilter from '../tasks-filter';

const Footer = ({ completedTasksCount, itemStatusFilter, onFilterChange, clearCompleted }) => {
  return (
    <footer className="footer">
      <span className="todo-count">{completedTasksCount} items left</span>
      <TaskFilter itemStatusFilter={itemStatusFilter} onFilterChange={onFilterChange} />
      <button className="clear-completed" type="button" onClick={clearCompleted}>
        Clear completed
      </button>
    </footer>
  );
};

export default Footer;
