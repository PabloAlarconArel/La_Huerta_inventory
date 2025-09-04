import {v} from "../../styles/variables";
import {useState,useEffect} from 'react';
import styled from "styled-components";
import {Btnsave,Buscador,Title,RegistInventory,useInventoryStore,InventoryTable,InsertBarcode} from "../../index";

export function InventoryTemplate(){
    const{filteredInventories,setSearch,fetchInventory}=useInventoryStore();
    const [openRegistro, SetopenRegistro] = useState(false);
    const [openBarcode, setopenBarcode] = useState(false);
    const [accion, setAccion] = useState("");
    const [dataSelect, setdataSelect] = useState([]);
    const [dataCode, setdataCode] = useState([]);
    function nuevoRegistro() {
    setAccion("Nuevo");
    setdataSelect([]);
    setopenBarcode(true);
  } 

    const handleBarcodeConfirm = (producto) => {
    setdataCode(producto);
    setopenBarcode(false);
    SetopenRegistro(true); 
  };

    useEffect(() => {
    fetchInventory();

  }, [fetchInventory]);

    return(
        <Container>
            {openBarcode && (
            <InsertBarcode
              barclose={() => setopenBarcode(false)}
              setdatacode={handleBarcodeConfirm}
              />
            )}
            {openRegistro && (
            <RegistInventory
              onClose={() => SetopenRegistro(!openRegistro)}
              dataSelect={dataSelect}
              accion={accion}
              dataCode={dataCode}
            />
            )}  
            <section >
                <div className="area1">
                <div className="title">
                <Title>Inventario</Title>
                </div>
                <Btnsave
                    funcion={nuevoRegistro}
                    bgcolor={v.colorPrincipal}
                    titulo="Nuevo"
                    color= {"blank"}
                    icono={<v.iconoPlus/>}
                />
                </div>
            </section>
            <section className="area2">
                <Buscador setSearch={setSearch}/>
            </section>

            <section className="main">
                <InventoryTable setdataSelect={setdataSelect} setAccion={setAccion} SetopenRegistro={SetopenRegistro} data={filteredInventories()} />
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
    justify-content: end;
    align-items: left;
    padding:15px 15px 15px 0;
  }
  .main {
    grid-area: main;
    padding: 0px 15px 15px 40px;
  }
`;