// pages/create-task.tsx
"use client";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createTask } from "@/redux/slices/taskSlices";
import { Task } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch } from "@/redux/store";

const CreateTask = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<
    "To do" | "In progress" | "Under review" | "Finished"
  >("To do");
  const [priority, setPriority] = useState<
    "Low" | "Medium" | "Urgent" | undefined
  >(undefined);
  const [deadline, setDeadline] = useState("");

  const dispatch: AppDispatch = useDispatch();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (title.trim() === "") {
      alert("Title is required");
      return;
    }

    const newTask: Task = {
      id: uuidv4(),
      title,
      description,
      status,
      priority,
      deadline,
      createdAt: new Date().toISOString(),
    };

    dispatch(createTask(newTask));
    // Optionally redirect to another page after submission
  };

  return (
    <div className="container mx-auto p-6">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-4 rounded-lg shadow-md"
      >
        <div className="mb-4">
          <input
            type="text"
            value={title}
            placeholder="Title"
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 rounded outline-none p-4 h-24 text-4xl font-medium"
            required    
          />
        </div>

        <div className="mb-4 flex gap-4">
          <label className="block text-sm font-bold mb-2">Status</label>
          <select
            value={status}
            onChange={(e) =>
              setStatus(
                e.target.value as
                  | "To do"
                  | "In progress"
                  | "Under review"
                  | "Finished"
              )
            }
            className="w-full px-3 py-2 border rounded  border-none outline-none"
          >
            <option value="To do">To do</option>
            <option value="In progress">In progress</option>
            <option value="Under review">Under review</option>
            <option value="Finished">Finished</option>
          </select>
        </div>

        <div className="mb-4 flex gap-4">
          <label className="block text-sm font-bold mb-2">Priority</label>
          <select
            value={priority || ""}
            onChange={(e) =>
              setPriority(e.target.value as "Low" | "Medium" | "Urgent")
            }
            className="w-full px-3 py-2 border rounded  border-none outline-none"
          >
            <option value="">Select Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="Urgent">Urgent</option>
          </select>
        </div>

        <div className="mb-4 flex gap-4">
          <label className="block text-sm font-bold mb-2">Deadline</label>
          <input
            type="date"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            className="w-full px-3 py-2 border rounded  border-none outline-none"
          />
        </div>

        <div className="mb-4 flex gap-4">
          <label className="block text-sm font-bold mb-2">Description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border rounded  border-none outline-none"
          />
        </div>

        <div className="flex justify-end">
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Create Task
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTask;
