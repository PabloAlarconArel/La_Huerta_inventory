import styled from "styled-components";
import{InputText2,Title,Btnsave,apiRequest} from "../../index.js";
import{Device} from "../../styles/breakpoints";
import {useForm} from "react-hook-form";
import {useNavigate} from "react-router-dom";


export function LoginTemplates(){

    const navigate = useNavigate();
    const {handleSubmit,register} = useForm()

    const handleLogin = handleSubmit(async (values)=>{
        try{
            const res = await apiRequest(values);
            console.log("Token recibido:", res.data.token);
            console.log(res.data.message);
            localStorage.setItem("token", res.data.token);
            navigate('/home');
        }catch(error){
            console.error(error);
            alert('Error en el login');
        }
    });

    return(
        <Container>
            <span className="contentCard">
            <div className="card">
                <Title>Iniciar Sesión</Title>
                <form onSubmit={handleLogin}>
                    <InputText2>
                        <input  className="form__field" placeholder="email" type="email" {...register("email",{required:true})}/>
                    </InputText2>
                    <InputText2>
                        <input  className="form__field" placeholder="contraseña" type="password" {...register("password",{required:true})} />
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