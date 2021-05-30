import { useState, useEffect } from 'react';
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
            <div
              className={
                indexC === 0
                  ? styles.columnToDo
                  : indexC === 1
                  ? styles.columnProgress
                  : indexC === 2
                  ? styles.columnDone
                  : styles.columnGereneric
              }
              key={indexC}
            >
              <div className={styles.titleColumn}>
                <h2>{column}</h2>
                <button onClick={() => removeColumn(indexC)}>
                  <img src={closeIcon} alt="Excluir Coluna" />
                </button>
              </div>

              {tasks
                .filter((e) => e.column === column)
                .map((task, indexT) => (
                  <div className={styles.cardTask} key={indexT}>
                    <div>
                      <h3>{task.title}</h3>
                      <button onClick={() => removeTask(task.id)}></button>
                    </div>

                    <div className={indexC === 0 && styles.reverseIcon}>
                      <button
                        onClick={() =>
                          handleMovePrev(indexC, task.id, direction)
                        }
                        className={indexC === 0 && styles.noIcon}
                      ></button>

                      <button
                        onClick={() =>
                          handleMoveNext(indexC, task.id, direction)
                        }
                        className={
                          indexC === columns.length - 1 && styles.noIcon
                        }
                      ></button>
                    </div>
                    <span>Tag {indexC + 1}</span>
                  </div>
                ))}

              <button
                onClick={() => setModalTask({ isVisible: true, column })}
                className={styles.btnNewTask}
              >
                <img src={plusIconWhite} alt="Adicionar outra tarefa" />
                <p>Adicionar outro cartão</p>
              </button>
            </div>
          );
        })}

        <button
          className={styles.buttonNewColumn}
          onClick={() => setOpenModalColumn(true)}
        >
          <img src={plusIconGray} alt="Adicionar outra tarefa" />
          <p>Adicionar outra lista</p>
        </button>
      </section>
    </div>
  );
}
