import { v } from "../../../styles/variables";
import styled from "styled-components";
import { Btnsave } from "../../../index";
export const Paginate = ({ table }) => {


  return (
    <Container >
   
      <Btnsave disabled={!table.getCanPreviousPage()} funcion={() => table.setPageIndex(0)} bgcolor="#F3D20C" icono={<v.iconotodos />} />

      <Btnsave  disabled={!table.getCanPreviousPage()} funcion={() => table.previousPage()} bgcolor="#F3D20C" icono={<v.iconoflechaizquierda />} />


    
      <span>{table.getState().pagination.pageIndex + 1}</span>
      <p> de {table.getPageCount()} </p>

      <Btnsave  disabled={!table.getCanNextPage()} funcion={() => table.nextPage()} bgcolor="#F3D20C" icono={<v.iconoflechaderecha />} />
      
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 15px;

 
`;