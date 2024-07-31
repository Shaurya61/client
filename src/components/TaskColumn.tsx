import React, { useRef, useState } from 'react';
import TaskCard from '@/components/TaskCard';
import { Task } from '@/types';
import { useDrop } from 'react-dnd';
import { CreateTask } from './CreateTask';

interface Props {
  status: "To do" | "In progress" | "Under review" | "Finished"; // Update the type here
  tasks: Task[];
  onDrop: (task: Task, status: string) => void;
}

const TaskColumn: React.FC<Props> = ({ status, tasks, onDrop }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isSheetOpen, setSheetOpen] = useState(false);
  const [{ isOver }, drop] = useDrop({
    accept: 'TASK',
    drop: (item: Task) => onDrop(item, status),
    collect: monitor => ({
      isOver: !!monitor.isOver(),
    }),
  });

  drop(ref);

  const openSheet = () => setSheetOpen(true);
  const closeSheet = () => setSheetOpen(false);

  return (
    <div ref={ref} className={`w-1/4 p-4 rounded-lg bg-white ${isOver ? 'bg-blue-100' : ''}`}>
      <div className="flex justify-between mb-4">
        <h2 className="text-lg font-medium text-gray-600">{status}</h2>
        <img src="/sort.svg" width={30} height={30} alt="Chevron Down" />
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} />
      ))}
      <button onClick={openSheet} className="bg-zinc-800 text-white w-full p-3 rounded-lg text-start font-light">Add new</button>
      {isSheetOpen && (
        <CreateTask closeSheet={closeSheet} defaultStatus={status} /> // Pass defaultStatus prop
      )}
    </div>
  );
};

export default TaskColumn;
