import { useLocation, Link } from "react-router-dom";
import styled from "styled-components";
import Navbar from "../components/Navbar";
import Announcement from "../components/Announcement";
import Newsletter from "../components/Newsletter";
import Footer from "../components/Footer";
import { Add, Remove } from "@mui/icons-material";
import { mobile } from "../responsive";
import { useEffect, useState } from "react";
import { publicRequest } from "../requestMethods";
import Cart from "./Cart";


const Product = () => {
  const location = useLocation();
  const id = location.pathname.split("/")[2];

  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [colour, setColour] = useState("");
  const [size, setSize] = useState("");




  const handleQuantity = (type) => {
    if(type === "add") {
      setQuantity(prev => (prev + 1));
    } else {
      if (quantity === 1) {
        return;
      }
      setQuantity(prev => (prev - 1));
    }
  };

  const handleClick = ({product, quantity, colour, size}) => {
    <Link to="Cart" />
  };



  useEffect(() => {
    const getProduct = async () => {
      try {
        const res = await publicRequest.get(`/products/find/${id}`);
        setProduct((prev) => res.data.product);
      } catch (err) {
        console.log(err);
      }
    };

    getProduct();
  }, [id]);

  return (
    <Container>
      <Navbar />
      <Announcement />
      <Wrapper>
        <ImgContainer>
          <Image src={product.img} />
        </ImgContainer>
        <InfoContainer>
          <Title>{product.title}</Title>
          <Desc>
            {product.desc}
            {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat. Duis aute irure dolor in
            reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
            pariatur. */}
          </Desc>
          <Price>${product.price}</Price>
          <FilterContainer>
            <Filter>
              <FilterTitle>Colour</FilterTitle>
              {product.color?.map((c) => (
                <FilterColor color={c} key={c} onClick={()=>setColour(prev => (c)) }/>
              ))}
            </Filter>
            <Filter>
              <FilterTitle>Size</FilterTitle>
              <FilterSize onChange={(event) => setSize(prev => event.target.value)} >
                {product.size?.map((s) => (
                  <FilterSizeOption  key={s}>{s}</FilterSizeOption>
                ))}
              </FilterSize>
            </Filter>
          </FilterContainer>
          <AddContainer>
            <AmountContainer>
              <Remove onClick={() => handleQuantity("minus")} />
              <Amount>{quantity}</Amount>
              <Add onClick={() => handleQuantity("add")} />
            </AmountContainer>
            <Button onClick={handleClick}>ADD TO CART</Button>
          </AddContainer>
        </InfoContainer>
      </Wrapper>
      <Newsletter />
      <Footer />
    </Container>
  );
};

export default Product;

const Container = styled.div``;
const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  align-items: center;
  ${mobile({ padding: "10px", flexDirection: "column" })};
`;

const ImgContainer = styled.div`
  flex: 1;
`;

const Image = styled.img`
  width: 80%;
  height: 60vh;
  object-fit: cover;
  ${mobile({ height: "40vh", width: "100%" })};
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0 50px;
  ${mobile({ padding: "10px" })};
`;

const Title = styled.h1`
  font-weight: 400;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px;
`;

const FilterContainer = styled.div`
  width: 50%;
  margin: 30px 0px;
  display: flex;
  justify-content: space-between;
  ${mobile({ width: "100%" })};
`;

const Filter = styled.span`
  display: flex;
  align-items: center;
`;

const FilterTitle = styled.div`
  font-size: 20px;
  font-weight: 200;
`;

const FilterColor = styled.div`
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background-color: ${(props) => props.color};
  margin: 0px 5px;
  cursor: pointer;
`;

const FilterSize = styled.select`
  margin: 10px;
  padding: 5px;
`;

const FilterSizeOption = styled.option``;

const AddContainer = styled.div`
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  ${mobile({ width: "100%" })};
`;

const AmountContainer = styled.div`
  display: flex;
  align-items: center;
  font-weight: 700;
`;

const Amount = styled.span`
  width: 30px;
  height: 30px;
  border-radius: 10px;
  border: 1px solid teal;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0px 10px;
`;

const Button = styled.button`
  padding: 15px;
  border: 3px solid teal;
  font-weight: 500;
  background-color: white;
  cursor: pointer;
  margin-left: 20px;

  &:hover {
    background-color: #f8f4f4;
  }
`;
