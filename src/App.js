import React, { Component } from 'react';
import './App.css';
import TodoList from './component/TodoList'

import checkAllImg from './img/check-all.svg';

class App extends Component {
  constructor() {
    super();
    this.state = {
      inputAddValue: "",
      todoList: [
        { title: "mua đùi gà", isCompleted: true },
        { title: "chiên đùi gà", isCompleted: false },
        { title: "chiên cơm", isCompleted: false }
      ],
    }
    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyEnter = this.onInputKeyEnter.bind(this);
    this.onImgCheckAllClick = this.onImgCheckAllClick.bind(this);
  }

  onItemClicked = (even, item) => {
    let index = this.state.todoList.indexOf(item);
    const newList = [...this.state.todoList];
    newList[index].isCompleted = !newList[index].isCompleted;
    this.setState({
      todoList: newList,
    });
  }
  onInputChange(even) {
    this.setState(
      { inputAddValue: even.target.value }
    );
  }
  onInputKeyEnter(even) {
    if (even.key === 'Enter' || even.keyCode === 13) {
      let newTodoList = [
        ...this.state.todoList,
        { title: this.state.inputAddValue, isCompleted: false },
      ];
      this.setState(
        {
          todoList: newTodoList,
          inputAddValue: "",
        }
      );
    }
  }
  onImgCheckAllClick(even){
    let {todoList} = this.state;
    let isCheckAll = (todoList.find((item) => item.isCompleted === false)) ? false : true;
    let todoListCheckedAll = todoList.map((item) => {
      item.isCompleted = !isCheckAll;
      return item;
    });
    this.setState(
      { 
        checkAllItems: !isCheckAll,
        todoList: todoListCheckedAll
      }
    );
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
    );
  }
}

export default App;
