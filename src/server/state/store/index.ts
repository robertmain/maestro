import { configureStore } from '@reduxjs/toolkit';
import { playlist } from './playlist/playlist.reducer';

export const store = configureStore({
    reducer: {
        playlist,
    },
});
