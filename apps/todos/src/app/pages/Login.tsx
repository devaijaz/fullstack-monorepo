import React, { FormEvent, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuthContext } from '../context/auth-context';
import { useClient } from '../hooks/useClient';

export const Login = () => {
  const { JWT, login } = useClient();
  const { state } = useLocation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  if (JWT) {
    const navTo = (state as { ru: string })?.ru ?? '/';
    return <Navigate to={navTo} />;
  }

  const onFormSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(username, password);
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (e: any) {
      setError(e.response?.data?.message ?? 'Invalid username/Password');
    }
  };

  return (
    <div className="w-full flex justify-center items-center z-[-1] my-[10%]">
      <form className="border p-5 w-[400px] z-0" onSubmit={onFormSubmit}>
        {error ? <p className="text-red-600 font-bold my-2">{error}</p> : null}
        <div className="form-field">
          <input
            type="text"
            placeholder="Username"
            className="w-full border"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div className="form-field my-2">
          <input
            type="password"
            placeholder="Password"
            className="w-full border"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        <div className="buttons my-2">
          <button className="btn">Login</button>
        </div>
      </form>
    </div>
  );
};
