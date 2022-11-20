import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

export default function SignUpPage() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const navigate = useNavigate();

  function signup(e) {
    e.preventDefault();
    if (form.password !== form._password) {
      alert("Passwords should match!");

    } else {
      const request = { ...form };
      delete request._password;
      console.log(form);
      axios
      .post("http://localhost:5000/signup", request)
      .then((res) => {
        alert(res.data);
        navigate("/");
      })
      .catch((res) => {
        alert(res.data);
      });
    }
   
  }

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  return (
    <ContainerPage>
      <h1>MyWallet</h1>
      <Form onSubmit={signup}>
        <input
          name="name"
          placeholder="Nome"
          type="text"
          value={form.name}
          onChange={handleChange}
          required
        />
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
        <input
          placeholder="Confirme a senha"
          name="_password"
          value={form._password}
          type="password"
          required
        />
        <button type="submit">Entrar</button>
      </Form>
      <Link to="/">
        <p>Já tem uma conta? Entre agora!</p>
      </Link>
    </ContainerPage>
  );
}

const ContainerPage = styled.div`
  width: 100%;
  height: 100%;
  h1 {
    font-family: "Saira Stencil One";
    font-style: normal;
    font-weight: 400;
    font-size: 32px;
    line-height: 50px;
    color: #ffffff;
  }
  p {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 700;
    font-size: 15px;
    line-height: 18px;
    color: #ffffff;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  input {
    background: #ffffff;
    border-radius: 5px;
    width: 326px;
    height: 58px;
  }
  input::placeholder {
    font-family: "Raleway";
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    line-height: 23px;
    color: #000000;
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
  }
`;
