import React from 'react';
import PlaceList from '../Components/PlaceList';

const DUMMY_PLACE_LIST = [
    {
        id : 'p1',
        title : 'A popular Lake in Switzerland',
        description : 'THis is the most famous lake in Switzerland, and this is the most beautiful lake in the world.',
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
        description : 'THis is the most famous lake in Switzerland, and this is the most beautiful lake in the world.',
        address : 'Rosenweg 20, Lachen, Unterbäch, 3944, Switzerland',
        location : {
            lat : 46.8182,
            lng : 8.2275
        },
        creator : 'u1'
    },

    {
        id : 'p3',
        title : 'A popular Lake in Switzerland',
        description : 'THis is the most famous lake in Switzerland, and this is the most beautiful lake in the world.',
        address : 'Rosenweg 20, Lachen, Unterbäch, 3944, Switzerland',
        location : {
            lat : 46.8182,
            lng : 8.2275
        },
        creator : 'u1'
    }
]

const UserPlaces = (props) =>{
    return <PlaceList items={DUMMY_PLACE_LIST}/>;
};
export default UserPlaces;