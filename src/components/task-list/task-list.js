import React, { Component } from 'react';

import './task-list.css';
import Task from '../task';

const TaskList = ({ todos, onDeleted, onToggleDone, onToggleEdit, addEditedItem }) => {
  const elements = todos.map((item, i) => {
    const { createdTime, id } = item;

    return (
      <Task
        item={item}
        key={id}
        index={i}
        onDeleted={() => onDeleted(id)}
        onToggleDone={() => {
          onToggleDone(id);
        }}
        onToggleEdit={() => {
          onToggleEdit(id);
        }}
        addEditedItem={addEditedItem}
        createdTime={createdTime}
      />
    );
  });

  return <ul className="todo-list">{elements}</ul>;
};

export default TaskList;
