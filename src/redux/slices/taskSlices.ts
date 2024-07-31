import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';
import { RootState } from '../store';
import { Task } from '@/types';
import Cookies from 'js-cookie';

// Fetch tasks
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
  const token = Cookies.get('token');
  const response = await axios.get('/api/tasks', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const tasks: Task[] = response.data.map((task: any) => ({
    id: task._id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    deadline: task.deadline,
    createdAt: task.createdAt,
  }));

  return tasks;
});

// Create task
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (task: Task) => {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.post('/api/tasks', task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return {
      ...response.data,
      id: response.data.id,
    } as Task;
  }
);

// Update task status
export const updateTaskStatus = createAsyncThunk(
  'tasks/updateTaskStatus',
  async (task: Task) => {
    const token = Cookies.get('token');
    if (!token) {
      throw new Error('User is not authenticated');
    }

    const response = await axios.put(`/api/tasks/${task.id}`, task, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data as Task;
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
      })
      .addCase(createTask.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message || 'Failed to create task';
      })
      .addCase(updateTaskStatus.fulfilled, (state, action: PayloadAction<Task>) => {
        const index = state.tasks.findIndex(task => task.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
      });
  },
});

export default taskSlice.reducer;
