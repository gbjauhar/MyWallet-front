import { Link } from "react-router-dom"
import styled from "styled-components"

export default function HomePage(){
    return(
        <ContainerPage>
            <Get>
            </Get>
            <Link to="/expense"><Expense>Saída</Expense></Link>
            <Link to="/income"><Income>Entrada</Income></Link>
            
        </ContainerPage>
    )
}

const ContainerPage = styled.div`
`

const Get = styled.div`
background-color: white;
height: 100px;
`

const Expense = styled.button`

`

const Income = styled.button`

`