import styled from "styled-components";
import { mobile } from "../responsive";
import { useState } from "react";
import { login } from "../redux/apiCalls";
import { useDispatch, useSelector } from "react-redux";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const { isFetching, error } = useSelector((state) => state.user);
  const handleUsername = function (event) {
    const { value } = event.target;
    setUsername((prev) => value);
  };
  const handlePassword = function (event) {
    const { value } = event.target;
    setPassword((prev) => value);
  };
  const handleClick = function (event) {
    event.preventDefault();
    login(dispatch, { username, password });
    setUsername("");
    setPassword("");
  };

  return (
    <Container>
      <Wrapper>
        <Title>SIGN IN</Title>
        <Form>
          <Input
            placeholder="username"
            onChange={handleUsername}
            value={username}
          />
          <Input
            placeholder="password"
            type="password"
            onChange={handlePassword}
            value={password}
          />
          <Button onClick={handleClick} disabled={isFetching}>
            LOGIN
          </Button>
          {error && <Error>Something went wrong ...</Error>}
          <Link>DO NOT YOU REMEMBER THE PASSWORD?</Link>
          <Link>CREATE A NEW ACCOUNT</Link>
        </Form>
      </Wrapper>
    </Container>
  );
};

export default Login;

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: pink;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  width: 25%;
  padding: 20px;
  background-color: white;
  ${mobile({ width: "75vw" })};
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0px;
  padding: 10px;
`;

const Button = styled.button`
  min-width: 40%;
  margin: 20px 0px;
  border: none;
  padding: 10px;
  background-color: teal;
  color: white;
  font-size: 20px;
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;

const Link = styled.a`
  font-size: 12px;
  margin: 5px 0px;
  text-decoration: underline;
  cursor: pointer;
`;

const Error = styled.span`
  color: red;
`;
