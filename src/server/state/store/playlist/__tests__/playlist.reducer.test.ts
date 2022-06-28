import { configureStore } from '@reduxjs/toolkit';
import { Store } from 'redux';
import { SongMetaData } from 'server/media/types';
import { playlist as playlistReducer, PLAYLIST } from '../playlist.reducer';

describe('Playlist reducer', () => {
    let store: Store;
    beforeEach(() => {
        store = configureStore({
            reducer: {
                playlist: playlistReducer,
            },
        });
    });
    describe(PLAYLIST.APPEND, () => {
        it('returns a new playlist with the new song added', () => {
            const newSong: SongMetaData = {
                duration: 1234,
            };
            store.dispatch({
                type: PLAYLIST.APPEND,
                payload: newSong,
            });
            const { playlist } = store.getState();

            expect(playlist).toHaveLength(1);
            expect(playlist).toContain(newSong);
        });
        it('returns a new playlist with all the existing songs', () => {
            const existingPlaylist: SongMetaData[] = [
                { duration: 1234 },
                { duration: 4567 },
                { duration: 8910 },
            ];
            existingPlaylist.forEach((song) => {
                store.dispatch({
                    type: PLAYLIST.APPEND,
                    payload: song,
                });
            });

            store.dispatch({
                type: PLAYLIST.APPEND,
                payload: { duration: 1111 },
            });
            const { playlist } = store.getState();

            expect(playlist).toHaveLength(existingPlaylist.length + 1);
        });
    });
});
