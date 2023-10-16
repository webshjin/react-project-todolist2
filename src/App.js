import {
  createContext,
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from 'react';
import './App.css';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';

export const TodoStateContext = createContext(); // context 객체 생성 (todos를 위한)
export const TodoDispatchContext = createContext(); // context 객체 생성 (dispatch함수들을 위한)

// state : 상태변화될데이터(State), 여기에서는 todos
// action : State를 어떻게 변화 시킬 것이냐(dispatch()로부터 넘겨져온 매개변수(객체)를 받음)
function reducer(state, action) {
  switch (action.type) {
    case 'init': {
      return action.data;
    }
    case 'create': {
      const newTodos = [action.newTodo, ...state];
      localStorage.setItem('TodoList', JSON.stringify(newTodos));
      return newTodos;
    }
    case 'update': {
      const updatedTodos = state.map((todo) =>
        todo.id === action.id ? { ...todo, isDone: !todo.isDone } : todo,
      );
      localStorage.setItem('TodoList', JSON.stringify(updatedTodos));
      return updatedTodos;
    }
    case 'delete': {
      const deletedTodos = state.filter((todo) => todo.id !== action.id);
      localStorage.setItem('TodoList', JSON.stringify(deletedTodos));
      return deletedTodos;
    }

    default:
      return state;
  }
}

function App() {
  // const [todos, setTodos] = useState(mockupTodos); // State 훅으로 상태 관리

  // todos라는 데이터가 상태 변화 될 때 reducer 함수로 변화하는 로직을 관리 하겠다.
  // todos라는 상태는 초기값으로 mockupTodos를 가지게 된다.
  const [todos, dispatch] = useReducer(reducer, []);
  const idRef = useRef(2);

  useEffect(() => {
    const rawData = localStorage.getItem('TodoList');
    const todosData = JSON.parse(rawData);
    if (todosData.length === 0) {
      return;
    }
    dispatch({
      type: 'init',
      data: todosData,
    });
  }, []);

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

  const memoizedDispatches = useMemo(
    () => ({ onCreate, onUpdate, onDelete }),
    [],
  );

  return (
    <div className="App">
      <Header />
      <TodoStateContext.Provider value={{ todos }}>
        <TodoDispatchContext.Provider value={memoizedDispatches}>
          <TodoEditor />
          <TodoList />
        </TodoDispatchContext.Provider>
      </TodoStateContext.Provider>
    </div>
  );
}

export default App;
