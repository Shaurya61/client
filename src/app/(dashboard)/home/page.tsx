"use client";

import React, { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import TaskForm from "@/components/TaskForm";
import TaskBoard from "@/components/TaskBoard";
import { useSelector, useDispatch } from "react-redux";
import { fetchTasks } from "@/redux/slices/taskSlices";
import { RootState, AppDispatch } from "@/redux/store";
import { Search, Calendar, Filter, Share2, CircleHelp, CirclePlus } from "lucide-react"; // Import required icons
import Image from "next/image";
import Link from "next/link";
import { CreateTask } from "@/components/CreateTask"; // Import the CreateTask component

export default function Home() {
  const dispatch: AppDispatch = useDispatch();
  const tasks = useSelector((state: RootState) => state.task.tasks);
  const status = useSelector((state: RootState) => state.task.status);
  const error = useSelector((state: RootState) => state.task.error);
  const user = useSelector((state: RootState) => state.auth.user);
  const [isTaskFormOpen, setTaskFormOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description!.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar openTaskForm={() => setTaskFormOpen(true)} /> {/* Pass the callback to Sidebar */}
      <div className="flex-1 p-6">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">
            {user ? `Good morning, ${user.name}!` : "Loading..."}
          </h1>
          <span className="flex gap-2">Help & Feedback 
          <CircleHelp className="text-gray-500" />
          </span>
        </div>
        <div className="flex justify-evenly mb-4 gap-2">
          <div className="bg-white flex p-6 rounded-md">
            <Image src="/image1.svg" width={100} height={100} alt="logo" />
            <span className="flex flex-col">
            <p className="font-bold text-gray-500">Introducing tags</p>
            <p className=" text-gray-500">Easily categorize and find your notes by adding tags. Keep your workspace clutter-free and efficient.</p>
            </span>
          </div>
          <div className="bg-white flex p-6 rounded-md">
            <Image src="/image2.svg" width={100} height={100} alt="logo" />
            <span className="flex flex-col">
              <p className="font-bold text-gray-500">Share Notes Instantly</p>
              <p className=" text-gray-500">Effortlessly share your notes with others via email or link. Enhance collaboration with quick sharing options.</p>
            </span>
          </div>
          <div className="bg-white flex p-6 rounded-md">
            <Image src="/image3.svg" width={100} height={100} alt="logo" />
            <span className="flex flex-col">
            <p className="font-bold text-gray-500">Access Anywhere</p>
            <p className=" text-gray-500">Sync your notes across all devices. Stay productive whether you&apos;re on your phone, tablet, or computer.</p>
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between mb-4">
          <div>
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-2 rounded-lg shadow-sm outline-none"
              
            />
          </div>
          <div className="flex gap-4">
          <button className="p-2 text-gray-500 rounded-lg flex gap-3">
            <p>Calendar View</p>
            <Calendar />
          </button>
          <button className="p-2 text-gray-500 rounded-lg flex gap-3">
            <p>Automation</p>
            <Image src='/automation.svg' width={20} height={20} alt="automation" />
          </button>
          <button className="p-2 text-gray-500 rounded-lg flex gap-3">
            <p>Filter</p>
            <Filter />
          </button>
          <button className="p-2 text-gray-500 rounded-lg flex gap-3">
            <p>Share</p>
            <Share2 />
          </button>
          <button
            onClick={() => setTaskFormOpen(true)} // Open the task form
            className=" bg-indigo-800 text-white font-medium p-3 rounded-md flex gap-4"
          >
            Create new
            <CirclePlus className=" bg-white text-indigo-700 rounded-full" />
          </button>
          </div>
        </div>

        {isTaskFormOpen && (
          <div className="mb-6">
            <CreateTask closeSheet={() => setTaskFormOpen(false)} defaultStatus="To do" /> {/* Pass the close function */}
          </div>
        )}

        {status === "loading" && <p>Loading tasks...</p>}
        {status === "failed" && <p>{error}</p>}
        {status === "succeeded" && <TaskBoard tasks={filteredTasks} />}
      </div>
    </div>
  );
}
