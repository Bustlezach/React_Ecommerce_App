import { Search, ShoppingCartOutlined } from "@mui/icons-material";
import React, { useEffect } from "react";
import styled from "styled-components";
import { mobile } from "../responsive";
import { useSelector } from "react-redux";

const Navbar = () => {
  const quantity = useSelector((state) => state.cart.quantity);

  return (
    <Container>
      <Wrapper>
        <Left>
          <Language>EN</Language>
          <SearchContainer>
            <Input placeholder="search" />
            <Search style={{ color: "gray", fontSize: 16 }} />
          </SearchContainer>
        </Left>
        <Center>
          <Logo>BUSTLE.</Logo>
        </Center>
        <Right>
          <MenuItem>REGISTER</MenuItem>
          <MenuItem>sign in</MenuItem>
          <MenuItem>
            <ShoppingCartOutlined color="action" />
            <Shoppingquantity>{quantity}</Shoppingquantity>
            {/* <Badge badgecontent={quantity} color="primary">
              <ShoppingCartOutlined color="action" />
            </Badge> */}
          </MenuItem>
        </Right>
      </Wrapper>
    </Container>
  );
};

export default Navbar;

const Container = styled.div`
  height: 60px;
  ${mobile({ height: "50px" })};
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  ${mobile({ padding: "10px 0px" })};
`;

const Left = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
`;

const Language = styled.span`
  font-size: 14px;
  cursor: pointer;
  ${mobile({ display: "none" })};
`;

const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
`;

const Input = styled.input`
  border: none;
  ${mobile({ width: "40px" })};
`;

const Center = styled.div`
  flex: 1;
  text-align: center;
`;

const Logo = styled.h1`
  font-weight: bold;
  ${mobile({ fontSize: "24px" })};
`;

const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  ${mobile({ flex: 2, justifyContent: "center" })};
`;

const MenuItem = styled.div`
  font-size: 14px;
  cursor: pointer;
  margin-left: 25px;
  :nth-last-child() {
    position: relative;
  }
  ${mobile({ fontSize: "12px", marginLeft: "10px" })};
`;

const Shoppingquantity = styled.span`
  position: absolute;
  top: 1px;
  right: 22px;
  color: white;
  font-weight: 600;
  padding: 3px;
  background-color: #0a8b62;
  text-align: center;
  border-radius: 50%;
  z-index: -2;
`;
