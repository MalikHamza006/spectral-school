import { configureStore } from '@reduxjs/toolkit';
import uiReducer from './uiSlice';

/**
 * A single store for cross-cutting UI state.
 *
 * Kept intentionally small — see `uiSlice` for what does and does not belong
 * here. Adding a second slice should be a considered decision, not a default.
 */
export const store = configureStore({
  reducer: {
    ui: uiReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
