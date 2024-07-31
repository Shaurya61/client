import React, { useRef } from 'react';
import { useDrag } from 'react-dnd';
import { Task } from '@/types';
import { Clock } from 'lucide-react';

interface Props {
  task: Task;
}

const TaskCard: React.FC<Props> = ({ task }) => {
  const ref = useRef<HTMLDivElement>(null);

  const [{ isDragging }, drag] = useDrag({
    type: 'TASK',
    item: task,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  });

  drag(ref);

  const getPriorityClass = (priority: string | undefined) => {
    switch (priority) {
      case 'Low':
        return 'bg-green-500';
      case 'Medium':
        return 'bg-yellow-500';
      case 'Urgent':
        return 'bg-red-500';
      default:
        return 'bg-gray-500';
    }
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are zero-based
    const year = String(date.getFullYear());
    return `${year}-${month}-${day}`;
  };

  const getTimeElapsed = (timestamp: string) => {
    const now = new Date();
    const past = new Date(timestamp);
    const diffInSeconds = Math.floor((now.getTime() - past.getTime()) / 1000);

    if (diffInSeconds < 60) {
      return `${diffInSeconds} seconds ago`;
    } else if (diffInSeconds < 3600) {
      const minutes = Math.floor(diffInSeconds / 60);
      return `${minutes} minutes ago`;
    } else if (diffInSeconds < 86400) {
      const hours = Math.floor(diffInSeconds / 3600);
      return `${hours} hours ago`;
    } else {
      const days = Math.floor(diffInSeconds / 86400);
      return `${days} days ago`;
    }
  };

  return (
    <div
      ref={ref}
      className={`bg-gray-100 p-3 rounded-lg outline outline-1 outline-gray-300 mb-4 transition-transform ${
        isDragging ? 'opacity-75 shadow-lg scale-105' : 'opacity-100'
      }`}
    >
      <div className="flex flex-col gap-2">
        <h3 className="font-semibold text-gray-500">{task.title}</h3>
        <p className="font-normal text-gray-500">{task.description}</p>
        <p
          className={`inline-block px-2 py-1 text-white rounded-lg w-fit ${getPriorityClass(
            task.priority
          )}`}
        >
          {task.priority || 'No priority'}
        </p>
        {task.deadline && (
          <div className="flex items-center">
            <Clock className="mr-2 text-gray-500" />
            <p className="font-semibold text-gray-500">{formatDate(task.deadline)}</p>
          </div>
        )}
        <div className="flex items-center">
          <p className="font-normal text-gray-500">{getTimeElapsed(task.createdAt)}</p>
        </div>
      </div>
    </div>
  );
};

export default TaskCard;
