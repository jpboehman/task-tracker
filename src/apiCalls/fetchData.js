const fetchTasks = async () => {
  try {
    const res = await fetch('http://localhost:5000/tasks');
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

const fetchTask = async (id) => {
  try {
    const res = await fetch(`http://localhost:5000/tasks/${id}`);
    const data = await res.json();
    return data;
  } catch (e) {
    console.error(e);
  }
};

module.exports = {
  fetchTasks,
  fetchTask,
};
