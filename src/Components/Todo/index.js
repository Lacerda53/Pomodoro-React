import React, { useState, useEffect } from 'react';
import './styles.css';
import { useSelector, useDispatch } from 'react-redux';
import { FiTrash2 } from 'react-icons/fi';

export default function Todo() {
  const title = useSelector(state => state.taskselect);
  const [list, setList] = useState([]);
  const [countChangeChecked, setCountChangeChecked] = useState(0);
  const [task, setTask] = useState('');
  const [complete] = useState(false);
  const dispatch = useDispatch();

  function loadList() {
    const local = localStorage.getItem('todos');
    if (local != null) {
      setList(JSON.parse(local));
    }
  }

  function postTask() {
    localStorage.setItem('todos', JSON.stringify([...list, { task, complete }]));
    setList([...list, { task, complete }]);
    setTask('');
  }

  function deleteTask(index) {
    const array = list;
    array.splice(index, 1);
    localStorage.clear();
    localStorage.setItem('todos', JSON.stringify(array));
    loadList();
  }

  function ischecked(index, newValue) {
    const array = list;
    array[index].complete = newValue;
    localStorage.setItem('todos', JSON.stringify(array));
    setCountChangeChecked(countChangeChecked => countChangeChecked + 1);
  }

  function isComplete(index) {
    if (list[index].complete === true) {
      return { textDecoration: 'line-through', color: '#ccc' };
    } else {
      return { textDecoration: 'none' };
    }
  }

  function OnChangeColor(item) {
    if (item.task === title) {
      return { backgroundColor: 'rgb(53, 53, 53)' };
    }
    else {
      return { backgroundColor: 'transparent' };
    }
  }

  function cleanAll() {
    localStorage.clear();
    setList([]);
  }

  function toggleTask(taskselect) {
    return {
      type: 'TOGGLE_TASK',
      taskselect
    }
  }

  useEffect(() => {
    loadList();
  }, [countChangeChecked]);

  return (
    <div className="containerTodo">
      <div className="content">
        <h3 className="title">Lista ToDo</h3>
        <div className="todo">
          <input value={task} onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? postTask() : null}
            type="text" placeholder="Adicione uma tarefa..." />
          <ul>
            {list.map((item, index) =>
              <li key={index}>
                <div className="card"
                  style={OnChangeColor(item)}
                  onClick={(e) => {
                    dispatch(toggleTask(item.task));
                  }}>
                  <div className="contentCard">
                    <div className="row">

                      <label className="container" style={isComplete(index)}>
                        <label>{item.task}</label>
                        <input type="checkbox" checked={list[index].complete} onChange={(e) => ischecked(index, e.target.checked)} />
                        <span className="checkmark"></span>
                      </label>
                      <div className="trash">
                        <FiTrash2 size={19} onClick={() => deleteTask(index)} />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="separator"></div>
              </li>
            )}
          </ul>
          {list.length !== 0 ?
            <p className="cleanAll" onClick={cleanAll}>Limpar tudo</p>
            : null
          }
        </div>
      </div>
    </div>
  );
}
