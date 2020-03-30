import React, { Component } from 'react';

class TaskItem extends Component{

  onUpdatePortant = () => {
    this.props.onUpdatePortant(this.props.task.id);
  }

  deleteTask = () => {
    this.props.deleteTask(this.props.task.id);
  }

  editForm = () => {
    this.props.editForm(this.props.task.id);
  }

  render() {
    var { task, index } = this.props;
    var show;
    if (Number(task.portant) === 0) {
        show = 'Làm ngay';
    }
    else if (Number(task.portant) === 1) {
      show = 'Chưa cần làm ngay';
    }
    else if (Number(task.portant) === 2) { 
      show = 'Làm thì tốt mà không làm cũng chả sao';
    }
    function showColor() {
      if (Number(task.portant) === 0) {
        return 'badge badge-pill badge-danger';
      }
      else if (Number(task.portant) === 1) {
        return 'badge badge-pill badge-warning';
      }
      else if (Number(task.portant) === 2) { 
        return 'badge badge-pill badge-primary';
      }
    }
    return (
        <tr>
          <th scope="row">{index+1}</th>
          <td>{task.name}</td>
          <td>
            <span className={ showColor() }
                  onClick = {this.onUpdatePortant}
            >{show}</span>
          </td>
          <td>
            <div className="btn-group" role="group" aria-label="Basic example">
              <button type="button" className="btn btn-warning"
                onClick = {this.editForm}
              ><i className="fas fa-pen"></i> Sửa</button>
              <button type="button" className="btn btn-danger"
                onClick = {this.deleteTask}
              ><i className="fas fa-trash-alt"></i> Xóa</button>
            </div>
          </td>
        </tr>
    );
  }
}

export default TaskItem;
