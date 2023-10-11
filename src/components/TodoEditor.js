import React, { useRef, useState } from 'react';
import './TodoEditor.css';

const TodoEditor = ({ onCreate }) => {
  const [content, setContent] = useState('');
  const [isError, setIsError] = useState(false);
  const contentRef = useRef(); // input type="text" DOM을 참조하는 ref

  const onChangeContent = (e) => {
    // console.log('content', e.target.value);
    setContent(e.target.value);
  };

  const onSubmit = () => {
    if (!content) {
      contentRef.current.focus();
      setIsError(true);
      return;
    }
    setIsError(false);
    onCreate(content);
    setContent('');
  };

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      onSubmit();
    }
  };

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
        <input
          ref={contentRef}
          type="text"
          placeholder="새로운 할일..."
          onChange={onChangeContent}
          onKeyDown={onKeyDown}
          value={content}
        />
        <button onClick={onSubmit}>추가</button>
      </div>
      {isError && <div className="errorMsg">할일을 입력하셈!</div>}
    </div>
  );
};

export default TodoEditor;
