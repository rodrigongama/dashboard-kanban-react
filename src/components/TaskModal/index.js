import styles from './styles.module.scss';

export default function TaskModal({ setText, addTask, text, onClose }) {
  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modalContainer}>
        <h2>Tarefas</h2>
        <input type="text" onChange={({ target }) => setText(target.value)} />
        <div className={styles.Modalbuttons}>
          <button onClick={onClose}>Cancelar</button>
          <button onClick={() => addTask(text)}>Adicionar</button>
        </div>
      </div>
    </div>
  );
}
