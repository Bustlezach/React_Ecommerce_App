import styled from "styled-components";
import Announcement from '../components/Announcement';
import Navbar from '../components/Navbar';
import Products from '../components/Products';
import Newsletter from '../components/Newsletter';
import Footer from '../components/Footer';
import { mobile } from "../responsive";
import {useLocation} from "react-router-dom";
import { useState } from "react";




const ProductList = () => {
  const location = useLocation();
  const cat = location.pathname.split("/")[2];

  // const cat = () => {
  //   let word = location.pathname.split("/")[2];
  //   word = word.charAt(0).toUpperCase() + word.substring(1);
  //   return word;
  // }

  const [filters, setFilters ] = useState({});
  const [sort, setSort ] = useState("newest");

  const handleSort = (event) => {
    const {value} = event.target;
    setSort(prev => (value));
  };

  const handleFilters = (event) => {
    const { value, name } = event.target;
    setFilters((prev) => ({
      ...prev,
      [name]: value,
    }));
  };



  return (
    <Container>
      <Navbar />
      <Announcement />
      <Title>{cat}</Title>
      <FilterContainer>
        <Filter>
          <FilterText>Filter products:</FilterText>
          <Select name="color" onChange={handleFilters}>
            <Option disabled>Colour</Option>
            <Option>White</Option>
            <Option>Black</Option>
            <Option>Red</Option>
            <Option>Blue</Option>
            <Option>Yellow</Option>
            <Option>Green</Option>
          </Select>
          <Select name="size" onChange={handleFilters}>
            <Option disabled>Size</Option>
            <Option>XS</Option>
            <Option>S</Option>
            <Option>M</Option>
            <Option>L</Option>
            <Option>XL</Option>
          </Select>
        </Filter>
        <Filter>
          <FilterText>Sort products:</FilterText>
          <Select onChange={handleSort}>
            <Option value="newest">Newest</Option>
            <Option value="asc">Price (asc)</Option>
            <Option value="desc">Price (desc)</Option>
          </Select>
        </Filter>
      </FilterContainer>
      <Products filters={filters} sort={sort} cat={cat}/>
      <Newsletter />
      <Footer/>
    </Container>
  )
}

export default ProductList;

const Container = styled.div``;

const Title = styled.h1`
  margin: 20px;
`;

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Filter = styled.div`
  margin: 20px;
  ${mobile({margin: "0px 20px"})};
`;

const FilterText = styled.span`
  font-size: 20px;
  font-weight: 600;
  margin-right: 20px;
  ${mobile({marginRight: "0px"})};
`;

const Select = styled.select`
  padding: 10px;
  margin: 20px;
  ${mobile({margin: "5px"})};
`;

const Option = styled.option``;
