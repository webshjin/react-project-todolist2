import './App.css';
import Header from './components/Header';
import TodoEditor from './components/TodoEditor';
import TodoList from './components/TodoList';

function App() {
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
