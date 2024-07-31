// TaskBoard.tsx
import React from 'react';
import TaskColumn from '@/components/TaskColumn';
import { Task } from '@/types';

interface Props {
  tasks: Task[];
}

const TaskBoard: React.FC<Props> = ({ tasks }) => {
  const statuses = ["To do", "In progress", "Under review", "Finished"] as const;

  const getTasksByStatus = (status: string) => {
    return tasks.filter(task => task.status === status);
  };

  return (
    <div className="flex space-x-4 bg-white">
      {statuses.map((status) => (
        <TaskColumn key={status} status={status} tasks={getTasksByStatus(status)} />
      ))}
    </div>
  );
}

export default TaskBoard;
