import React, { Component } from 'react';
import './App.css';
import TaskForm from './components/TaskForm.js';
import TaskList from './components/TaskList.js';
import Control from './components/Control.js';

class App extends Component{

  constructor(props) {
    super(props);
    this.state = {
      tasks : [],
      isDisplayForm : false,
      taskEditing : null,
      filter : {
        name : '',
        portant : 3
      },
      keyword : '',
      sortBy : 'name',
      sortValue : 0
    };
  }

  componentWillMount() {
    if (localStorage && localStorage.getItem('tasks')) {
      var tasks = JSON.parse(localStorage.getItem('tasks'));
      this.setState({
        tasks : tasks
      });
    }
  }

  s4() {
    return Math.floor((1+Math.random()) * 0x10000).toString(16).substring(1);
  }

  generateID() {
    return this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4() + '-' + this.s4()
    + '-' + this.s4() + '-' + this.s4() + '-' + this.s4();
  }

  showTaskForm = () => {
    if (this.state.isDisplayForm && this.state.taskEditing !== null) {
      this.setState({
        isDisplayForm : true,
        taskEditing : null
      });
    }
    else {
      this.setState({
        isDisplayForm : !this.state.isDisplayForm,
        taskEditing : null
      });
    }
  }

  hiddenForm = () => {
    this.setState({
      isDisplayForm : false
    });
  }

  showForm = () => {
    this.setState({
      isDisplayForm : true
    });
  }

  onSubmit = (data) => {
    var {tasks} = this.state;
    if (data.id === '') {
      data.id = this.generateID();
      tasks.push(data);
    }
    else {
      var index = this.findIndex(data.id);
      tasks[index] = data;
    }
    this.setState({
      tasks : tasks,
      taskEditing : null
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
  }

  onUpdatePortant = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks[index].portant = Number(tasks[index].portant);
      tasks[index].portant = tasks[index].portant+1;
      if (tasks[index].portant > 2) {
        tasks[index].portant = 0;
      }
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
    }
  }

  deleteTask = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    if (index !== -1) {
      tasks.splice(index, 1);
      this.setState({
        tasks : tasks
      });
      localStorage.setItem('tasks',JSON.stringify(tasks));
      this.hiddenForm();
    }
  }

  editForm = (id) => {
    var { tasks } = this.state;
    var index = this.findIndex(id);
    var taskEditing = tasks[index];
    this.setState({
      taskEditing : taskEditing
    });
    this.showForm();
  }

  findIndex = (id) => {
    var { tasks } = this.state;
    var result=-1;
    tasks.forEach((task, index) => {
      if (task.id === id) {
        result = index;
      }
    });
    return result;
  }

  onFilter = (filterName, filterPortant) => {
    filterPortant = Number(filterPortant);
    this.setState({
      filter : {
        name : filterName.toLowerCase(),
        portant : filterPortant
      }
    });
  }

  onSearch = (keyword) => {
    this.setState({
      keyword : keyword
    });
  }

  onSort = (sortBy, sortValue) => {
    this.setState({
      sortBy : sortBy,
      sortValue : sortValue
    });
  }

  render() {
    var {tasks, isDisplayForm, filter, keyword, sortBy, sortValue} = this.state;
    if (filter) {
      if (filter.name) {
        tasks = tasks.filter((task) => {
          return task.name.toLowerCase().indexOf(filter.name) !== -1;
        });
      }
      tasks = tasks.filter((task) => {
        if (filter.portant === 3) {
          return task;
        }
        else return task.portant === filter.portant;
      });
    }
    if (keyword) {
      tasks = tasks.filter((task) => {
        return task.name.toLowerCase().indexOf(keyword) !== -1;
      });
    }

    if (sortBy === 'name') {
      tasks.sort((a,b) => {
        if (a.name > b.name) return sortValue;
        else if (a.name < b.name) return -sortValue;
        else return 0;
      });
    }
    else {
      tasks.sort((a,b) => {
        if (a.portant > b.portant) return sortValue;
        else if (a.portant < b.portant) return -sortValue;
        else return 0;
      });
    }

    var showtf = isDisplayForm 
    ? <TaskForm onSubmit={this.onSubmit}
                statusForm = { this.hiddenForm }
                task = {this.state.taskEditing}
                /> 
    : '';
    return (
        <div className="container">
          {/*tieu de*/}
          <h1>
            QUẢN LÝ CÔNG VIỆC
            <small className="text-muted">tvthag</small><hr />
          </h1>
          {/*--------------------*/}
          <div className="row">
            <div className={isDisplayForm ? 'col-lg-4 col-md-4 col-sm-4' : ''}>
            {/*them cong viec*/}
              {showtf}
            {/*--------------------*/}
            </div>
            <div className={isDisplayForm ? 'col-lg-8 col-md-8 col-sm-8' : 'col-lg-12 col-md-12 col-sm-12'}>
              {/*nut them cong viec*/}
              <button type="button" className="btn btn-primary btn_open"
                onClick = {this.showTaskForm}
              >
                <i className="fas fa-plus"></i> Thêm công việc 
              </button>
              {/*search va sort*/}
              <Control onSearch = {this.onSearch}
                        onSort = {this.onSort}
                        sortBy = {sortBy}
                        sortValue ={sortValue}
              />
              {/*------------------------*/}
              <TaskList tasks = { tasks } onUpdatePortant = {this.onUpdatePortant}
                                          deleteTask = {this.deleteTask}
                                          editForm = {this.editForm}
                                          onFilter = {this.onFilter}
              />
            </div>
          </div>
        </div>
    );
  }
}

export default App;
