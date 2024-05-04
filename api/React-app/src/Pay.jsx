import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import StripeCheckout from 'react-stripe-checkout';
import axios from "axios";



const Wrapper = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Btn = styled.button`
  background-color: black;
  color: white;
  padding: 20px;
  border-radius: 5px;
  cursor: pointer;
`;

const KEY = 'pk_test_51P6jqB2LB2VRcx6CYVD3azbDQG22LBHwjRKryWhTifq9LZafmSSGwkbIOB6GdiA3tbCfGfo0Vb67mS3ozkEwqvfk004nQt50QS';

function App() {
  const [ stripeToken, setStripeToken] = useState(null);
  const navigate = useNavigate();
  
  const onToken = (token) => {
    setStripeToken(token);
  };

  useEffect(() => {
    const makeRequest = async () => {
      try {
        const uri = 'http://localhost:5000/api/checkout/payment';
        const res = await axios.post(
          uri,
          {
            tokenId: stripeToken.id,
            amount: 5000,
          }
        );
        console.log(res.data);
        navigate("/success");
      }catch (err) {
        console.log(err);
      }
    };
    stripeToken && makeRequest();
  }, [stripeToken, navigate]);

  return (
    <Wrapper>
      {stripeToken ? (<span>Processing. Please wait...</span>)
       : (
        <StripeCheckout
        name="Bustlezach shop"
        image="https://i.ibb.co/fCfC7MV/avatar.png"
        billingAddress
        shippingAddress
        description="Your total is $50"
        amount={5000}
        token= {onToken}
        stripeKey = {KEY}
        >
          <Btn>Pay Now</Btn>
        </StripeCheckout>
      )}
    </Wrapper>
  );
}

export default App;
