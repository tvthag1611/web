import React, { Component } from 'react';

class Search extends Component{

  constructor(props) {
    super(props);
    this.state = {
      keyword : ''
    };
  }

  onChange = (event) => {
    var target = event.target;
    var name = target.name;
    var value = target.value;
    this.setState ({
      [name] : value
    });
  }

  onSearch = () => {
    this.props.onSearch(this.state.keyword);
  }

  render() {
    return (
        <div className="input-group mb-3">
          <input type="text" className="form-control" placeholder="Search"
                name = "keyword"
                value={this.state.keyword}
                onChange = {this.onChange}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="button"
                    onClick = {this.onSearch}
            ><i className="fas fa-search"></i></button>  
          </div>
        </div>
    );
  }
}

export default Search;
