import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import './index.css';

import NewTaskForm from './components/new-task-form';
import Footer from './components/footer';
import TaskList from './components/task-list';

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

  createTodoItem(description) {
    return {
      description,
      id: this.maxId++,
      createdTime: 'created 0 seconds / 0 minutes ago',
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
    if (text.trim() === '') {
      return alert('Task name is empty, please try again');
    }

    const newItem = this.createTodoItem(text);

    this.setState(({ todoData }) => {
      const newArray = [...todoData, newItem];
      return {
        todoData: newArray,
      };
    });
  };

  toggleProperty = (arr, id, propName) => {
    const idx = arr.findIndex((el) => el.id === id);
    const oldItem = arr[idx];
    const newItem = { ...oldItem, [propName]: !oldItem[propName] };
    return [...arr.slice(0, idx), newItem, ...arr.slice(idx + 1)];
  };

  editItem = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'editing'),
      };
    });
  };

  onToggleDone = (id) => {
    this.setState(({ todoData }) => {
      return {
        todoData: this.toggleProperty(todoData, id, 'completed'),
      };
    });
  };

  search = (items, term) => {
    if (term.length === 0) {
      return items;
    }

    return items.filter((item) => {
      return item.description.toLowerCase().indexOf(term.toLowerCase()) > -1;
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
            editItem={this.editItem}
          />
          <Footer
            todos={todoData}
            counterCompletedTasks={completedTasks}
            filter={filter}
            onFilterChange={this.onFilterChange}
            clearCompleted={this.clearCompleted}
          />
        </section>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
