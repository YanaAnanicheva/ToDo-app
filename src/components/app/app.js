import React, { Component } from 'react';

import './app.css';

import NewTaskForm from '../new-task-form';
import Footer from '../footer';
import TaskList from '../task-list';

export default class App extends Component {
  maxId = 100;

  state = {
    todoData: [
      this.createTodoItem('Drink Coffee'),
      this.createTodoItem('Create New App'),
      this.createTodoItem('Read about 27 Club'),
    ],
    term: '',

    filter: 'all',
  };

  createTodoItem(label) {
    return {
      label,
      id: this.maxId++,
      createdDate: new Date(),
      completed: false,
      editing: false,
    };
  }

  deleteItem = (id) => {
    this.setState(({ todoData }) => {
      const idx = todoData.findIndex((el) => el.id === id);
      const newArray = [...todoData.slice(0, idx), ...todoData.slice(idx + 1)];

      return {
        todoData: newArray,
      };
    });
  };

  addItem = (text) => {
    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      newArr.push(newItem);
      return {
        todoData: newArr,
      };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  onToggleEdit = (id) => {
    this.setState(({ todoData }) => ({
      todoData: this.toggleProperty(todoData, id, 'editing'),
    }));
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      };
    });
  };

  addEditedItem = (id, updateItem) => {
    this.setState(({ todoData }) => {
      const newArr = [...todoData];
      const ind = newArr.findIndex((el) => el.id === id);
      newArr[ind] = updateItem;
      return {
        todoData: newArr,
      };
    });
  };

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.label.toLowerCase().indexOf(term.toLowerCase()) > -1;
    });
  };

  filter = (items, filter) => {
    if (filter === 'all') {
      return items;
    }
    if (filter === 'active') {
      return items.filter((item) => !item.completed);
    }
    if (filter === 'completed') {
      return items.filter((item) => item.completed);
    }
    return items;
  };

  clearCompleted = () => {
    this.setState(({ todoData }) => {
      const newArray = todoData.filter((item) => !item.completed);
      return {
        todoData: newArray,
      };
    });
  };

  onFilterChange = (filter) => {
    this.setState({ filter });
  };

  render() {
    const { todoData, term, filter } = this.state;
    const visibleItems = this.filter(this.search(todoData, term), filter);
    const completedTasks = this.state.todoData.filter((elem) => !elem.completed).length;

    return (
      <div>
        <section className="main">
          <header className="header">
            <h1 className="header-title">ToDos</h1>
          </header>
          <NewTaskForm addItem={this.addItem} />
          <TaskList
            todos={visibleItems}
            onDeleted={this.deleteItem}
            onToggleDone={this.onToggleDone}
            onToggleEdit={this.onToggleEdit}
            addEditedItem={this.addEditedItem}
          />
          <Footer
            completedTasksCount={completedTasks}
            itemStatusFilter={this.filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </div>
    );
  }
}
