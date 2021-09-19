import React, { Component } from 'react';
import './App.css';
import TodoList from './component/TodoList'

import checkAllImg from './img/check-all.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputAddValue: "",
      todoList: this.getTodoList() ? this.getTodoList() : []
    }
    
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyEnter = this.onInputKeyEnter.bind(this);
    this.onImgCheckAllClick = this.onImgCheckAllClick.bind(this);
  }
  setTodoList(newTodoList) {
    this.setState({todoList: newTodoList});
    localStorage.setItem('todoList', JSON.stringify(newTodoList));
  }
  getTodoList() {
    return JSON.parse(localStorage.getItem('todoList'));
  }
  onItemClicked = (even, item) => {
    let index = this.state.todoList.indexOf(item);
    const newList = [...this.state.todoList];
    newList[index].isCompleted = !newList[index].isCompleted;
    this.setTodoList(newList);
  }
  onInputChange(even) {
    this.setState({ inputAddValue: even.target.value });
  }
  onInputKeyEnter(even) {
    if (even.key === 'Enter' || even.keyCode === 13) {
      let newTodoList = [
        ...this.state.todoList,
        { title: this.state.inputAddValue, isCompleted: false },
      ];
      this.setTodoList(newTodoList);
      this.setState({inputAddValue: ""});
    }
  }
  onImgCheckAllClick(even){
    let {todoList} = this.state;
    let isCheckAll = (todoList.find((item) => item.isCompleted === false)) ? false : true;
    let todoListCheckedAll = todoList.map((item) => {
      item.isCompleted = !isCheckAll;
      return item;
    });
    this.setTodoList(todoListCheckedAll);
  }
  render() {
    return (
      <div className="App">
        <div className="header">
          <img src={checkAllImg} alt="checkAllImg" 
          width={32} height={32} 
          onClick={this.onImgCheckAllClick} />
          <input placeholder="Add new item"
            value={this.state.inputAddValue}
            onChange={this.onInputChange}
            onKeyUp={this.onInputKeyEnter} />
        </div>
        <div className="content">
          {
            this.state.todoList.map((item, index) => {
              return (
                <TodoList key={index}
                  todoItem={item}
                  onClick={(even) => this.onItemClicked(even, item)} />
              );
            })
          }
        </div>
      </div>
    );
  }
}

export default App;
