import { useQuery } from "@tanstack/react-query"
import styled from "styled-components";
import { useProductStore } from "../../../index"
import {useEffect, useState} from "react";
import Swal from "sweetalert2";

export function InsertBarcode(
    {barclose,
     setdatacode,
    }
){
    
    const {searchProduct} = useProductStore();
    const [barcode , setBarcode]= useState("");

    const {data , refetch, isSuccess, isError} = useQuery({
    queryKey: ["Inventory",barcode],
    queryFn: async () =>searchProduct(barcode),
    enabled:false,
  })
   
    useEffect(() =>{
            if(isSuccess){
              const producto = data?.[0];
              if(producto){
                cerrar()
                Swal.fire({
                    title: "Este es el producto y empresa?",
                    text: `${data?.[0].productName} - ${data?.[0].company}`,
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#35d630ff",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sí!"
                }).then((result) => {
                    if (result.isConfirmed) {
                        setdatacode(data);
                    }
                  })
              }else {
              cerrar();
              Swal.fire({
              icon: "error",
              title: "Oops...",
              text: "Producto no Ingresado!",
              footer:"Ojo : Debes ingresarlo en Productos primero"
              });
              }
            }
            if (isError){
              cerrar()
              Swal.fire({
                  icon: "error",
                  title: "Oops...",
                  text: "Problemas con base de datos!",
              });

            }
},[isSuccess,data,setdatacode])


    const cerrar = () => {
      barclose();
    };

    const handleSubmit =(e) =>{     
      e.preventDefault();
      if(!barcode.trim()){
        return;
      }
      refetch();

    
    };

    return(
        <Container>     
        <FormBox onSubmit={handleSubmit}>
            <Input
                type="text"
                placeholder="Ingrese código Producto"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                autoFocus
            />
           <Button type="submit">Enter</Button>
        </FormBox>
        </Container>
    )
}

const Container = styled.div`
  position: fixed;       
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;        
  background: rgba(0,0,0,0.4); 
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;         
`;

const FormBox = styled.form`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 6px 20px rgba(0,0,0,0.15);
  display: flex;
  gap: 10px;
`;

const Input = styled.input`
  flex: 1;
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 8px;
`;

const Button = styled.button`
  background: #35d630;
  color: white;
  border: 2px solid rgba(50, 50, 50, 0.2);
  border-bottom: 5px solid rgba(50, 50, 50, 0.2);
  padding: 10px 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: 0.2s;
  transition-timing-function: linear;
  &:active {
    transform: translate(0, 0);
    border-bottom: 2px solid rgba(50, 50, 50, 0.5);}
`;

     

    

