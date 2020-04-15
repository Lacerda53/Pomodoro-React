import React, { useState, useEffect } from 'react';
import './styles.css';
import { FiPlay, FiPause, FiBell } from 'react-icons/fi';
import Switch from "react-switch";
import { useSelector } from 'react-redux';
import { Helmet } from 'react-helmet';

export default function Pomodoro() {
  const task = useSelector(state=> state.taskselect);
  const [counter, setCounter] = useState(0);
  const [workTime] = useState(1500);
  const [restTime, setRestTime] = useState(300);
  const [status, setStatus] = useState('Foco');
  const [title, setTitle] = useState('Selecione uma tarefa');
  const [pomodoro, setPomodoro] = useState(0);
  const [notification, setNotification] = useState(true);
  const [intervalId, setIntervalId] = useState();
  const [stop, setStop] = useState(true);
  const [headTitle, setHeadTitle] = useState('');


  function loadTimer() {
    if (stop) {
      if ((workTime - counter) >= 0) {
        setStop(false);
        setIntervalId(setInterval(() => {
          setCounter(counter => counter + 1);
        }, 1000));
      }
    }
    else {
      setStop(true);
      clearInterval(intervalId);
    }
  }

  function zeroTimer() {
    if ((workTime - counter) === 0) {
      clearInterval(intervalId);
      setStop(true);
      setCounter(0);
      setStatus('Descanso');
      if (pomodoro === 4) {
        setRestTime(1800);
        setPomodoro(0);
      }
    }
    else if ((restTime - counter) === 0 && status === 'Descanso') {
      setPomodoro(pomodoro => pomodoro + 1);
      clearInterval(intervalId);
      setStop(true);
      setCounter(0);
      setStatus('Foco');
      if (pomodoro === 0) {
        setRestTime(300);
      }
    }
  }

  function onChangeTitle() {
    if (status === "Foco") {
      setHeadTitle(convertSeconds(workTime - counter) + ' - Foco');
    }
    else {
      setHeadTitle(convertSeconds(restTime - counter) + ' - Descanso');
    }
  }

  function checkTaskSelect(){
    if(Object.keys(task).length !== 0)
    {
      setTitle(task);
    }
  }

  useEffect(() => {
    zeroTimer();
    onChangeTitle();
    checkTaskSelect();
    if (status === "Foco") {
      console.log(convertSeconds(workTime - counter));
    }
    else {
      console.log(convertSeconds(restTime - counter));
    }
  }, [counter, task]);

  function convertSeconds(s) {
    var min = Math.floor(s / 60);
    var sec = s % 60;
    if (min < 9 && sec >= 10) {
      return '0' + min + ':' + sec;
    }
    if (min < 9 && sec < 10) {
      return '0' + min + ':0' + sec;
    }
    if (min > 9 && sec < 10) {
      return min + ':0' + sec;
    }
    return min + ':' + sec;
  }
  return (
    <div className="containerPomodoro">
      <Helmet>
        <title>{headTitle}</title>
      </Helmet>
      <div className="content">
        <h3 className="title">Pomodoro</h3>
        <div className="bodyPomodoro">
          <div className="circle">
            <p className="timerText"> {status === 'Foco' ? convertSeconds(workTime - counter) : convertSeconds(restTime - counter)} </p>
            <p className="statusText">{status}</p>
          </div>
          <div className="infoPomodoro">
            <div className="TitleRow">
              <div className="BarraTitle"></div>
              <h2 className="TitlePomodoro">{title}</h2>
            </div>
            <div className="notification">
              <FiBell /> Notificações
              <div style={{ marginLeft: 10 }}>
                <Switch onColor='#4F63D7' checked={notification} onChange={(e) => setNotification(e)} />
              </div>
            </div>
            {stop ?
              <button className="btnInicio" onClick={() => loadTimer()}><FiPlay /> Iniciar</button>
              :
              <button className="btnInicio" onClick={() => loadTimer()}><FiPause /> Pausar</button>
            }
          </div>
        </div>
      </div>
    </div>
  );
}