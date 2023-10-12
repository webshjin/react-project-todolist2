import React from 'react';
import './TodoItem.css';

const TodoItem = ({ id, isDone, content, createdDate }) => {
  return (
    <div className="TodoItem">
      <div className="checkbox_col">
        <input type="checkbox" checked={isDone} defaultChecked={false} />
      </div>
      <div className="title_col">{content}</div>
      <div className="date_col">{new Date(createdDate).toLocaleString()}</div>
      <div className="btn_col">
        <button>삭제</button>
      </div>
    </div>
  );
};

export default TodoItem;
