import styles from '../../styles/styles.module.scss';
import TaskList from '../../components/TaskList';

export default function ToDo({ onClose, tasks, removeTask }) {
  return (
    <div className={styles.columnToDo}>
      <h2>To Do</h2>
      <TaskList tasks={tasks} removeTask={removeTask} />
      <button onClick={onClose}>+ Adicionar outra tarefa</button>
    </div>
  );
}
