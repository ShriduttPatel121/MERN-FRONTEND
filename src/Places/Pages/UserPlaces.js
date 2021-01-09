import React from 'react';
import PlaceList from '../Components/PlaceList';
import { useParams } from 'react-router-dom';

const DUMMY_PLACE_LIST = [
    {
        id : 'p1',
        title : 'A popular Lake in Switzerland',
        description : 'This is the most famous lake in Switzerland, and this is the most beautiful lake in the world.',
        address : 'Rosenweg 20, Lachen, Unterbäch, 3944, Switzerland',
        location : {
            lat : 46.8182,
            lng : 8.2275
        },
        creator : 'u1'
    },

    {
        id : 'p2',
        title : 'A popular Lake in Switzerland',
        description : 'This is the most famous lake in Switzerland, and this is the most beautiful lake in the world.',
        address : 'Rosenweg 20, Lachen, Unterbäch, 3944, Switzerland',
        location : {
            lat : 46.8182,
            lng : 8.2275
        },
        creator : 'u2'
    },

    {
        id : 'p3',
        title : 'A popular Lake in Switzerland',
        description : 'This is the most famous lake in Switzerland, and this is the most beautiful lake in the world.',
        address : 'Rosenweg 20, Lachen, Unterbäch, 3944, Switzerland',
        location : {
            lat : 46.8182,
            lng : 8.2275
        },
        creator : 'u1'
    }
];

const UserPlaces = (props) =>{
    const id = useParams().userId;
    console.log(useParams());
    const ary = DUMMY_PLACE_LIST.filter(place => place.creator === id);
    return <PlaceList items={ary}/>;
};
export default UserPlaces;