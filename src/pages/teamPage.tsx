import React, { useEffect } from 'react';
import { Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar/searchBar';
import { TEAM } from '../constants';
import { combinedStateInterface } from '../store/store';
import { fetchDetailThunk } from '../services/api';
import TeamInfo from '../components/TeamInfo/teamInfo';
import FetchError from '../components/fetchError';
import { resetFetchStatusesActionCreator } from '../store/thunks/thunkActions';
import Breadcrumbs from '../components/Breadcrumbs/breadcrumbs';
import { toggleSearchBarActionCreator } from '../store/searchBar/searchBarActions';

interface urlParams {
    id: string;
}

const TeamPage = (): JSX.Element => {
    const urlParams = useParams<urlParams>();
    const dispatch = useDispatch();
    const reduxState = useSelector((state: combinedStateInterface) => state);

    useEffect(() => {
        if (
            !reduxState.thunk.fetch_in_progress &&
            reduxState.thunk.fetch_failed_count < 3 &&
            !reduxState.thunk.fetch_success
        ) {
            dispatch(fetchDetailThunk(TEAM, urlParams.id));
        }
    });

    useEffect(() => {
        return () => {
            dispatch(toggleSearchBarActionCreator(false));
            dispatch(resetFetchStatusesActionCreator());
        };
    }, [dispatch]);

    const team = reduxState.team.team;

    return (
        <div className="container">
            <SearchBar />
            <Breadcrumbs key="breadcrumbsTeam" state={reduxState} />

            {reduxState.thunk.fetch_in_progress ? (
                <div className="center_container">
                    <Spinner animation="border" />
                </div>
            ) : (
                <>
                    {reduxState.thunk.fetch_failed ? (
                        <>
                            <FetchError />
                        </>
                    ) : (
                        <>
                            <>
                                {team && (
                                    <TeamInfo
                                        {...{
                                            availability: team.availability,
                                            cost: team.cost,
                                            equipment: team.equipment,
                                            facebook_link: team.facebook_link,
                                            gender: team.gender,
                                            image: team.image,
                                            instagram_link: team.instagram_link,
                                            long_description: team.long_description,
                                            name: team.name,
                                            schedule: team.schedule,
                                            tryout_dates: team.tryout_dates,
                                            webpage: team.webpage,
                                            season: team.season,
                                            short_description: team.short_description,
                                            skill_level: team.skill_level,
                                        }}
                                        key={team.id}
                                    />
                                )}
                            </>
                        </>
                    )}
                </>
            )}
        </div>
    );
};
export default TeamPage;
