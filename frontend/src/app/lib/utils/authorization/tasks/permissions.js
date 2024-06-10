export const foremanHasAccess = (foremanId, taskId) => {
  //TODO: Implement this function, the backend will provide it
  const fecthTasks = () => {}
  //Fetch all the tasks that the foreman is in charge of
  const tasks = fecthTasks(foremanId)
  //Check if the construction is in the list of tasks
  return tasks.includes(taskId)
}
