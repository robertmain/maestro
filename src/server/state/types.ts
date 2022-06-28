import { store } from './store';
/**
 * Redux store token. Use to inject app store into classes
 */
export const STORE = 'STORE';

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
