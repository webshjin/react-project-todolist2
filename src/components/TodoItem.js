import React, { useContext } from 'react';
import './TodoItem.css';
import { TodoContext, TodoDispatchContext } from '../App';

const TodoItem = ({ id, isDone, content, createdDate }) => {
  const { onUpdate, onDelete } = useContext(TodoDispatchContext);
  console.log(`${id}번의 TodoItem 업데이트 된다`);
  const onChangeCheckBox = () => {
    onUpdate(id); // 수정된 TodoItem 객체를 확인하기 위해 id를 매개변수로 보낸다.
  };

  const onClickButton = () => {
    onDelete(id);
  };

  return (
    <div className="TodoItem">
      <div className="checkbox_col">
        <input type="checkbox" checked={isDone} onChange={onChangeCheckBox} />
      </div>
      <div className="title_col">{content}</div>
      <div className="date_col">{new Date(createdDate).toLocaleString()}</div>
      <div className="btn_col">
        <button onClick={onClickButton}>삭제</button>
      </div>
    </div>
  );
};

export default React.memo(TodoItem);
