import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import {cardType, CITY, CLUB, GROUP, REGION, SEARCH, SPORT, TEAM} from '../constants';
import { setCitiesActionCreator } from '../store/pages/city/cityActions';
import { setClubsActionCreator, setClubsActionDetailCreator } from '../store/pages/club/clubActions';
import { setGroupsActionCreator, setGroupsActionDetailCreator } from '../store/pages/group/groupActions';
import { setRegionsActionCreator } from '../store/pages/region/regionActions';
import { setSportsActionCreator, setSportsActionDetailCreator } from '../store/pages/sport/sportActions';
import { setTeamsActionCreator, setTeamsActionDetailCreator } from '../store/pages/team/teamActions';
import { combinedStateInterface } from '../store/store';
import {
    fetchInProgressActionCreator,
    fetchFailedActionCreator,
    fetchSuccessActionCreator,
    fetchDetailSuccessActionCreator,
} from '../store/thunks/thunkActions';
import { urlBuilderFetchData, urlBuilderFetchDetail } from './urlBuilders';
import {setSearchActionCreator} from "../store/pages/search/searchActions";

export const fetchData = async (url: string) => {
    try {
        const res = await fetch(url, {
            method: 'GET',
            headers: new Headers({
                Accept: 'application/json',
            }),
        });
        if (checkForErrorCodes(res)) {
            return 'Something went wrong';
        } else {
            return res.json();
        }
    } catch (error) {
        return 'Connection error';
    }
};

export const checkForErrorCodes = (result: any): boolean => {
    return result.status !== 200;
};

export const fetchDataThunk = (
    dataType?: cardType,
    url: string = '',
): ThunkAction<void, combinedStateInterface, unknown, Action<string>> => async (dispatch) => {
    let asyncResp;
    dispatch(fetchInProgressActionCreator());

    if (url.length > 0) {
        //Fetch next data (scrolling)
        asyncResp = await fetchData(url);
    } else {
        //Fetch based on cardType
        asyncResp = dataType ? await fetchData(urlBuilderFetchData(dataType)) : null;
    }
    let result = [];

    if (asyncResp === 'Something went wrong' || asyncResp === 'Connection error') {
        dispatch(fetchFailedActionCreator());
    } else {
        dispatch(fetchSuccessActionCreator({ next: asyncResp.next, previous: asyncResp.previous }));
        result = asyncResp.results;
    }

    switch (dataType) {
        case REGION: {
            dispatch(setRegionsActionCreator(result));
            break;
        }
        case SPORT: {
            dispatch(setSportsActionCreator(result));
            break;
        }
        case CLUB: {
            dispatch(setClubsActionCreator(result));
            break;
        }
        case TEAM: {
            dispatch(setTeamsActionCreator(result));
            break;
        }
        case CITY: {
            dispatch(setCitiesActionCreator(result));
            break;
        }
        case GROUP: {
            dispatch(setGroupsActionCreator(result));
            break;
        }

        case SEARCH: {
            dispatch(setSearchActionCreator(result));
        }
        default: {
            return;
            //TODO: add error
        }
    }
};

export const fetchDetailThunk = (
    dataType: cardType,
    id: string,
): ThunkAction<void, combinedStateInterface, unknown, Action<string>> => async (dispatch) => {
    dispatch(fetchInProgressActionCreator());

    //Fetch next data (scrolling)
    const asyncResp = await fetchData(urlBuilderFetchDetail(dataType, id));
    let result;

    if (asyncResp === 'Something went wrong' || asyncResp === 'Connection error') {
        dispatch(fetchFailedActionCreator());
    } else {
        dispatch(fetchDetailSuccessActionCreator());
        result = asyncResp;
    }

    switch (dataType) {
        case SPORT: {
            dispatch(setSportsActionDetailCreator(result));
            break;
        }
        case CLUB: {
            dispatch(setClubsActionDetailCreator(result));
            break;
        }
        case TEAM: {
            dispatch(setTeamsActionDetailCreator(result));
            break;
        }
        case GROUP: {
            dispatch(setGroupsActionDetailCreator(result));
            break;
        }
        default: {
            return;
            //TODO: add error
        }
    }
};
