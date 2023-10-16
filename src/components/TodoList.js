import React, { useContext, useMemo, useState } from 'react';
import './TodoList.css';
import TodoItem from './TodoItem';
import { TodoContext } from '../App';

const TodoList = () => {
  const { todos } = useContext(TodoContext);
  const [searchWord, setSearchWord] = useState('');

  const onChangeSearch = (e) => {
    setSearchWord(e.target.value);
  };

  const getSearchResult = () => {
    return searchWord === ''
      ? todos
      : todos.filter((todo) => todo.content.includes(searchWord));
  };

  const analyzeTodos = useMemo(() => {
    // console.log('Analyzing....');
    const totalCnt = todos.length;
    const doneCnt = todos.filter((todo) => todo.isDone).length;
    const notDoneCnt = totalCnt - doneCnt;

    return {
      totalCnt,
      doneCnt,
      notDoneCnt,
    };
  }, [todos]); // todos가 바뀌지 않는 한 totalCnt, doneCnt, notDoneCnt는 memo된다(저장)

  const { totalCnt, doneCnt, notDoneCnt } = analyzeTodos; // 저장(memo)되어있는 객체를 구조분해할당

  return (
    <div className="TodoList">
      <h4>해야 할 일들</h4>
      <input
        type="text"
        placeholder="검색할 할일..."
        className="searchBar"
        onChange={onChangeSearch}
        value={searchWord}
      />
      <div className="anaylzeTodo">
        <div>해야 할일 총 갯수 : {totalCnt}</div>
        <div>할일 완료 갯수 : {doneCnt}</div>
        <div>완료하지 못한 일 갯수 : {notDoneCnt}</div>
      </div>
      <div className="list_wrapper">
        {getSearchResult().map((todo) => (
          <TodoItem key={todo.id} {...todo} />
        ))}
      </div>
    </div>
  );
};

TodoList.defaultProps = {
  todos: [],
};

export default TodoList;
