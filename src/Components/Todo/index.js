import React, { useState, useEffect } from 'react';
import './styles.css';
import { FiTrash2 } from 'react-icons/fi';

export default function Todo() {
  const [list, setList] = useState([]);
  const [arrayCheck, setArrayCheck] = useState([]);
  const [task, setTask] = useState('');
  const [complete, setComplete] = useState(false);

  function postTask(e) {
    e.preventDefault();
    localStorage.setItem('todos', JSON.stringify([...list, { task, complete }]));
    setList([...list, { task, complete }]);
    setTask('');
  }

  function isComplete(index) {
    if (list[index].complete === true) {
      return { textDecoration: 'line-through', color: '#ccc' };
    } else {
      return { textDecoration: 'none' };
    }
  }

  function deleteTask(index) {
    const local = localStorage.getItem('todos');
    const array = list;
    array.splice(index, 1);
    localStorage.clear();
    localStorage.setItem('todos', JSON.stringify(array));
    loadList();
  }

  function loadList() {
    const local = localStorage.getItem('todos');
    if (local != null) {
      setList(JSON.parse(local));
    }
  }

  function ischecked(index, value) {
    const array = list;
    for (var i = 0; i < array.length; i++) {
      if (array[index]) {
        array[index].complete = value;
        setArrayCheck(array);
        localStorage.setItem('todos', JSON.stringify(array));
        break;
      }
    }
  }

  function cleanAll(){
    localStorage.clear();
    setList([]);
  }
  useEffect(() => {
    loadList();
  }, [arrayCheck]);

  return (
    <div className="containerTodo">
      <div className="content">
        <h3 className="title">Lista ToDo</h3>
        <div className="todo">
          <input value={task} onChange={(e) => setTask(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' ? postTask(e) : null}
            type="text" placeholder="Adicione uma tarefa..." />
          <ul>
            {list.map((item, index) =>
              <li key={index}>
                <div className="card">
                  <div className="contentCard">
                    <div className="row">

                      <label className="container" style={isComplete(index)}>{item.task}
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
