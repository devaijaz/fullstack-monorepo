import { Todo } from '@fs-monorepo/api-interfaces';
import { TodoServiceInMemoryImpl } from './serviceimpl/todo-service-in-memory';
import { TodoService } from './todo-service';

export function getTodoService(): TodoService<Todo, string> {
  return new TodoServiceInMemoryImpl();
}
