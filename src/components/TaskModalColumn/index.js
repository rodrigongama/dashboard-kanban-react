import styles from '../TaskModal/styles.module.scss';

export default function TaskModal({
  onClose,
  addColumn,
  setNameColumn,
  nameColumn,
}) {
  return (
    <div className={styles.modalContainer}>
      <h2>Adicionar coluna</h2>
      <input
        type="text"
        onChange={({ target }) => setNameColumn(target.value)}
      />
      <div className={styles.modalButtons}>
        <button onClick={onClose}>Cancelar</button>
        <button onClick={() => addColumn(nameColumn)}>Adicionar</button>
      </div>
    </div>
  );
}
