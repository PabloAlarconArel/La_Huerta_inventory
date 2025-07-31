import styled from "styled-components";
import{InputText2,Title,Btnsave} from "../../index.js";
import{Device} from "../../styles/breakpoints";
export function LoginTemplates(){
    return(
        <Container>
            <span className="contentCard">
            <div className="card">
                <Title>Iniciar Sesión</Title>
                <form>
                    <InputText2>
                        <input  className="form__field" placeholder="email" type="text"/>
                    </InputText2>
                    <InputText2>
                        <input  className="form__field" placeholder="contraseña" type="password"/>
                    </InputText2>
                    <Btnsave titulo="INGRESAR" bgcolor="#1CB0F6" color="255,255,255" width="100%"/>
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