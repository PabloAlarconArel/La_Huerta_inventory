import styled from "styled-components";
import { useQuery } from "@tanstack/react-query";
import { useState,useEffect} from "react";
import { SalesTable, useProductStore } from "../../index.js";


export function SalesTemplates() {
    const{searchProduct}=useProductStore();
    const[code,setCode]=useState("")
    const[list, setList]=useState([])
    const [inputCode, setInputCode] = useState("");
  

    const {data,isSuccess} = useQuery({
        queryKey: ["products", code],
        queryFn: () => searchProduct(code),
        enabled: !!code,
        refetchOnWindowFocus: false,
    });

    const beepSound = new Audio("https://www.soundjay.com/buttons/sounds/beep-07.mp3");


    const playBeep = () => {
    const audio = new Audio(beepSound);
    audio.play();
    };

    useEffect(() => {
   
        if (isSuccess && data && data.length > 0) {
            const info = data.map(item => ({ ...item, quantity: item.quantity ?? 1 }));    
            //console.log("info dentro",info);                
            //console.log("after",list);
            setList((prevList) =>{
                //console.log("prevList",prevList);
                //console.log('id',info[0]._id);
                const exist = prevList.find(item => item._id === info[0]._id );
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

    





    const total = list.reduce((sum, p) => sum + p.quantity * p.priceUnity, 0);

    const handleSubmit = (e) => {
    e.preventDefault();

    if (!/^\d+$/.test(inputCode)) {
        return alert("❌ Código inválido: " + inputCode);
    }
    setCode(inputCode); 
    setInputCode(""); 
    }
    
    return(
        <>
        <Container>
        <form onSubmit={handleSubmit} className="mb-4">
        <input
            type="text"
            placeholder="Ingrese código"
            value={inputCode}
            onChange={(e) => setInputCode(e.target.value)}
        />
        <button type="submit">Enter</button>
        </form>
        <section className="content">
        <div className="area">
        <SalesTable data={list} setList = {setList} />
        </div>
        <div className="area">
            <div className="contentTotal">      
                <h2 className="text-xl font-bold text-right">Total: ${total}</h2>
            </div> 
        </div>
        </section>
        </Container>
        </>

    )
}

const Container = styled.div`
    height: calc(100vh - 30px);
    padding: 15px;
    display: grid;
    grid-template:
        "area1" 80px
        "area2" 80px;

    .content {
        display: flex;
    }
    .area {
        width:1200px;
        height: 100vh;
        margin: 80px;  
    }
    .contentTotal {
        bottom: 20px;
        right: 20px;
        margin-left:120px;
        background-color: #0b7ff3ff;
        color: white;
        padding: 10px;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

`
