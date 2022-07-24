import * as express from 'express';
import * as todoController from '../todos/todo-controller';
const router = express.Router();

router.get('/', todoController.get);

router.get('/:id', todoController.getById);

router.post('/', todoController.createTodo);

export default router;
