import Task from "./Task";

export default function TaskList({ tasks, refresh }) {
  if (tasks.length === 0) {
    return (
      <div className="text-xl italic text-neutral-600 text-center pt-4 mt-4">
        No Tasks to Show
      </div>
    );
  }

  const sortedTasks = [...tasks].sort((a, b) => a.completed - b.completed);

  return (
    <div className="flex flex-col flex-wrap gap-3">
      {sortedTasks.map((task) => (
        <Task key={task._id} task={task} refresh={refresh} />
      ))}
    </div>
  );
}
