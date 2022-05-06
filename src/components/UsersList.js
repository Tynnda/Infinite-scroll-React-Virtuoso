import React from "react";
import axios from "axios";
import { Virtuoso } from "react-virtuoso";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserContainer = styled.div`
  border-style: solid;
  display: flex;
  border-color: black;
  border-radius: 7px;
  margin: 10px;
  align-items: center;
  border-width: 1px;
  font-size: 16px;

  & img {
    margin: 18px;
    border-radius: 10px;
  }
`;

const UsersList = () => {
  const [usersInfo, setUsersInfo] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const getUsers = async (page) => {
    const APPID = "626ff3abad6a896031f3704f";
    const apiCall = axios.create({
      baseURL: "https://dummyapi.io/data/v1/",
      headers: { "app-id": APPID },
      params: {
        page,
        limit: 10,
      },
    });

    const response = await apiCall.get("/user");

    const array = [...usersInfo, ...response.data.data];

    setUsersInfo(array);
  };

  useEffect(() => {
    getUsers(currentPage);

    return () => {
      setUsersInfo([]);
    };
  }, []);

  const loadMore = async () => {
    const nextPage = (currentPage || 1) + 1;
    setCurrentPage(() => nextPage);
    getUsers(nextPage);
  };

  return (
    <Virtuoso
      style={{ height: "720px", width: "340px" }}
      data={usersInfo}
      initialItemCount={usersInfo.length}
      endReached={loadMore}
      itemContent={(index, user) => {
        return (
          <Link to={`/user/${user.id}`}>
            <UserContainer>
              <img src={user.picture} alt="photo" />
              <p>
                {user.firstName} {user.lastName}
              </p>
            </UserContainer>
          </Link>
        );
      }}
    />
  );
};

export default UsersList;
