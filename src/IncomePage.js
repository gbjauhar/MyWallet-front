import axios from "axios"
import { useContext, useState } from "react"
import { useNavigate } from "react-router-dom"
import styled from "styled-components"
import AuthContext from "./auth"

export default function IncomePage(){
    const [form, setForm] = useState({cost:"", description:""})
    const {user, setUser} = useContext(AuthContext)
    const navigate = useNavigate()
    function post(e){
        e.preventDefault()
        const config = {headers: {"Authorization": `Bearer ${user.token}`}}
        axios.post("http://localhost:5000/income", form, config)
        .then((res) =>{
        navigate("/home")
    })
    .catch((res) =>{
        alert(res.data)
    })
    }
console.log(user)
    function handleChange(e){
        setForm({...form, [e.target.name]:e.target.value})
    }
    return(
        <ContainerPage>
            <form onSubmit={post}>
            <input
            name="cost"
            placeholder="Valor"
            type="text"
            value={form.cost}
            onChange={handleChange}/>
            <input
            name="description"
            placeholder="Descrição"
            type="text"
            value={form.description}
            onChange={handleChange}/>
            <button type="submit">Enviar</button>
            </form>
        </ContainerPage>
    )
}

const ContainerPage = styled.div``