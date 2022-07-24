import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SongMetaData, SongMetadataWithId } from 'server/media/types';
import { nanoid } from 'nanoid';

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
    initialState: [] as SongMetadataWithId[],
    reducers: {
        addToPlaylist: (state, action: PayloadAction<SongMetaData>) => {
            state.push({
                ...defaults,
                ...action.payload,
                identifier: nanoid(),
            });
        },
    },
});

export default playlist.reducer;
export const { actions } = playlist;
