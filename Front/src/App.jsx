import styled, {ThemeProvider} from "styled-components";
import {useState} from "react";
import {GlobalStyles,Sidebar,useThemeStore,MyRoutes,Login} from "./index";
import {Device} from "./styles/breakpoints";
import {useLocation} from "react-router-dom"; 
function App() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {themeStyle} =useThemeStore();
  const {pathname}= useLocation();
  return (
    <ThemeProvider theme={themeStyle}>
      <GlobalStyles/>
      { pathname !="/"?(
          <Container className={sidebarOpen ? "active" : ""}>
            <section className="contentSidebar">      
            <Sidebar state={sidebarOpen} setState={()=> setSidebarOpen(prev => !prev)}/>
            </section>
            <section className="contentRouters">            
            <MyRoutes/>
            </section>
          </Container>  
      ):(< Login/>)}
    </ThemeProvider>
  );
}
export const Container = styled.main`
  display: grid;
  grid-template-columns: 1fr;
  transition: 0.1s ease-in-out;
  color: ${({theme}) => theme.text};
  .contentSidebar{
    display:none;
    //background-color: rgba(165, 35, 165, 0.5);
  }
  .contentMenuambur{
    position:absolute;
    //background-color:rgba(40, 145, 75, 0.5)
  }
  .contentRouters{
    //background-color:rgba(126, 83, 48, 0.5);
    grid-column:1;
    width:100%;


  }

  @media ${Device.tablet}{
    grid-template-columns: 88px 1fr;
    &.active {
      grid-template-columns: 260px 1fr;
    }
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
