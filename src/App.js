import React from 'react';
import './App.css';
import { Provider } from 'react-redux';
import Pomodoro from './Components/Pomodoro';
import Todo from './Components/Todo';
import store from './store';

export default function App() {
  return (
    <div className="containerApp">
      <Provider store={store}>
        <Todo />
        <Pomodoro />
      </Provider>
    </div>
  );
}