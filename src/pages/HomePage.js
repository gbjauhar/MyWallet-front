import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "../auth";
import axios from "axios";
import Loading from "../Loading";
import Entry from "../components/Entry";
import logout from "./img/log-out-outline.svg"
import addImg from "./img/add-circle-outline.svg"
import deleteImg from "./img/remove-circle-outline.svg"
import updateTotal from "../services/price.service";

export default function HomePage() {
  const { user, setUser } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [pageLoading, setPageLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) {
      alert("Você precisa fazer login para visualizar a página!")
      navigate("/")
      return
    }
    const config = { headers: { "Authorization": `Bearer ${user.token}` } };
    axios
      .get(`${process.env.REACT_APP_API_BASE_URL}/home`, config)
      .then((res) => {
        setEntries(res.data);
        setPageLoading(false);
        setUser({ ...user, entries });

      })
      .catch((res) => console.log(res));
  }, [entries]);


  function logOut() {
    setUser(null)
    navigate("/")
  }
  if (pageLoading) {
    return <Loading />;
  } else {
    return (
      <ContainerPage>
        <Header>
          <h1>Olá, {user.name}
          </h1>
          <img src={logout} alt="logOut" onClick={logOut} />
        </Header>
        <Get>
          {user.entries.length === 0 ?
            <p>Não há registros de <br /> entrada ou de saída</p>
            :
            user.entries.map((e) =>
              <Entry
                type={e.type}
                description={e.description}
                cost={e.cost}
                time={e.time}
                id={e._id} />
            )
          }
        </Get>
        <Total total={updateTotal(user.entries)}><h1>SALDO</h1><h2>{updateTotal(user.entries).toFixed(2).toString().replaceAll(".", ",")}</h2></Total>
        <ButtonContainer>
          <Link to="/income" style={{ textDecoration: 'none' }}>
            <Button>
              <img src={addImg} />
              <h1>Nova <br />entrada</h1>
            </Button>
          </Link>
          <Link to="/expense" style={{ textDecoration: 'none' }}>
            <Button>
              <img src={deleteImg} />
              <h1>Nova <br />saída</h1>
            </Button>
          </Link>
        </ButtonContainer>
      </ContainerPage>
    );
  }
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
  p{
    font-family: 'Raleway';
    font-style: normal;
    font-weight: 400;
    font-size: 20px;
    text-align: center;
    color: #868686;
      }
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
border: none;
    cursor: pointer;
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


