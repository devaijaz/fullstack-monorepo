import { Request, Response } from 'express';
import { getTodoService } from './todo-factory';

const todoService = getTodoService();

export function get(_: Request, response: Response) {
  response.json(todoService.getAllTodos());
}

export function getById(request: Request, response: Response) {
  const todo = todoService.getTodoById(request.params.id);
  return response.json(todo);
}

export function createTodo(request: Request, response: Response) {
  const { title } = request.body;
  response.status(201).send(
    todoService.addTodo({
      title,
    })
  );
}

export function deleteTodo(request: Request, response: Response) {
  const { id } = request.params;
  response.send(todoService.deleteTodo(id));
}
