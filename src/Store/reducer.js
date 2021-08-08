export const INITIAL_STATE = {
  showAddTask: false,
  tasks: [],
};

// Handle actions to update the global state based on - onAdd, onDelete, onToggle

export const reducer = (state = INITIAL_STATE, action) => {
  console.log(`state in reducer is: ${JSON.stringify(state)}`);
  console.log(`action is: ${JSON.stringify(action)}`);
  const { type } = action;
  switch (type) {
    case 'SHOW_ADD_TASK':
      return {
        ...state,
        showAddTask: !state.showAddTask,
      };
      // Get the tasks from server with a dispatched action
    case 'FETCH_TASKS':
      // Update the global state
      return {
        ...state,
        tasks: action.tasksFromServer,
      };
    case 'ADD_TASK':
      return {
        ...state,
        tasks: [...state.tasks, action.data],
      };
    case 'DELETE_TASK':
      return {
        ...state,
        tasks: state.tasks.filter((task) => task.id !== action.id),
      };
    case 'TOGGLE_REMINDER':
      return;
    default:
      return state;
  }
};
