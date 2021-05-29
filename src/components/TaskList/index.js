import styles from '../../styles/styles.module.scss';

export default function TaskList({ tasks, removeTask }) {
  return (
    <>
      {tasks.map((task, index) => (
        <div className={styles.cardTask} key={index}>
          <h3>{task}</h3>
          <div>Tag{index}</div>
          <button onClick={() => removeTask(index)}>Remover</button>
        </div>
      ))}
    </>
  );
}
