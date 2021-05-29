import styles from '../../styles/styles.module.scss';
import TaskList from '../../components/TaskList';

export default function Progress({ onClose, tasks, removeTask }) {
  return (
    <div className={styles.columnToDo}>
      <h2>In Progress</h2>
      <TaskList tasks={tasks} removeTask={removeTask} />
      <button onClick={onClose}>+ Adicionar outra tarefa</button>
    </div>
  );
}
