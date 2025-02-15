import React from 'react';

const TodoItem = ({ todo, index, onToggle, onDelete }) => {
  return (
    <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(index)}
      />
      {todo.text}
      <button onClick={() => onDelete(index)}>削除</button>
    </li>
  );
};

export default TodoItem;
