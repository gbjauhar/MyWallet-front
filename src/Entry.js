import axios from "axios";
import { useContext } from "react";
import styled from "styled-components";
import AuthContext from "./auth";

export default function Entry({cost, type,time, description, id}){
    const {user, setUser} = useContext(AuthContext)
    function post(){
        if(window.confirm("Tem certeza que quer apagar o registro?")){
            const config = {headers: {"Authorization": `Bearer ${user.token}`}}
            axios.delete(`http://localhost:5000/home/${id}`, config)
        }
    }
    return(<>
        <Valores color={type}>
            <h1>{time}</h1>
            <h2>{description}</h2>
            <h3>{cost.toString().replaceAll(".", ",")}</h3>
            </Valores>
        {/* <button onClick={post}>x</button> */}
        </>
    )
}

const Valores = styled.div`
display:flex;
position: relative;
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
  color: #c6c6c6;
  margin-left: 10px;
}
h3{
  font-family: "Raleway";
  font-weight: 400;
  font-size: 16px;
  color: ${(props) => (props.color === "expense" ? "red" : "green")};
  text-align: right;
  position:absolute;
  right: 0%;
}
`;