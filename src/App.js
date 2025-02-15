import React, { useState, useEffect } from 'react';
import TodoList from './TodoList'; // TodoList をインポート

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');

  // ローカルストレージからToDoリストを取得
  useEffect(() => {
    const savedTodos = localStorage.getItem('todos');
    if (savedTodos) {
      setTodos(JSON.parse(savedTodos));
    }
  }, []);

  // ToDoリストが変更されたらローカルストレージに保存
  useEffect(() => {
    if (todos.length > 0) {
      localStorage.setItem('todos', JSON.stringify(todos));
    }
  }, [todos]);

  // 新しいToDoを追加
  const addTodo = () => {
    if (newTodo.trim()) {
      const newTodos = [...todos, { text: newTodo, completed: false }];
      setTodos(newTodos);
      setNewTodo('');
    }
  };

  // ToDoの完了状態を切り替え
  const toggleCompletion = (index) => {
    const newTodos = [...todos];
    newTodos[index].completed = !newTodos[index].completed;
    setTodos(newTodos);
  };

  // ToDoを削除
  const deleteTodo = (index) => {
    const newTodos = todos.filter((_, i) => i !== index);
    setTodos(newTodos);
  };

  return (
    <div className="App">
      <h1>ToDoアプリ</h1>
      <input
        type="text"
        value={newTodo}
        onChange={(e) => setNewTodo(e.target.value)}
        placeholder="新しいToDoを追加"
      />
      <button onClick={addTodo}>追加</button>

      <TodoList
        todos={todos}
        onToggle={toggleCompletion}
        onDelete={deleteTodo}
      />
    </div>
  );
}

export default App;
