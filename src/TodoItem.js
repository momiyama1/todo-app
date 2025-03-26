import React from 'react';

const TodoItem = ({ todo, index, onToggle, onDelete }) => {
  // 期限が過ぎているかどうかをチェックする関数
  const isOverdue = (dueDate) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <li className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(index)}
      />
      {todo.text}
      {/* 期限が設定されていれば、期限を表示 */}
      {todo.dueDate && (
        <span
        style={{
          color: todo.completed 
            ? '#7f8c8d' 
            : (isOverdue(todo.dueDate) ? 'red' : 'black'), // チェックボックスが完了の場合は#7f8c8d、期限が過ぎている場合は赤色、過ぎていなければ黒色
          fontWeight: todo.completed 
            ? 'normal' 
            : (isOverdue(todo.dueDate) ? 'bold' : 'normal'), // チェックボックスが完了の場合は通常の太さ、期限が過ぎている場合は太字、過ぎていなければ通常の太さ
        }}
        >
          {' - 期限: ' + todo.dueDate}
        </span>
      )}
      <button className="delete" onClick={() => onDelete(index)}>削除</button>
    </li>
  );
};

export default TodoItem;
