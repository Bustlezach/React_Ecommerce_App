import {
   Email, 
   Facebook, 
   Instagram, 
   LocationCity, 
   Phone, 
   Twitter 
  } from "@mui/icons-material";
import styled from "styled-components"


const Container = styled.div`
  display: flex;
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 20px;
`;

const Center = styled.div`
  flex: 1;
  padding: 20px;
`;

const Title = styled.h3`
  margin-bottom: 30px;
`;

const List = styled.ul`
  list-style-type: none;
  margin: 0px;
  padding: 0px;
  display: flex;
  flex-wrap: wrap;
`;

const ListItem = styled.li`
  width: 50%;
  margin-bottom: 10px;
`;

const ContactItem = styled.div`
  margin-bottom: 20px;
  display: flex;
  align-items: center;
`;

const Payment = styled.img`
  width: 50%;
`;

const Right = styled.div`
  flex: 1;
  padding: 20px;
`;

const Logo = styled.h1``;

const Desc = styled.p`
  margin: 20px 0;
`;

const SocialContainer = styled.div`
  display: flex;
`;

const SocialIcon = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  color: white;
  background-color: ${props => props.color};
  display:flex;
  align-items: center;
  justify-content: center;
  margin-right: 20px;
`;


const Footer = () => {
  return (
    <Container>
      <Left>
        <Logo>Bustle.</Logo>
        <Desc>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
          Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut 
          aliquip ex ea commodo consequat.
        </Desc>
        <SocialContainer>
          <SocialIcon color='#3b5999'>
            <Facebook/>
          </SocialIcon>
          <SocialIcon color='#e4405f'>
            <Instagram/>
          </SocialIcon >
          <SocialIcon color='#55acee'>
            <Twitter/>
          </SocialIcon>
        </SocialContainer>
      </Left>
      <Center>
        <Title>Useful Links</Title>
        <List>
          <ListItem>Home</ListItem>
          <ListItem>Cart</ListItem>
          <ListItem>Man Fashion</ListItem>
          <ListItem>Woman Fashion</ListItem>
          <ListItem>Accessories</ListItem>
          <ListItem>My Account</ListItem>
          <ListItem>Order Tracking</ListItem>
          <ListItem>Wishlist</ListItem>
          <ListItem>Terms</ListItem>
        </List>
      </Center>
      <Right>
        <Title>Contact</Title>
        <ContactItem><LocationCity style={{marginRight: '10px'}} />Lokoja, Kogi State, Nigeria</ContactItem>
        <ContactItem><Phone style={{marginRight: '10px'}} />+234 90 7421 9117</ContactItem>
        <ContactItem><Email style={{marginRight: '10px'}} />Bustlezach01@gmail.com</ContactItem>
        <Payment src='https://i.ibb.co/Qfvn4z6/payment.png' />
      </Right>
    </Container>
  )
}

export default Footer
