import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useDispatch } from "react-redux";
import { createTask } from "@/redux/slices/taskSlices";
import { Task } from "@/types";
import { v4 as uuidv4 } from "uuid";
import { AppDispatch } from "@/redux/store";
import { Calendar, Loader, Pencil } from 'lucide-react';
import Image from 'next/image';

interface SheetDemoProps {
  closeSheet: () => void;
  defaultStatus: "To do" | "In progress" | "Under review" | "Finished"; // Add defaultStatus prop
}

export function CreateTask({ closeSheet, defaultStatus }: SheetDemoProps) { // Destructure defaultStatus
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState<"To do" | "In progress" | "Under review" | "Finished">(defaultStatus); // Use defaultStatus as initial value
  const [priority, setPriority] = useState<"Low" | "Medium" | "Urgent" | undefined>(undefined);
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
    closeSheet(); // Close the sheet after submission
  };

  return (
    <Sheet open={true} onOpenChange={closeSheet}>
      <SheetContent className="p-6 bg-white rounded-lg shadow-md w-1/3">
        <form onSubmit={handleSubmit} className="space-y-4 w-full">
          <div className="mb-4">
            <Label htmlFor="title" className="sr-only">Title</Label>
            <Input
              id="title"
              type="text"
              value={title}
              placeholder="Title"
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 rounded p-4 h-24 text-4xl font-medium"
              required
            />
          </div>

          <div className="mb-4 flex gap-4 items-center">
            <Loader className='w-6 h-6 ' />
            <Label htmlFor="status">Status</Label>
            <select
              id="status"
              value={status}
              onChange={(e) =>
                setStatus(
                  e.target.value as "To do" | "In progress" | "Under review" | "Finished"
                )
              }
              
              className="w-full px-3 py-2 rounded outline-none text-center"
            >
              <option value="To do">To do</option>
              <option value="In progress">In progress</option>
              <option value="Under review">Under review</option>
              <option value="Finished">Finished</option>
            </select>
          </div>

          <div className="mb-4 flex gap-4 items-center">
            <Image src='/priority.svg' width={20} height={20} alt="priority" />
            <Label htmlFor="priority">Priority</Label>
            <select
              id="priority"
              value={priority || ""}
              onChange={(e) =>
                setPriority(e.target.value as "Low" | "Medium" | "Urgent")
              }
              className="w-full px-3 py-2 outline-none text-center"
            >
              <option value="">Select Priority</option>
              <option value="Low">Low</option>
              <option value="Medium">Medium</option>
              <option value="Urgent">Urgent</option>
            </select>
          </div>

          <div className="mb-4 flex items-center gap-4 ">
            <Calendar />
            <Label htmlFor="deadline">Deadline</Label>
            <Input
              id="deadline"
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full  outline-none text-center justify-center"
            />
          </div>

          <div className="mb-4 flex items-center gap-4">
            <Pencil />
            <Label htmlFor="description">Description</Label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full outline-none pl-6 placeholder:text-center mr-12"
              placeholder='Description'
            />
          </div>

          <div className="flex justify-end">
            <Button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Create Task
            </Button>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
