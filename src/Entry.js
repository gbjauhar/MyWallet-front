import styled from "styled-components";

export default function Entry({cost, type,time, description}){
    return(
        <Valores color={type}>{cost.toString().replaceAll(".", ",")}</Valores>
    )
}

const Valores = styled.h1`
  color: ${(props) => (props.color === "expense" ? "red" : "green")};
  text-decoration: ${(props) => props.line};
`;