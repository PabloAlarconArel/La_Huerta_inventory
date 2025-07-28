import styled, {ThemeProvider} from "styled-components";
import {useState} from "react";
import {GlobalStyles,Sidebar,useThemeStore,MyRoutes} from "./index";
import {Device} from "./styles/breakpoints";
function App() {
  const{sidebarOpen, setsidebarOpen} = useState(false);
  const {themeStyle} =useThemeStore();
  return (
    <>
    <ThemeProvider theme={{themeStyle}}>
      <GlobalStyles/>
        <Container>
          <section className="contentSidebar">      
          <Sidebar state={sidebarOpen} setState={()=> setsidebarOpen(!sidebarOpen)}/>
          </section>
          <section className="contentMenuambur">menu ambur</section>
          <section className="contentRouters"><MyRoutes/></section>
        </Container>  
    </ThemeProvider>
    </>
  );
}
export const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  background-color: black; 
  .contentSidebar{
    display:none;
    background-color: rgba(165, 35, 165, 0.5);
  }
  .contentMenuambur{
    position:absolute;
    background-color:rgba(40, 145, 75, 0.5)
  }
  .contentRouters{
    background-color:rgba(126, 83, 48, 0.5);
    grid-column:1;
    width:100%;


  }

  @media ${Device.tablet}{
    grid-template-columns: 88px 1fr;
    .contentSidebar{
      display:initial;
    }
    .contentMenuambur{
      display:none;
    }
    .contentRouters{
      grid-column:2;
    }
  }
`;
export default App
