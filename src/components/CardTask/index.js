import './cardTask.scss';
import '../../styles/styles.scss';

export default function CardTask({
  indexColumn,
  column,
  columns,
  tasks,
  setTasks,
}) {
  const directionLeft = -1;
  const directionRight = 1;

  const handleMove = (indexColumn, id, direction) => {
    const newTasks = tasks.map((item) =>
      item.id === id
        ? { ...item, column: columns[indexColumn + direction] }
        : item,
    );

    setTasks(newTasks);
  };

  const removeTask = (id) => {
    const newTasks = tasks.filter((item) => item.id !== id);

    setTasks(newTasks);
  };

  return (
    <div>
      {tasks
        .filter((e) => e.column === column)
        .map((task, indexT) => (
          <div className="cardTask" key={indexT}>
            <div>
              <h3>{task.title}</h3>
              <button onClick={() => removeTask(task.id)}></button>
            </div>

            <div className={indexColumn === 0 && 'reverseIcon'}>
              <button
                onClick={() => handleMove(indexColumn, task.id, directionLeft)}
                className={indexColumn === 0 && 'noIcon'}
              ></button>

              <button
                onClick={() => handleMove(indexColumn, task.id, directionRight)}
                className={indexColumn === columns.length - 1 && 'noIcon'}
              ></button>
            </div>
            <span>Tag {indexColumn + 1}</span>
          </div>
        ))}
    </div>
  );
}
