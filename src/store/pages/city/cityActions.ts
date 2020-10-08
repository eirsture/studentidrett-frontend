import { cityInterface } from '../../../interfaces';

export const SET_CITIES = 'SET_CITIES';

interface setCitiesAction {
    type: typeof SET_CITIES;
    payload: cityInterface[];
}

export type cityActionTypes = setCitiesAction;

export const setCityActionCreator = (data: cityInterface[]): setCitiesAction => {
    return {
        type: SET_CITIES,
        payload: data,
    };
};
