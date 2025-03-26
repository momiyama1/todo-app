import React, { useState, useEffect } from 'react';
import TodoList from './TodoList'; // TodoList をインポート
import './App.css';

function App() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState('');
  const [dueDate, setDueDate] = useState('');

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
      const newTodos = [...todos, { text: newTodo, completed: false, dueDate: dueDate }];
      setTodos(newTodos);
      setNewTodo('');
      setDueDate(''); // 期限をリセット
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

    localStorage.setItem('todos', JSON.stringify(newTodos));
  };

  // 期限が過ぎたタスクをチェック
  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="App">
      <h1>ToDoアプリ</h1>

      {/* 入力フォームとボタンを横並びに配置 */}
      <div className="input-container">
        <input
          type="text"
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="新しいToDoを追加"
        />
        <input
          type="date"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
        />
        <button onClick={addTodo}>追加</button>
      </div>

      <TodoList
        todos={todos}
        onToggle={toggleCompletion}
        onDelete={deleteTodo}
        isOverdue={isOverdue}
      />
    </div>
  );
}

export default App;
