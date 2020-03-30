import React, { Component } from 'react';
import TaskItem from './TaskItem.js';

class TaskList extends Component{

  constructor(props) {
    super(props);
    this.state = {
      filterName : '',
      filterPortant : 3
    };  
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.props.onFilter(
      name === "filterName" ? value : this.state.filterName,
      name === "filterPortant" ? value : this.state.filterPortant
    )
    this.setState({
      [name] : value
    });
  }

  render() {

    var { tasks } = this.props;
    var { filterName, filterPortant } = this.state;
    var eleTasks = tasks.map((task,index) => {
      return <TaskItem key={ task.id } index = { index } task = { task }
        onUpdatePortant = {this.props.onUpdatePortant}
        deleteTask = {this.props.deleteTask}
        editForm = {this.props.editForm}
      />;
    }); 
    return (
        <div className="table-responsive">
          <table className="table table-hover">
            <caption>Danh sách công việc</caption>
            <thead className="thead-dark">
              <tr>
                <th scope="">STT</th>
                <th scope="col">Công việc</th>
                <th scope="col">Mức độ quan trọng</th>
                <th scope="col">Hành động</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th scope="row"></th>
                <td>
                  <input type="text" placeholder="Lọc" className="form-control"
                        name = "filterName"
                        value = {filterName}
                        onChange = { this.onChange }
                  />
                </td>
                <td>
                  <select className="custom-select"
                          name = "filterPortant"
                          value = {filterPortant}
                          onChange = { this.onChange }
                  >
                    <option value={3}>Tất cả</option>
                    <option value={0}>Làm ngay</option>
                    <option value={1}>Chưa cần làm ngay</option>
                    <option value={2}>Làm thì tốt mà không làm cũng chả sao</option>
                  </select>
                </td>
                <td></td>
              </tr>
              { eleTasks }
            </tbody>
          </table>
        </div>
    );
  }
}

export default TaskList;
