import { useState, useEffect } from 'react';
import TaskModal from '../components/TaskModal';
import TaskModalColumn from '../components/TaskModalColumn';
import '../styles/styles.scss';
import { v4 as uuidv4 } from 'uuid';

import closeIcon from '../assets/close-gray.png';
import plusIconWhite from '../assets/plus-white.svg';
import plusIconGray from '../assets/plus-gray.svg';
import CardTask from '../components/CardTask';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [modalTask, setModalTask] = useState({
    isVisible: false,
    column: '',
  });
  const [columns, setColumns] = useState([]);
  const [openModalColumn, setOpenModalColumn] = useState(false);
  const [nameColumn, setNameColumn] = useState('');

  const addColumn = (nameColumn) => {
    if (nameColumn === '') return;
    setColumns([...columns, nameColumn]);
    setOpenModalColumn(false);
    setNameColumn('');
  };

  const removeColumn = (index) => {
    const newColumns = [...columns];
    newColumns.splice(index, 1);

    setColumns(newColumns);
  };

  const addTask = (task) => {
    if (text === '') return;
    setTasks([
      ...tasks,
      { column: modalTask.column, title: task, id: uuidv4() },
    ]);
    setModalTask({ ...modalTask, isVisible: false });
    setText('');
  };

  const saveTasks = (tasksSaved) => {
    localStorage.setItem('tasks', JSON.stringify(tasksSaved));
  };

  const saveColumns = (columnsSaved) => {
    localStorage.setItem('columns', JSON.stringify(columnsSaved));
  };

  const loadTasks = () => {
    const savedTasks = JSON.parse(localStorage.getItem('tasks'));
    return savedTasks;
  };

  const loadColumns = () => {
    const savedColumns = JSON.parse(localStorage.getItem('columns'));
    return savedColumns;
  };

  useEffect(() => {
    const loadedTasks = loadTasks();
    const loadedColumns = loadColumns();

    setTasks(loadedTasks);
    setColumns(loadedColumns);
  }, []);

  useEffect(() => {
    if ((tasks, columns)) {
      saveTasks(tasks);
      saveColumns(columns);
    }
  }, [tasks, columns]);

  return (
    <div className="container">
      <h1>Projeto Kanban</h1>

      {modalTask.isVisible && (
        <TaskModal
          setText={setText}
          addTask={() => addTask(text)}
          onClose={() => setModalTask({ ...modalTask, isVisible: false })}
        />
      )}

      {openModalColumn && (
        <TaskModalColumn
          setNameColumn={setNameColumn}
          addColumn={() => addColumn(nameColumn)}
          onClose={() => setOpenModalColumn(false)}
        />
      )}

      <section className="content">
        {columns?.map((column, indexC) => {
          return (
            <div
              className={
                indexC === 0
                  ? 'columnToDo'
                  : indexC === 1
                  ? 'columnProgress'
                  : indexC === 2
                  ? 'columnDone'
                  : 'columnGereneric'
              }
              key={indexC}
            >
              <div className="titleColumn">
                <h2>{column}</h2>
                <button onClick={() => removeColumn(indexC)}>
                  <img src={closeIcon} alt="Excluir Coluna" />
                </button>
              </div>

              <CardTask
                indexColumn={indexC}
                column={column}
                columns={columns}
                tasks={tasks}
                setTasks={setTasks}
              />

              <button
                onClick={() => setModalTask({ isVisible: true, column })}
                className="btnNewTask"
              >
                <img src={plusIconWhite} alt="Adicionar outra tarefa" />
                <p>Adicionar outro cartão</p>
              </button>
            </div>
          );
        })}

        <button
          className="buttonNewColumn"
          onClick={() => setOpenModalColumn(true)}
        >
          <img src={plusIconGray} alt="Adicionar outra tarefa" />
          <p>Adicionar outra lista</p>
        </button>
      </section>
    </div>
  );
}
