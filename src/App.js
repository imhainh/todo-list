import React, { Component } from 'react';
import './App.css';
import TodoList from './component/TodoList'

class App extends Component {
  constructor() {
    super();
    this.state = {
      todoList: [
        { title: "mua đùi gà", isCompleted: true },
        { title: "chiên đùi gà", isCompleted: false },
        { title: "chiên cơm", isCompleted: false }
      ],
    }
  }

  onItemClicked = (even, item) => {
    let index = this.state.todoList.indexOf(item);
    const newList = [...this.state.todoList];
    newList[index].isCompleted = !newList[index].isCompleted;
    this.setState({
      todoList: newList,
    });
  }
  render() {
    return (
      <div className="App">
        {
          this.state.todoList.map((item, index) => {
            return (
              <TodoList key={index} 
              todoItem={item} 
              onClick={(even)=>this.onItemClicked(even, item)} />
            );
          })
        }
      </div>
    );
  }
}

export default App;
