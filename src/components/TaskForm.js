import React, { Component } from 'react';

class TaskForm extends Component{

  constructor(props) {
    super(props);
    this.state = {
      id : '',
      name : '',
      portant: 0
    };  
  }

  componentWillMount() {
    if (this.props.task) {
      this.setState({
        id : this.props.task.id,
        name : this.props.task.name,
        portant : Number(this.props.task.portant)
      });
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps && nextProps.task) {
      this.setState({
        id : nextProps.task.id,
        name : nextProps.task.name,
        portant : Number(nextProps.task.portant)
      });
    }
    else if (nextProps && nextProps.task === null) {
      this.setState({
        id : '',
        name : '',
        portant : 0
      });
    }
  }

  hiddenFormTrue = () => {
    this.props.statusForm();
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState({
      [name] : value
    });
  }

  onSubmit = (event) => {
    event.preventDefault();
    this.props.onSubmit(this.state);
    this.onClear();
    this.hiddenFormTrue();
  }

  onClear = () => {
    this.setState({
      name : '',
      portant: 0
    });  
  }

  render() {
    var { id } = this.state;
    return (
        <div className="alert alert-primary alert-dismissible fade show" role="alert">
          <button type="button" className="close"
            onClick = {this.hiddenFormTrue}
          >&times;</button>
          <strong>{ id !== '' ? 'Chỉnh sửa công việc' : 'Thêm công việc mới'}</strong>
          <form className="add_new" onSubmit={this.onSubmit}>
            <div className="form-row">
              <div className="row">
                <span className="label label-default">Việc mới:</span><br />
                <input type="text" className="form-control"
                  name="name"
                  value={this.state.name}
                  onChange = {this.onChange}
                />
              </div>
              <div className="row">
              <span className="label label-default">Mức độ cần thiết:</span><br />
                <select className="custom-select"
                  name="portant"
                  value={this.state.portant}
                  onChange = {this.onChange}
                >
                  <option value={0}>Làm ngay</option>
                  <option value={1}>Chưa cần làm ngay</option>
                  <option value={2}>Làm thì tốt mà không làm cũng chả sao</option>
                </select>
              </div>
              <div className="row btn_add">
                <button type="submit" className="btn btn-warning"><i className="fas fa-plus"></i> Lưu lại</button>
                <button type="button" className="btn btn-danger" onClick = {this.onClear}>
                <i className="fas fa-times"></i> Hủy bỏ</button>
              </div>
            </div>
          </form>
        </div>
    );
  }
}

export default TaskForm;
