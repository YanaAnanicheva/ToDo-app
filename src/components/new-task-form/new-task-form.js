import React, { Component } from 'react';

import './new-task-form.css';

export default class NewTaskForm extends Component {
  constructor() {
    super();
    this.state = {
      label: '',
    };

    this.onLabelChange = (e) => {
      this.setState({
        label: e.target.value,
      });
    };

    this.onSubmit = (e) => {
      e.preventDefault();
      this.props.addItem(this.state.label);
      this.setState({
        label: '',
      });
    };
  }

  render() {
    return (
      <form className="item-add-form d-flex" onSubmit={this.onSubmit}>
        <input
          type="text"
          className="new-todo"
          onChange={this.onLabelChange}
          placeholder="What needs to be done?"
          value={this.state.label}
        />
      </form>
    );
  }
}
