import React from "react";
import TaskCard from "@/components/TaskCard";
import { Task } from "@/types";
import Image from "next/image";

interface Props {
  status: string;
  tasks: Task[];
}

const TaskColumn: React.FC<Props> = ({ status, tasks }) => {
  return (
    <div className="w-1/4  p-4 rounded-lg bg-white">
      <div className="flex justify-between mb-4">
      <h2 className="text-lg font-medium text-gray-600">{status}</h2>
      <Image src="/sort.svg" width={30} height={30} alt="Chevron Down" />
      </div>
      {tasks.map((task) => (
        <TaskCard key={task.id} task={task} /> // Ensure each TaskCard has a unique key
      ))}

      <button className="bg-zinc-800 text-white  w-full p-3 rounded-lg text-start font-light">Add new</button>
    </div>
  );
};

export default TaskColumn;
