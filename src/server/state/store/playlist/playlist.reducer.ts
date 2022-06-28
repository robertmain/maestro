import { Reducer } from 'redux';
import { SongMetaData } from 'server/media/types';

/** Redux actions that can be committed to manipulate the playlist */
export enum PLAYLIST {
    /** Add an item to the playlist */
    APPEND = 'APPEND',
}

export const playlist: Reducer<SongMetaData[]> = (state = [], action) => {
    /* eslint-disable @typescript-eslint/indent, indent */
    switch (action.type) {
        case PLAYLIST.APPEND:
            return [
                ...state,
                action.payload,
            ];
        default:
            return state;
    }
    /* eslint-enable @typescript-eslint/indent, indent */
};
