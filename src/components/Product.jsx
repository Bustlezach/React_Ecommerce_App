import { 
  FavoriteBorderOutlined, 
  SearchOutlined, 
  ShoppingCartOutlined
 } from '@mui/icons-material';
import React from 'react'
import styled from 'styled-components'



const Info = styled.div`
 display: none;
 width: 100%;
 height: 100%;
 position: absolute;
 top: 0;
 left: 0;
 background-color: rgba(0, 0, 0, 0.1);
 z-index: 3;
 align-items: center;
 justify-content: center;
 transition: all 0.5s ease;
 cursor: pointer;
`;

const Container = styled.div`
  flex: 1;
  margin: 5px;
  min-width: 280px;
  height: 350px;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f5fbfc;
  position: relative;

  &:hover ${Info}{
    display: flex;
  }
`;

const Circle = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  background-color: white;
  position: absolute;
`;

const Image = styled.img`
  height: 75%;
  width: 100%;
  z-index: 2;
`;

const Icon = styled.div`
 width: 40px;
 height: 40px;
 border-radius: 50%;
 background-color: white;
 display: flex;
 align-items: center;
 justify-content: center;
 margin: 10px;
 transition: all 0.5s ease;

 &:hover{
  background-color: #e9f5f5;
  transform: scale(1.2);
 }
`;

const Product = ({ item }) => {
  return (
    <Container>
      <Circle />
      <Image src={item.img} />
      <Info>
        <Icon><ShoppingCartOutlined /></Icon>
        <Icon><SearchOutlined /></Icon>
        <Icon><FavoriteBorderOutlined /></Icon>
      </Info>
    </Container>
  )
}

export default Product