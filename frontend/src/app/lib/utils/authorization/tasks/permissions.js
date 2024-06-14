import { getTasksByForeman } from '../../utilFunctions'

export const foremanHasTaskAccess = async (foremanId, taskId) => {
  const fetchedTasks = await getTasksByForeman(foremanId)
  //Fetch all the tasks that the foreman is in charge of
  const foremanTasks = fetchedTasks.map((task) => task.id)
  //Check if the construction is in the list of tasks
  return foremanTasks.includes(parseInt(taskId))
}
