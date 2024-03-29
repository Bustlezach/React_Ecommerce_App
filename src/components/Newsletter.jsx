import { Send } from '@mui/icons-material';
import React from 'react';
import styled from 'styled-components';
import { mobile } from '../responsive';


const Container = styled.div`
  height: 60vh;
  background-color: #fcf5f5;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Title = styled.h1`
  font-size: 70px;
  margin: 20px;
`;

const Desc = styled.div`
  font-size: 24px;
  font-weight: 300;
  margin-bottom: 20px;
  ${mobile({textAlign: "center"})};
`;

const InputContainer = styled.div`
  width: 50%;
  height: 40px;
  background-color: white;
  display: flex;
  justify-content: space-between;
  border: solid 1px lightgray;
  ${mobile({width: "80vw"})};
`;

const Input = styled.input`
  border: none;
  flex: 8;
  padding-left: 20px;
`;

const Button = styled.button`
  flex: 1;
  boder: none;
  background-color: teal;
  color: white;
`;

const NewsLetter = () => {
  return (
    <Container>
      <Title>Newsletter</Title>
      <Desc>Get timely updates from your favourite products.</Desc>
      <InputContainer>
        <Input placeholder='Your email'/>
        <Button>
          <Send />
        </Button>
      </InputContainer>
    </Container>
  )
}

export default NewsLetter
