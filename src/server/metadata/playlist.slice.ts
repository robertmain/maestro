import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SongMetaData } from 'server/media/types';

/**
 * Default values
 */
export const defaults: Omit<SongMetaData, 'duration'> = {
    title: 'Unknown Title',
    album: 'Unknown Album',
    artist: 'Unknown Artist',
    genre: ['Unknown Genre'],
    sampleRate: 44100,
};

export const playlist = createSlice({
    name: 'playlist',
    initialState: [] as SongMetaData[],
    reducers: {
        addToPlaylist: (state, action: PayloadAction<SongMetaData>) => {
            state.push({
                ...defaults,
                ...action.payload,
            });
        },
    },
});

export default playlist.reducer;
export const { actions } = playlist;
