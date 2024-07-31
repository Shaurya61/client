import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Task } from '@/types';
import Cookies from 'js-cookie';

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const token = Cookies.get('token'); // Retrieve token from Cookies

  const response = await axios.get('/api/tasks', {
    headers: {
      Authorization: `Bearer ${token}`, // Include the token in the headers
    },
  });

  console.log('API response:', response.data); // Log the raw API response
  
  const tasks: Task[] = response.data.map((task: any) => ({
    id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    deadline: task.deadline,
    createdAt: task.createdAt, // Include the createdAt field
  }));
  
  return tasks;
});

export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Task, { getState }) => {
    const token = Cookies.get('token'); // Retrieve token from Cookies

    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.post('/api/tasks', task, {
      headers: {
        Authorization: `Bearer ${token}`, // Include the token in the headers
      },
    });

    return {
      ...response.data,
      id: response.data.id, // Ensure the id is included in the returned task
    } as Task;
  }
);

interface TaskState {
  tasks: Task[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

const initialState: TaskState = {
  tasks: [],
  status: 'idle',
  error: null,
};

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
        console.log('Fetched tasks:', state.tasks.map(task => task.id)); // Log fetched task IDs
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to fetch tasks';
      })
      .addCase(createTask.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(createTask.fulfilled, (state, action: PayloadAction<Task>) => {
        state.status = 'succeeded';
        state.tasks.push(action.payload);
        console.log('Created task with id:', action.payload.id); // Log created task ID
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create task';
      });
  },
});

export default taskSlice.reducer;
