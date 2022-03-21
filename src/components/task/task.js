import React, { Component } from 'react';
import { format } from 'date-fns';
import './task.css';

export default class Task extends Component {
  state = {
    description: this.props.description,
  };

  onLabelChange = (e) => {
    this.setState({
      description: e.target.value,
    });
  };

  onSubmit = (e) => {
    e.preventDefault();
    this.props.editItem(this.state.description);
  };

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 1000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      createdTime: `created ${format(new Date() - this.props.createdDate, 's')} seconds / ${format(
        new Date() - this.props.createdDate,
        'm'
      )} minutes ago`,
    });
  }

  render() {
    const { onDeleted, editItem, onToggleDone, completed, editing } = this.props;

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
            <span className="description">{this.props.description}</span>
            <span className="created">{this.state.createdTime}</span>
          </label>
          <button className="icon icon-edit" onClick={editItem} />
          <button className="icon icon-destroy" onClick={onDeleted} />
        </div>
        <form onSubmit={this.onSubmit}>
          <input type="text" className="edit" defaultValue={this.state.description} onChange={this.onLabelChange} />
        </form>
      </li>
    );
  }
}
