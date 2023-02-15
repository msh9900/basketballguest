import React from "react";
import styled from "styled-components";
import { useSelector } from "react-redux";

const Container = styled.div`
  width: 40px;
  height: 60px;
  margin-left: 12.5px;
`;

const Img = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  object-fit: cover;
`;
const UserName = styled.div`
  width: 40px;
  height: 20px;
  font-size: 16px;
  text-align: center;
`;
const CustomUserAvartar = () => {
  const userImg = useSelector((state: any) => state.login?.userImg);
  const userId = useSelector((state: any) => state.login?.userId);

  return (
    <Container>
      <Img src={userImg} alt="유저이미지" />
      <UserName>{userId}</UserName>
    </Container>
  );
};

export default CustomUserAvartar;
