import { Todo } from '@fs-monorepo/api-interfaces';
import { v4 as uuid } from 'uuid';
import { NotFoundException } from '../../app/exceptions/NotFoundException';
import { TodoService } from '../todo-service';

export class TodoServiceInMemoryImpl implements TodoService<Todo, string> {
  private todos: Todo[] = [
    {
      id: uuid(),
      completed: false,
      title: 'But Movie Tickets',
    },
  ];

  getAllTodos(): Todo[] {
    return this.todos;
  }
  getTodoById(id: string): Todo {
    const todo = this.todos.find((todo) => todo.id === id);
    if (!todo) {
      throw new NotFoundException(`Todo not found with id ${id}`);
    }
    return todo;
  }
  deleteTodo(id: string): Todo {
    const todo = this.getTodoById(id);
    this.todos = this.todos.filter((todo) => todo.id !== id);
    return todo;
  }
  updateTodo(id: string, payload: Partial<Todo>): Todo {
    const todo = this.getTodoById(id);
    todo.completed = payload.completed;
    todo.title = payload.title;
    return todo;
  }
  addTodo(payload: Partial<Todo>): Todo {
    const todo = {
      id: uuid(),
      title: payload.title,
      completed: false,
    };
    this.todos.push(todo);
    return todo;
  }
  patchTodo(payload: Partial<Todo>): Todo {
    throw new Error('Method not implemented.');
  }
}
