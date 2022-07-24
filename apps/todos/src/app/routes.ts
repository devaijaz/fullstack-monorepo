import { Home } from './pages/Home';
import { Todo } from './pages/Todo';

export const routes = [
  {
    id: 1,
    title: 'Home',
    path: '/',
    Component: Home,
  },
  {
    id: 2,
    title: 'Todos',
    path: '/todos',
    Component: Todo,
  },
];
