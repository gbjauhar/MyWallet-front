import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import AuthContext from "./auth"

export default function IncomePage() {
    const [form, setForm] = useState({ cost: "", description: "" })
    const { user } = useContext(AuthContext)
    const navigate = useNavigate()
    function post(e) {
        e.preventDefault()
        const config = { headers: { "Authorization": `Bearer ${user.token}` } }
        axios.post(`${process.env.REACT_APP_API_BASE_URL}/income`, form, config)
            .then(() => {
                navigate("/home")
            })
            .catch((res) => {
                alert(res.data)
            })
    }
    function handleChange(e) {
        setForm({ ...form, [e.target.name]: e.target.value })
    }
    return (
        <ContainerPage>
            <h1>Nova entrada</h1>
            <Form onSubmit={post}>
                <input
                    name="cost"
                    placeholder="Valor"
                    type="number"
                    value={form.cost}
                    onChange={handleChange}
                    required />
                <input
                    name="description"
                    placeholder="Descrição"
                    type="text"
                    value={form.description}
                    onChange={handleChange} 
                    required/>
                <button type="submit">Salvar entrada</button>
            </Form>
        </ContainerPage>
    )
}

const ContainerPage = styled.div`
display:flex;
flex-direction: column;
align-items: center;
h1{
    width: 80%;
    justify-content: flex-start;
    color: #ffffff;
    margin-bottom: 40px;
    margin-top: 25px;
    font-family: "Raleway";
    font-weight: 700;
    font-size: 26px;
}
`

const Form = styled.form`
display: flex;
flex-direction: column;
align-items: center;
input{
    width: 326px;
    height: 58px;
    border: 1px solid #d5d5d5;
    color: #d4d4d4;
    box-sizing: border-box;
    margin-bottom: 13px;
    border-radius: 5px;
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
button{
    display:flex;
    justify-content: center;
    align-items: center;
    width: 326px;
    height: 46px;
    background-color: #a328d6;
    border-radius: 5px;
    margin-bottom: 5%;
    font-family: "Raleway";
    font-weight: 700;
    font-size: 26px;
    color:white;
    border: none;
    cursor: pointer;
}
`