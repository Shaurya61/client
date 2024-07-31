import { configureStore } from '@reduxjs/toolkit';
import authReducer from '@/redux/slices/authSlices';
import taskReducer from '@/redux/slices/taskSlices';

const store = configureStore({
  reducer: {
    auth: authReducer,
    task: taskReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
