import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useState,useEffect} from "react";
import { SalesTable, useProductStore,RegistSales} from "../../index.js";
import beep from "/beep-07a.wav";
import Swal from "sweetalert2";


export function SalesTemplates() {
    const{searchProduct}=useProductStore();
    const[code,setCode]=useState("")
    const[list, setList]=useState([])
    const [inputCode, setInputCode] = useState("");
  

    const {data,isSuccess,isError} = useQuery({
        queryKey: ["products", code],
        queryFn: () => searchProduct(code),
        enabled: !!code,
        refetchOnWindowFocus: false,
    });

    const beepSound = new Audio(beep);

    const playBeep = () => {
    beepSound.play();
    };

    useEffect(() => {
   
        if (isSuccess) {
            if(!data?.[0]){
                Swal.fire({
                    icon: "error",
                    title: "Oops...",
                    text: "Producto no Ingresado!",
                    footer:"Ojo : Debes ingresarlo en Productos primero"
                    });
                return;
            }
            const info = data.map(item => ({ ...item, quantity: item?.quantity ?? 1 }));    
            //console.log("info dentro",info);                
            //console.log("after",list);
            setList((prevList) =>{
                //console.log("prevList",prevList);
                //console.log('id',info[0]._id);
                const exist = prevList.find(item => item?._id === info[0]?._id );
                //console.log("exist",exist);
                if (!exist) {
                    //console.log("no exist",exist);
                    return [...prevList, ...info]}
                else {
                    return prevList.map(item =>
                    item._id === info[0]._id
                        ? { ...item, quantity: item.quantity + 1}
                        : item )
                }
            }
            );
            playBeep();      
            setCode("");}
            if(isError){
                console.log('error')
            }
        

       /* const HandleKeyDown = (e) => {

            if (/^[0-9]$/.test(e.key)){    
                setCode(prevCode => prevCode + e.key);  
                return;
            } 
            if (e.key === "Enter") {
                if (!code){
                    return alert("⚠️ No hay código ingresado");
            return;               
            }
            alert("❌ No es un carácter válido para el código de barras: " + e.key);
        }; 
        window.addEventListener("keydown", HandleKeyDown);
        return () => window.removeEventListener("keydown", HandleKeyDown); */

    }, [isSuccess,data,list]);


    const total = list.reduce((sum, p) => sum + p.quantity * p.priceUnity, 0).toLocaleString('es-CL');

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d+$/.test(inputCode)) {
        return alert("❌ Código inválido: " + inputCode);
    }
    setCode(inputCode); 
    setInputCode(""); 
    console.log("lista",list)
    }
    
    return(
        <>
        <Container>
        <section className="content">
        <section className="area1">
        <div>
        <SalesTable data={list} setList = {setList} />
        </div>
        </section>


        <section className="area2">
        <div className="group2" >
            <form onSubmit={handleSubmit} className="mb-3">
            <input
                type="text"
                placeholder="Ingrese código manualmente"
                value={inputCode}
                onChange={(e) => setInputCode(e.target.value)}
            />
        <button type="submit">Ingresar</button>
        </form>
        <div className="groupTotal">
            <div className="contentTotal">      
                <h2 className="text-xl font-bold text-right">Total: ${total}</h2>
            </div> 
        </div>
        <div className="groupRegist">
            <div className="registrar">
                <RegistSales list={list} setList={setList} />
            </div>
        </div>
        </div>
        </section>
        </section>
        </Container>
        </>

    )
}

const Container = styled.div`
    height: calc(100vh - 30px);
    padding: 70px;

    .content {
        display: grid;
        grid-template-columns: repeat(6, 1fr);
        grid-template-rows: repeat(1, 1fr);
        gap: 17px;
    }

    .area1{
        grid-column: span 5 / span 5;
        grid-row: span 3 / span 3;
    }

    .area2{
        grid-row: span 5 / span 5;
        grid-column-start: 6;
    }
    .group2{
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        grid-template-rows: repeat(4, 1fr);
        gap: 8px;

    }

    .groupRegist{
        grid-row: span 1 / span 1;
        grid-row-start: 4;
        button{
            padding: 18px 43px;
            font-size: 20px;
            text-align: center;
            background-color: #f39c12;
            color: white;
            border: 2px solid rgba(50, 50, 50, 0.2);
            border-bottom: 5px solid rgba(50, 50, 50, 0.2);
            border-radius: 12px;
            cursor: pointer;

        }

    }

    .groupTotal{
        grid-row: span 1 / span 1;
        grid-row-start: 3;
        }

    .contentTotal {
        bottom: 30px;
        width:305px;
        margin-left:110px;
        background-color: #0b7ff3ff;
        color: white;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .registrar{
        width:305px;
        margin: 2px 10px 10px 110px;


    }

    .content2{
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 20px;
    }

    form {
    display: flex;
    gap: 10px;
    margin: 40px 0px 50px 20px;
    }

    form input {
    flex: 1;
    padding: 10px;
    border: 1px solid #bbb;
    border-radius: 6px;
    font-size: 16px;
    }

    form button {
    padding: 10px 14px;
    background: #1976d2;
    color: white;
    border: none;
    border-radius: 6px;
    cursor: pointer;
    }


`
