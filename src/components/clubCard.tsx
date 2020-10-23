import React from 'react';
import { useDispatch } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import { clubInterface } from '../interfaces';
import { resetFetchStatusesActionCreator } from '../store/thunks/thunkActions';
import image from './placeholder.png';

const ClubCard = (club: clubInterface) => {
    const location = useLocation();
    const dispatch = useDispatch();
    return (
        <Link to={location.pathname + '/' + club.name} key={club.id} className={'unstyled_link'} onClick={()=>dispatch(resetFetchStatusesActionCreator())}>
            <div className="card Region">
                <h5 className="card-header card-title">{club.name}</h5>
                <div className="card-body">   
                    <img className="card-img-top" src={image} alt="Club"></img>
                </div>
            </div>
        </Link>
    );
};

export default ClubCard;
