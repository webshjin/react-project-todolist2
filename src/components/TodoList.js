import React from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';

const TodoList = () => {
  return (
    <div className="TodoList">
      <h4>해야 할 일들</h4>
      <input type="text" placeholder="검색할 할일..." className="searchBar" />
      <div className="list_wrapper">
        <TodoItem />
        <TodoItem />
        <TodoItem />
      </div>
    </div>
  );
};

export default TodoList;
