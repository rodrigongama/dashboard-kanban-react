import styles from '../../styles/styles.module.scss';
import TaskList from '../../components/TaskList';

export default function Done({ onClose, tasks, removeTask }) {
  return (
    <div className={styles.columnToDo}>
      <h2>Done</h2>
      <TaskList tasks={tasks} removeTask={removeTask} />
      <button onClick={onClose}>+ Adicionar outra tarefa</button>
    </div>
  );
}
