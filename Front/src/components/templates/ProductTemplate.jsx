
import {v} from "../../styles/variables";
import {useState,useEffect} from 'react';
import styled from "styled-components";
import {Btnsave,Buscador,Title,RegistProduct,useProductStore,ProductsTable2} from "../../index";

export function ProductTemplate(){
    const{filteredProducts,setSearch, fetchProducts}=useProductStore();
    const [openRegistro, SetopenRegistro] = useState(false);
    const [accion, setAccion] = useState("");
    const [dataSelect, setdataSelect] = useState([]);
    function nuevoRegistro() {
    SetopenRegistro(!openRegistro);
    setAccion("Nuevo");
    setdataSelect([]);
  } 

    useEffect(() => {
    fetchProducts(); 
  }, [fetchProducts]);

    return(
        <Container>
            {openRegistro && (
            <RegistProduct
              onClose={() => SetopenRegistro(!openRegistro)}
              dataSelect={dataSelect}
              accion={accion}
            />
            )}  
            <section >
                <div className="area1">
                <div className="title">
                <Title>Productos</Title>
                </div>
                <Btnsave
                    funcion={nuevoRegistro}
                    bgcolor={v.colorPrincipal}
                    color= {"blank"}
                    titulo="Nuevo"
                    icono={<v.iconoPlus />}
                />
                </div>
            </section>
            <section className="area2">
                <Buscador setSearch={setSearch}/>
            </section>

            <section className="main">
                <ProductsTable2 setdataSelect={setdataSelect} setAccion={setAccion} SetopenRegistro={SetopenRegistro} data={filteredProducts()} />
            </section>
        </Container>
    )
}
const Container = styled.div`
  height: calc(100vh - 30px);
  padding: 15px;
  display: grid;
  grid-template:
    "area1" 60px
    "area2" 80px
    "main" auto;
  .title {
    grid-area: title;
    display: flex;
    justify-content:start;
    align-items: center;
    padding: 0 15px 0 0;
  }
  .area1 {
    grid-area: area1;
    display: flex;
    gap: 15px;
    button {
    margin-left: auto;
   }
  }
  .area2 {
    grid-area: area2;
    display: flex;
    justify-content:end;
    align-items: end;
    padding:15px 9px 15px 0;
  }
  .main {
    grid-area: main;
    padding: 0px 0px 0px 40px;
  }
`;