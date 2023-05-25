import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "./auth";

export default function LoginPage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });


  useEffect(() => {
    if (user) {
      navigate("/home")
    }
    // eslint-disable-next-line
  }, [user])

  function post(e) {
    e.preventDefault();
    axios
      .post(process.env.REACT_APP_API_BASE_URL, form)
      .then((res) => {
        setUser(res.data);
        navigate("/home");
      })
      .catch((res) => {
        alert(res.data)
      });
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <ContainerPage>
      <h1>MyWallet</h1>
      <Form onSubmit={post}>
        <input
          name="email"
          placeholder="E-mail"
          type="email"
          value={form.email}
          onChange={handleChange}
          required
        />
        <input
          name="password"
          placeholder="Senha"
          type="password"
          value={form.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Entrar</button>
      </Form>
      <Link to="/signup" style={{ textDecoration: 'none' }}>
        <p>Primeira vez? Cadastre-se!</p>
      </Link>
    </ContainerPage>
  );
}

const ContainerPage = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  h1 {
    font-family: "Saira Stencil One";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #ffffff;
    margin-top: 159px;
    margin-bottom: 24px;
  }
  p {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
    margin-top:36px;
    cursor: pointer;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    background: #ffffff;
    border-radius: 5px;
    width: 326px;
    height: 58px;
    border: 1px solid #d5d5d5;
    margin-top: 10px;
  }
  input::placeholder {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
    text-align: center;
  }
  button {
    width: 326px;
    height: 46px;
    background: #a328d6;
    border-radius: 5px;
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 20px;
    line-height: 23px;
    color: #ffffff;
    margin-top:5%;
    margin-bottom:5%;
    border: none;
    cursor: pointer;
  }
`;
