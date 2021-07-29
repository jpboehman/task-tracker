import Task from './Task';

// Everything in this function is a part of our Task component!
const Tasks = ({ tasks, onDelete, onToggle }) => {
  return (
    // Since we are using a list, we need to use the 'key' property
    <div>
      {tasks.map((task, index) => (
        <Task
          key={index}
          task={task}
          onDelete={onDelete}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default Tasks;
