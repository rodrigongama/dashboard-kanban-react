import { useState, useEffect } from 'react';
/*import Done from '../components/Done';
import Progress from '../components/Progress';
import TaskList from '../components/TaskList';
import ToDo from '../components/ToDo';*/
import TaskModal from '../components/TaskModal';
import TaskModalColumn from '../components/TaskModalColumn';
import styles from '../styles/styles.module.scss';
import { v4 as uuidv4 } from 'uuid';

import closeIcon from '../assets/close-gray.png';
import plusIconWhite from '../assets/plus-white.svg';
import plusIconGray from '../assets/plus-gray.svg';

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

  const direction = 1;
  const handleMoveNext = (indexC, id, direction) => {
    const newTasks = tasks.map((item) =>
      item.id === id ? { ...item, column: columns[indexC + direction] } : item,
    );

    setTasks(newTasks);
  };

  const handleMovePrev = (indexC, id, direction) => {
    const newTasks = tasks.map((item) =>
      item.id === id ? { ...item, column: columns[indexC - direction] } : item,
    );

    setTasks(newTasks);
  };

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

  const removeTask = (id) => {
    const newTasks = tasks.filter((item) => item.id !== id);

    setTasks(newTasks);
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

  useEffect(() => {
    if ((modalTask.isVisible, openModalColumn)) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [modalTask.isVisible, openModalColumn]);

  return (
    <div className={styles.container}>
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

      <section className={styles.content}>
        {columns?.map((column, indexC) => {
          return (
            <div className={styles.columnToDo} key={indexC}>
              <div className={styles.titleNewColumn}>
                <h2>{column}</h2>
                <button onClick={() => removeColumn(indexC)}>X</button>
              </div>

              {/*<TaskList tasks={tasks} />*/}

              {tasks.map((task, indexT) => (
                <div className={styles.cardTask} key={indexT}>
                  <h3>{task}</h3>
                  <div>Tag{indexC + 1}</div>
                  <button onClick={() => removeTask(indexT)}>Remover</button>
                </div>
              ))}
              <button onClick={() => setOpenModal(true)}>
                + Adicionar outra tarefa
              </button>
            </div>
          );
        })}

        <button
          className={styles.buttonNewColumn}
          onClick={() => setOpenModalColumn(true)}
        >
          + Adicionar outra lista
        </button>
      </section>
    </div>
  );
}
