import React, { Component } from 'react';
import { formatDistanceToNow } from 'date-fns';
import './task.css';

export default class Task extends Component {
  createDateTask = Date.now();

  handleChange = (event) => {
    const { item, addEditedItem } = this.props;
    const newItem = { ...item };

    newItem.label = event.target.value;
    newItem.editing = false;

    addEditedItem(item.id, newItem);
  };

  handleChangeKey = (event) => {
    if (event.key === 'Enter') {
      this.handleChange(event);
    }
  };

  render() {
    const { onDeleted, onToggleEdit, onToggleDone, item } = this.props;
    const { label, completed, editing } = item;

    let className = '';
    if (completed) {
      className = 'completed';
    }
    if (editing) {
      className = 'editing';
    }

    return (
      <li className={className}>
        <div className="view">
          <input className="toggle" type="checkbox" onChange={onToggleDone} />
          <label>
            <span className="description">{label} </span>
            <span className="created">
              created {formatDistanceToNow(this.createDateTask, { includeSeconds: true })} ago
            </span>
          </label>
          <button className="icon icon-edit" onClick={onToggleEdit} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <input
          type="text"
          className="edit"
          defaultValue={label}
          onBlur={this.handleChange}
          onKeyPress={this.handleChangeKey}
        />
      </li>
    );
  }
}
