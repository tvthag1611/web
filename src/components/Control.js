import React, { Component } from 'react';
import Search from './Search.js';
import Sort from './Sort.js';

class Control extends Component{

  render() {
    return (
        <div className="row">
          <div className="col-sm-8 col-md-8 col-lg-8">
            <Search onSearch = {this.props.onSearch}/>
          </div>
          <div className="col-sm-4 col-md-4 col-lg-4">
            <Sort onSort = {this.props.onSort}
                  sortBy = {this.props.sortBy}
                  sortValue = {this.props.sortValue}
            />
          </div>
        </div>
    );
  }
}

export default Control;
