import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const Btn = styled.div`
  background-color: #48acf0;
  padding: 20px;
  font-size: 24px;
  color: #fff;
  border-radius: 8px;
`;

const Image = styled.img`
  width: 8%;
  margin-bottom: 1.5rem;
`;

const Greetings = styled.p``;

function Success() {
  return (
    <Wrapper>
      <Image src='https://i.ibb.co/fCfC7MV/avatar.png' />
      <Btn>Successful</Btn>
      <Greetings>
        Your order is being prepared. Thanks for choosing Bustlezach shop.
      </Greetings>
    </Wrapper>
  )
}

export default Success