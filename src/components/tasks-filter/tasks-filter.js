import React, { Component } from 'react';

import './tasks-filter.css';

export default class TaskFilter extends Component {
  constructor() {
    super();

    this.buttons = [
      { name: 'all', label: 'All' },
      { name: 'active', label: 'Active' },
      { name: 'completed', label: 'Completed' },
    ];
  }

  render() {
    const { filter } = this.props;

    const buttons = this.buttons.map(({ name, label }) => {
      const isActiveBtn = filter === name;
      const className = isActiveBtn ? 'selected' : '';

      return (
        <li key={name}>
          <button className={className} onClick={() => this.props.onFilterChange(name)}>
            {label}
          </button>
        </li>
      );
    });

    return (
      <div>
        <ul className="filters"> {buttons} </ul>
      </div>
    );
  }
}
