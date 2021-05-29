import { useState, useEffect } from 'react';
/*import Done from '../components/Done';
import Progress from '../components/Progress';
import TaskList from '../components/TaskList';
import ToDo from '../components/ToDo';*/
import TaskModal from '../components/TaskModal';
import TaskModalColumn from '../components/TaskModalColumn';
import styles from '../styles/styles.module.scss';

export default function Home() {
  const [tasks, setTasks] = useState([]);
  const [text, setText] = useState('');
  const [openModal, setOpenModal] = useState(false);
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
    setTasks([...tasks, task]);
    setOpenModal(false);
    setText('');
  };

  const removeTask = (index) => {
    const newTasks = [...tasks];
    newTasks.splice(index, 1);

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
    if (openModal) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [openModal]);

  return (
    <div className={styles.container}>
      <h1>Projeto Kanban</h1>

      {openModal && (
        <TaskModal
          setText={setText}
          addTask={() => addTask(text)}
          onClose={() => setOpenModal(false)}
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
        {/*<ToDo
          onClose={() => setOpenModal(true)}
          tasks={tasks}
          removeTask={removeTask}
        />
        <Progress
          onClose={() => setOpenModal(true)}
          tasks={tasks}
          removeTask={removeTask}
        />
        <Done
          onClose={() => setOpenModal(true)}
          tasks={tasks}
          removeTask={removeTask}
        />*/}

        {columns.map((column, indexC) => {
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
