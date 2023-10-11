import { useState } from 'react';
import './App.css';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';

const mockupTodos = [
  {
    id: 0,
    isDone: false,
    content: '빨래하기',
    createdDate: new Date().getTime(),
  },

  {
    id: 1,
    isDone: true,
    content: '수업하기',
    createdDate: new Date().getTime(),
  },
];

function App() {
  const [todos, setTodos] = useState(mockupTodos);
  return (
    <div className="App">
      <div>
        <Header />
      </div>
      <div>
        <TodoEditor />
      </div>
      <div>
        <TodoList />
      </div>
    </div>
  );
}

export default App;
