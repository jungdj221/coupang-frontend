import { Container, Form, Button } from "react-bootstrap";
import styled from "styled-components";
import { useState, useEffect } from "react";
import { asyncLogin } from "../store/user";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const H1 = styled.h1`
  font-size: 3rem;
  margin-top: 30px;
`;
const Login = () => {
  const [user, setUser] = useState({
    id: "",
    password: "",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const info = useSelector((state) => {
    return state.user;
  });
  //   useEffect(() => {
  //     console.log(info);
  //   }, [info]);
  const submit = () => {
    dispatch(asyncLogin(user));
    navigate("/"); //Link와 달리 이거는 새로고침과 같음 그래서 토큰정보를 따로 저장한것
  };

  return (
    <Container>
      <H1>로그인</H1>
      <Form.Control
        type="text"
        placeholder="아이디"
        style={{ marginBottom: "10px" }}
        value={user.id}
        onChange={(e) => setUser((prev) => ({ ...prev, id: e.target.value }))}
      />
      <Form.Control
        type="password"
        placeholder="비밀번호"
        value={user.password}
        onChange={(e) =>
          setUser((prev) => ({ ...prev, password: e.target.value }))
        }
      />
      <Button
        variant="dark"
        onClick={submit}
        style={{ width: "100%", marginTop: "10px" }}
      >
        로그인
      </Button>
    </Container>
  );
};
export default Login;
