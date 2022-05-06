import axios from "axios";
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import moment from "moment";
import styled from "styled-components";

const UserInfo = styled.div`
  margin: 2em;

  & img {
    border-radius: 7px;
  }
`;

const UserDetail = () => {
  const [userDetail, setUserDetail] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const params = useParams();

  const getUser = async () => {
    setIsLoading(true);
    setHasError(false);

    try {
      const APPID = "626ff3abad6a896031f3704f";
      const apiCall = axios.create({
        baseURL: "https://dummyapi.io/data/v1/",
        headers: { "app-id": APPID },
      });
      const response = await apiCall.get(`/user/${params.id}`);
      setUserDetail(response.data);
    } catch (error) {
      setHasError(true);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    getUser();
  }, [params.id]);

  const formattedTime = moment(userDetail.dateOfBirth).format("DD.MM.YYYY");

  return (
    <UserInfo>
      {hasError && <p>Something went wrong</p>}
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <h1>
            {userDetail.firstName} {userDetail.lastName}
          </h1>
          <img src={userDetail.picture} />
          <p>
            <strong>Email:</strong> {userDetail.email}
          </p>
          <p>
            <strong>Pohlavie:</strong> {userDetail.gender}
          </p>
          <p>
            <strong>Datum narodenia:</strong> {formattedTime}
          </p>
          <p>
            <strong>Telefon:</strong> {userDetail.phone}
          </p>
        </div>
      )}
    </UserInfo>
  );
};

export default UserDetail;
