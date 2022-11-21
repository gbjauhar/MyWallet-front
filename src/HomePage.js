import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import AuthContext from "./auth";
import axios from "axios";
import Loading from "./Loading";
import Entry from "./Entry";
export default function HomePage() {
  const { user, setUser } = useContext(AuthContext);
  const [entries, setEntries] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageLoading, setPageLoading] = useState(true);
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
    const config = { headers: { Authorization: `Bearer ${user.token}` } };
    axios
      .get("http://localhost:5000/home", config)
      .then((res) => {
        setEntries(res.data);
        updateTotal(res.data);
        setPageLoading(false);
        setUser({ ...user, entries: res.data });
      })
      .catch((res) => alert(res.response.data.message));
  }, [entries]);
  if (pageLoading) {
    return <Loading />;
  } else {
    return (
      <ContainerPage>
        <Get>
          {entries.map((e) => (
              <Entry 
              type={e.type}
              description={e.description}
              cost={e.cost}
              time={e.time}/>

          ))}
        </Get>
        <Link to="/expense">
          <Expense>{total.toFixed(2).toString().replaceAll(".", ",")}</Expense>
        </Link>
        <Link to="/income">
          <Income>Entrada</Income>
        </Link>
      </ContainerPage>
    );
  }
}

const ContainerPage = styled.div``;

const Get = styled.div`
  background-color: white;
  height: 100px;
`;

const Expense = styled.button``;

const Income = styled.button``;


