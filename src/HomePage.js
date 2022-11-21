import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "./auth";
import axios from "axios";
import Loading from "./Loading";
import Entry from "./Entry";
import logOut from "./img/log-out-outline.svg"
import addImg from "./img/add-circle-outline.svg"
import deleteImg from "./img/remove-circle-outline.svg"

export default function HomePage() {
  const { user, setUser } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
  const [outra, setOutra] = useState([])
let filtrado = []
  function updateTotal(e) {
    let value = 0;
    for (let i = 0; i < e.length; i++) {
      if (e[i].type === "income") {
        e[i].cost = +e[i].cost;
        value += e[i].cost;
      } else if (e[i].type === "expense") {
        e[i].cost = +e[i].cost;
        value = value - e[i].cost;
      }
    }
    setTotal(value);
  }
  useEffect(() => {
    if (!user) {
      return;
    }
    const config = { headers: { "Authorization": `Bearer ${user.token}` } };
    axios
      .get("http://localhost:5000/home", config)
      .then((res) => {
        setEntries(res.data);
        updateTotal(res.data);
        setPageLoading(false);
        setUser({ ...user, entries: filtrado });
        
      })
      .catch((res) => alert(res.data));
  }, [entries]);
 /*  if (pageLoading) {
    return <Loading />;
  } else { */
    return (
      <ContainerPage>
        <Header>
          <h1>Olá, {user.name} 
          </h1>
          <img src={logOut} alt="logOut"/>
        </Header>
        <Get>
{entries.map((e) => 
              <Entry 
              type={e.type}
              description={e.description}
              cost={e.cost}
              time={e.time}
              id={e._id}/>
)}
        </Get>
        <Total total={total}><h1>SALDO</h1><h2>{total.toFixed(2).toString().replaceAll(".", ",")}</h2></Total>
        <ButtonContainer>
        <Link to="/income">
          <Button>
            <img src={addImg}/>
            <h1>Nova <br/>entrada</h1>
          </Button>
        </Link>
        <Link to="/expense">
          <Button>
            <img src={deleteImg}/>
            <h1>Nova <br/>saída</h1>
            </Button>
        </Link>
        </ButtonContainer>
      </ContainerPage>
    );
  }


const ContainerPage = styled.div`
display:flex;
flex-direction:column;
align-items:center;
justify-content:center;
`;

const Header = styled.div`
display:flex;
align-items: center;
justify-content: space-between;
margin-top:25px;
width:80%;
img{
  width: 23px;
  height: 24px;
}
h1{
  font-family: "Raleway";
  font-weight: 700;
  font-size: 26px;
  color: #ffffff;
}
`

const Get = styled.div`
  background-color: white;
  height: 426px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 326px;
  border-radius: 5px;
  box-sizing: border-box;
  position: relative;
  padding-bottom: 13px;
  overflow: scroll;
`;

const Total = styled.div`
display:flex;
width: 326px;
background-color: white;
height: 20px;
margin-top: -5px;
z-index: 1;
position: relative;
h1{
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  position: absolute;
  left: 5%;
}
h2{
  font-family: "Raleway";
  font-style: normal;
  font-weight: 700;
  font-size: 17px;
  position: absolute;
  right: 5%;
  color: ${props => props.total > 0 ? "green" : "red"}
}
`

const ButtonContainer = styled.div`
display: flex;
justify-content: space-between;
width: 90%;
`


const Button = styled.button`
display: flex;
justify-content: flex-start;
align-items: flex-end;
width: 155px;
height: 114px;
background-color: #a328d6;
border-radius: 5px;
margin-top: 5%;
margin-bottom: 9px;
box-sizing: border-box;
padding-left: 10px;
padding-bottom: 9px;
position: relative;
img{
  position: absolute;
  top: 5%;
  width: 25px;
height: 25px;
}
h1{
  font-family: "Raleway";
  font-weight: 700;
  font-size: 16px;
  color: #ffffff;

}
`;


