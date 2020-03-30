import React, { Component } from 'react';

class Sort extends Component{

  onClick = (sortBy, sortValue) => {
    this.props.onSort(sortBy, sortValue);
  }

  render() {
    return (
        <div className="dropdown">
          <button className="btn btn-primary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
            Sắp xếp
          </button>
          <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
            <button className={this.props.sortBy === 'name' && this.props.sortValue === 1 ? 'dropdown-item sort_selected'
              : 'dropdown-item'}
                onClick = {() => this.onClick('name', 1)}
            >Từ A <i className="fas fa-arrow-right"></i> Z</button>
            <button className={this.props.sortBy === 'name' && this.props.sortValue === -1 ? 'dropdown-item sort_selected'
              : 'dropdown-item'}
                onClick = {() => this.onClick('name', -1)}
            >Từ Z <i className="fas fa-arrow-right"></i> A</button>
            <button className={this.props.sortBy === 'portant' && this.props.sortValue === 1 ? 'dropdown-item sort_selected'
              : 'dropdown-item'}
                onClick = {() => this.onClick('portant', 1)}
            >Theo mức độ quan trọng</button>
          </div>
        </div>
    );
  }
}

export default Sort;
