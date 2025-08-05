import { useQuery } from "@tanstack/react-query";
import { useEffect , useState } from "react";
import {
  CategoriasTemplate,
  Spinner1,
  useCategoriasStore,
  useEmpresaStore,
} from "../index";

export function Categorias() {
  const { mostrarCategorias, buscarCategorias, buscador } =useCategoriasStore();
  const { dataempresa } = useEmpresaStore();
  const[product,setProduct]=useState([])

  useEffect(()=>{
    const getProducts=()=>{
        fetch('MONGO_URI')
        .then(res=>res.json())
        .then(setProduct(res))

    }
  })




  if (isLoading) {
    return <Spinner1 />;
  }
  if (error) {
    return <span>error...</span>;
  }
  return <CategoriasTemplate />;