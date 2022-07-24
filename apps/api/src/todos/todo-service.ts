export interface TodoService<T, U> {
  getAllTodos(): T[];
  getTodoById(id: U): T;
  deleteTodo(id: U): T;
  updateTodo(id: U, payload: Partial<T>): T;
  addTodo(payload: Partial<T>): T;
  patchTodo(payload: Partial<T>): T;
}
