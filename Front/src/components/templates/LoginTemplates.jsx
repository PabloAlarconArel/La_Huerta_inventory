import styled from "styled-components";
import{InputText2,Title,Btnsave} from "../../index.js";
import{Device} from "../../styles/breakpoints";
import axios from "axios";
import { useState } from "react";  

export function LoginTemplates(){
    const [email,SetEmail]=useState("");
    const[password,SetPassword]=useState("");
    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post('http://localhost:3001/api/login',{
                email: email,
                password: password,
            });

        localStorage.setItem('token', res.data.token);
        alert('Login exitoso');
    } catch (error){
        alert('Error al iniciar sesión');
    }
    };
    return(
        <Container>
            <span className="contentCard">
            <div className="card">
                <Title>Iniciar Sesión</Title>
                <form onSubmit={handleLogin}>
                    <InputText2>
                        <input  className="form__field" placeholder="email" type="email" onChange={(e)=>SetEmail(e.target.value)}/>
                    </InputText2>
                    <InputText2>
                        <input  className="form__field" placeholder="contraseña" type="password" onChange={(e)=>SetPassword(e.target.value)}/>
                    </InputText2>
                    <Btnsave titulo="INGRESAR" bgcolor="#1CB0F6" color="255,255,255" width="100%" type="submit"/>
                </form>

            </div>
            </span>
        </Container>
    )
}
export const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  flex-direction: column;
  padding: 0 10px;
  color: ${({ theme }) => theme.text};
  .card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    height: 100%;
    width: 100%;
    margin: 20px;
    @media ${Device.tablet} {
      width: 400px;
    }
  }
`;