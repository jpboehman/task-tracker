import { useEffect, useReducer, } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';
import { INITIAL_STATE, reducer } from './Store/reducer';
import { fetchTask, fetchTasks } from './apiCalls/fetchData';
import { StoreContext } from './Store/index';
import {
  TASK_ENDPOINT,
  POST_HTTP_METHOD,
  PUT_HTTP_METHOD,
  DELETE_HTTP_METHOD,
} from './constants/constants';

const App = () => {
  const [globalState, dispatch] = useReducer(reducer, INITIAL_STATE);
  console.log(`globalState in App.js is: ${JSON.stringify(globalState)}`);

  const { showAddTask, tasks } = globalState;
  

  console.log(`tasks in App.js are: ${JSON.stringify(tasks)}`);

  useEffect(() => {
    const getTasks = async () => {
      const tasksFromServer = await fetchTasks();
      dispatch({
        tasksFromServer,
        type: 'FETCH_TASKS',
      });
    };
    getTasks();
  }, [globalState, tasks, showAddTask]);

  // Add Task
  const addTask = async (task) => {
    const res = await fetch(TASK_ENDPOINT, {
      method: POST_HTTP_METHOD,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(task),
    });

    const data = await res.json()
    .then(data => dispatch({type: 'ADD_TASK', data}))

  };

  // Delete Task
  const deleteTask = async (id) => {
    const res = await fetch(`${TASK_ENDPOINT}/${id}`, {
      method: DELETE_HTTP_METHOD,
    });
    // We should control the response status to decide if we will change the state or not.
    res.status === 200
      ? dispatch({ action: 'DELETE_TASK', id })
      : alert('Error Deleting This Task');
  };

  // Toggle Reminder - come back to this
  const toggleReminder = async (id) => {
    const taskToToggle = await fetchTask(id);
    const updTask = { ...taskToToggle, reminder: !taskToToggle.reminder };

    const res = await fetch(`http://localhost:5000/tasks/${id}`, {
      method: PUT_HTTP_METHOD,
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify(updTask),
    });

    const data = await res.json();
  };

  return (
    
    <StoreContext.Provider value={[globalState, dispatch]}>
      <Router>
        <div className="container">
          <Header />
          <Route
            path="/"
            exact
            render={(props) => (
              <>
                {showAddTask && <AddTask onAdd={addTask} />}
                {tasks.length > 0 ? (
                  <Tasks
                    tasks={tasks}
                    onDelete={deleteTask}
                    onToggle={toggleReminder}
                  />
                ) : (
                  'No Tasks To Show'
                )}
              </>
            )}
          />
          <Route path="/about" component={About} />
          <Footer />
        </div>
      </Router>
    </StoreContext.Provider>
  );
};

export default App;
