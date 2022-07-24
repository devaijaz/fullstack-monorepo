import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { NoRelogin } from './components/NoReLogin';
import { Protected } from './components/Protected';
import { AuthProvider } from './context/auth-context';
import { ClientProvider } from './context/client';
import { Layout } from './pages/Layout';
import { Login } from './pages/Login';
import { NotFound } from './pages/NotFound';
import { routes } from './routes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

export const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            {routes.map((navRoute) => (
              <Route
                key={navRoute.id}
                path={navRoute.path}
                element={
                  <Protected>
                    <navRoute.Component></navRoute.Component>
                  </Protected>
                }
              ></Route>
            ))}
            <Route
              path="/login"
              element={
                <NoRelogin>
                  <Login />
                </NoRelogin>
              }
            ></Route>
            <Route path="*" element={<NotFound />}></Route>
          </Route>
        </Routes>
      </BrowserRouter>
    </QueryClientProvider>
  );
};

export default App;
