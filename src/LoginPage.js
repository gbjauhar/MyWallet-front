import axios from "axios";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "./auth";

export default function LoginPage() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  /* 
  useEffect(() => {
      if (user) {
          user.membership === null ? navigate("/subscriptions") : navigate("/home")
      }
  }, [user]) */
  function post(e) {
    e.preventDefault();
    axios
      .post("http://localhost:5000/", form)
      .then((res) => {
        setUser(res.data);
        
        navigate("/home");
      })
      .catch((res) => alert(res.data.message));
  }
  console.log(user);
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
      <Link to="/signup">
        <p>Primeira vez? Cadastre-se!</p>
      </Link>
    </ContainerPage>
  );
}

const ContainerPage = styled.main`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
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
