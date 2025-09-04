import styled from "styled-components";
import {ScaleLoader} from "react-spinners"
export function Spinner1() {
  return (<Container>
<ScaleLoader color="#7f3ceb" size={100}/>
  </Container>);
}
const Container =styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height:100vh;
  `