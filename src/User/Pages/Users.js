import React from "react";
import UsersList from "../Components/UsersList";

const Users = (props) => {
  const USERS = [
    {
      id: "u1",
      name: "Shridutt",
      places: 4,
      image : 'blue_person.jpeg'
    },
    {
        id: "u2",
        name: "Narendra",
        places: 10,
        image : 'blue_person.jpeg'
    },
    {
        id: "u3",
        name: "Udayprabha",
        places: 12,
        image : 'blue_person.jpeg'
    },
    {
        id: "u4",
        name: "Dushyant",
        places: 12,
        image : 'blue_person.jpeg'
    },
    {
      id: "u5",
      name: "Dushyant",
      places: 12,
      image : 'blue_person.jpeg'
    },
    {
      id: "u6",
      name: "Udayprabha",
      places: 12,
      image : 'blue_person.jpeg'
    },
    {
      id: "u7",
      name: "Narendra",
      places: 10,
      image : 'blue_person.jpeg'
    },
    {
      id: "u8",
      name: "Shridutt",
      places: 4,
      image : 'blue_person.jpeg'
    },
  ];
  return <UsersList items={USERS} />;
};
export default Users;
