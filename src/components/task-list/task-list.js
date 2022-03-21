import React, { Component } from 'react';

import './task-list.css';
import Task from '../task';

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleDone, editItem } = this.props;
    const elements = todos.map((item) => {
      const { id, createdTime, ...itemProps } = item;

      return (
        <Task
          key={id}
          {...itemProps}
          onDeleted={() => onDeleted(id)}
          onToggleDone={() => onToggleDone(id)}
          editItem={() => editItem(id)}
          createdTime={createdTime}
        />
      );
    });

    return <ul className="todo-list">{elements}</ul>;
  }
}
