import React, { useEffect } from 'react';
import { client } from '../axios-client';
import TodoList from '../components/TodoList';
export const Todo = () => {
  return (
    <div>
      <TodoList />
    </div>
  );
};
