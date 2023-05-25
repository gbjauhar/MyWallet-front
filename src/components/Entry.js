import axios from "axios";
import { useContext } from "react";
import styled from "styled-components";
import AuthContext from "../auth";
import { useNavigate } from "react-router-dom";

export default function Entry({ cost, type, time, description, id }) {
  const { user } = useContext(AuthContext)
  const navigate = useNavigate()
  function post() {
    if (window.confirm("Tem certeza que quer apagar o registro?")) {
      const config = { headers: { "Authorization": `Bearer ${user.token}` } }
      axios.delete(`${process.env.REACT_APP_API_BASE_URL}/home/${id}`, config)
      .then((res) => 
        alert(res.data.message)
      )
      .catch((err) => 
        alert("Erro ao apagar registro!")
      )
    }
  }
  return (
    <>
    <Valores color={type}>
      <h1>{time}</h1>
      <h2 onClick={() => {
        navigate("/edit", {state: {id}})
      }}>{description}</h2>
      <h3>{cost.toString().replaceAll(".", ",")}</h3>
      <h4 onClick={post}>x</h4>
    </Valores>
    
  </>
  )
}

const Valores = styled.div`
display:flex;
justify-content: space-between;
width: 90%;
margin-top: 15px;
h1{
  font-family: "Raleway";
  font-weight: 400;
  font-size: 16px;
  color: #c6c6c6;
}
h2{
  font-family: "Raleway";
  font-weight: 400;
  font-size: 16px;
  color: #000000;
  margin-left: 10px;
  cursor: pointer;
}
h3{
  font-family: "Raleway";
  font-weight: 400;
  font-size: 16px;
  color: ${(props) => (props.color === "expense" ? "red" : "green")};
}
h4{
  font-family: "Raleway";
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  color: #c6c6c6;

}
`;