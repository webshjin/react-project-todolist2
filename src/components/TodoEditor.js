import React from 'react';
import './TodoEditor.css';

const TodoEditor = () => {
  return (
    <div className="TodoEditor">
      <h4>
        새로운 할 일 작성하기
        <img
          src="https://img.icons8.com/emoji/48/pencil-emoji.png"
          alt="icon-pencil"
        />
      </h4>
      <div className="editor_wrapper">
        <input type="text" placeholder="새로운 할일..." />
        <button>추가</button>
      </div>
    </div>
  );
};

export default TodoEditor;
