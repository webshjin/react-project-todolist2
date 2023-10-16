import {
  createContext,
  useCallback,
  useReducer,
  useRef,
  useState,
} from 'react';
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

export const TodoContext = createContext(); // context 객체 생성

// state : 상태변화될데이터(State), 여기에서는 todos
// action : State를 어떻게 변화 시킬 것이냐(dispatch()로부터 넘겨져온 매개변수(객체)를 받음)
function reducer(state, action) {
  switch (action.type) {
    case 'create': {
      return [action.newTodo, ...state];
    }
    case 'update': {
      return state.map((todo) =>
        todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo,
      );
    }
    case 'delete': {
      return state.filter((todo) => todo.id !== action.id);
    }

    default:
      return state;
  }
}

function App() {
  // const [todos, setTodos] = useState(mockupTodos); // State 훅으로 상태 관리

  // todos라는 데이터가 상태 변화 될 때 reducer 함수로 변화하는 로직을 관리 하겠다.
  // todos라는 상태는 초기값으로 mockupTodos를 가지게 된다.
  const [todos, dispatch] = useReducer(reducer, mockupTodos);
  const idRef = useRef(2);

  const onCreate = (content) => {
    // 입력받은 content를 멤버로 하는 새로운 할일 객체 생성
    dispatch({
      type: 'create',
      newTodo: {
        id: idRef.current,
        content: content,
        isDone: false,
        createdDate: new Date().getTime(),
      },
    });

    idRef.current += 1;
  };

  const onUpdate = useCallback((id) => {
    dispatch({
      type: 'update',
      id: id,
    });
  }, []);

  const onDelete = useCallback((id) => {
    dispatch({
      type: 'delete',
      id: id,
    });
  }, []);

  return (
    <div className="App">
      <Header />
      <TodoContext.Provider
        value={{
          todos,
          onCreate,
          onUpdate,
          onDelete,
        }}
      >
        <TodoEditor />
        <TodoList />
      </TodoContext.Provider>
    </div>
  );
}

export default App;
