import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import CityCard from '../components/cityCard';
import SearchBar from '../components/searchBar';
import SearchIcon from '../components/searchIcon';
import { CITY } from '../constants';
import { fetchDataThunk } from '../services/api';
import { combinedStateInterface } from '../store/store';

/* TODO
 * combine sportpage and clubpage into this page.
 * Sportcards should link to "/:City/Sport/:Sport"
 * ClubCards should link to "/:City/:Club"
 */

const CityPage = () => {
    const reduxState = useSelector((state: combinedStateInterface) => state);
    const dispatch = useDispatch();

    useEffect(() => {
        if (
            !reduxState.thunk.fetch_in_progress &&
            reduxState.thunk.fetch_failed_count < 3 &&
            !reduxState.thunk.fetch_success
        ) {
            dispatch(fetchDataThunk(CITY));
        }
    });

    const listContent = reduxState.city.cities.map((entry) => {
        return <CityCard {...{ id: entry.id, name: entry.name }} key={entry.id} />;
    });

    return (
        <div className="container">
            <div className="row">
                <div className="col">
                    <h1>Cities</h1>
                </div>
                <div className="col search_icon-container">
                    <SearchIcon />
                </div>
            </div>
            <SearchBar typeOfSearch={CITY} />
            <p>The sport has clubs in these cities: </p>
            {listContent}
        </div>
    );
};

export default CityPage;