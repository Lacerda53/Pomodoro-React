import React from 'react';
import './App.css';
import Pomodoro from './Components/Pomodoro';
import Todo from './Components/Todo';

export default function App() {
  return (
    <div className="containerApp">
      <Todo/>
      <Pomodoro title="Criar um pomodoro"/>
    </div>
  );
}