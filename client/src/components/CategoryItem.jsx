import React from 'react'
import styled from 'styled-components'
import { mobile } from '../responsive';
import { Link } from 'react-router-dom';


const CategoryItem = ({item}) => {
  return (
    <Container>
      <Link to={`/products/${item.category}`}>
        <Image loading='lazy' src={item.img} />
        <Info>
          <Title>{item.title}</Title>
          <Button>SHOP NOW</Button>
        </Info>
      </Link>
    </Container>
  )
}

export default CategoryItem;


const Container = styled.div`
  flex: 1;
  margin: 3px;
  height: 50vh;
  position: relative;
`;

const Image = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  ${mobile({height: "20vh"})};
`;

const Title = styled.h1`
  color: white;
  margin-bottom: 20px;
`;

const Info = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Button = styled.button`
  border: none;
  padding: 10px;
  cursor: pointer;
  background-color: white;
  color: gray;
  font-weight: 600;
`;

