// TaskBoard.tsx
import React from 'react';
import TaskColumn from '@/components/TaskColumn';
import { Task } from '@/types';
import { useDispatch } from 'react-redux';
import { updateTaskStatus } from '@/redux/slices/taskSlices'; // You need to implement this action
import { AppDispatch } from '@/redux/store';

interface Props {
  tasks: Task[];
}

const TaskBoard: React.FC<Props> = ({ tasks }) => {
  const statuses = ["To do", "In progress", "Under review", "Finished"] as const;
  const dispatch : AppDispatch = useDispatch();

  const handleDrop = (task: Task, status: string) => {
    const updatedTask = { ...task, status };
    dispatch(updateTaskStatus(updatedTask));
  };

  return (
    <div className="flex space-x-4 bg-white">
      {statuses.map((status) => (
        <TaskColumn
          key={status}
          status={status}
          tasks={tasks.filter(task => task.status === status)}
          onDrop={handleDrop}
        />
      ))}
    </div>
  );
};

export default TaskBoard;
