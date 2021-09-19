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

    this.inputElement = React.createRef(); // learn React.createRef() B1: inputElement là 1 React Ref (tham chiếu) chứ ko phải input DOM
    // https://vi.reactjs.org/docs/refs-and-the-dom.html
    // https://www.youtube.com/watch?v=AYpgu9Clof0&list=PLkY6Xj8Sg8-vV5kALCOT0LShKc6mVFBvW&index=21&ab_channel=CodersX

    this.onInputChange = this.onInputChange.bind(this);
    this.onInputKeyEnter = this.onInputKeyEnter.bind(this);
    this.onImgCheckAllClick = this.onImgCheckAllClick.bind(this);
  }
  componentDidMount() {
    this.inputElement.current.focus(); // learn React.createRef() B3: focus trỏ chuột vào ô input
  }
  setTodoList(newTodoList) {
    this.setState({ todoList: newTodoList });
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
      this.setState({ inputAddValue: "" });
    }
  }
  onImgCheckAllClick(even) {
    let { todoList } = this.state;
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
            ref={this.inputElement} // learn React.createRef() B2: gán React Ref (tham chiếu) vào input với thuộc tính ref
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
