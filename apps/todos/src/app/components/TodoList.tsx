import React, { useState, useCallback } from 'react';
import ReactDOM from 'react-dom';
import { Todo } from '@fs-monorepo/api-interfaces';

import {
  useQuery,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';

import { useClient } from '../hooks/useClient';

const queryClient = new QueryClient();

const TodosApp = () => {
  const { JWT, getTodos } = useClient();
  const query = useQuery(['todos'], getTodos);

  const onGetTodos = useCallback(async () => {
    queryClient.invalidateQueries(['todos']);
  }, [getTodos]);

  return (
    <div className="mt-10 text-3xl mx-auto max-w-6xl">
      <div className="grid grid-cols-2 gap-5">
        <div>
          {JWT && query && (
            <>
              <div>
                {query?.data?.map((todo: Todo) => (
                  <div key={todo.id}>{todo.title}</div>
                ))}
              </div>
              <div className="mt-10">
                <button
                  onClick={onGetTodos}
                  className="px-5 py-2 bg-blue-600 text-white rounded-xl"
                >
                  Get Todos
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
const TodoList = () => <TodosApp />;

export default TodoList;
