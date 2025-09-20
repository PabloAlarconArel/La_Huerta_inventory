import styled from "styled-components";
import { v } from "../../../styles/variables";
import Swal from "sweetalert2";
import {
  InputText2,
  Btnsave,
  useProductStore,
} from "../../../index";
import { useForm } from "react-hook-form";
import { useMutation,useQueryClient } from "@tanstack/react-query";
import { Openfoodfacts } from "../../../api/Openfoodfacts";


export function RegistProduct({
  onClose,
  dataSelect,
  accion,
}) {
  const queryClient = useQueryClient();
  const { addProduct, updateProduct } = useProductStore();
  const {register,formState: { errors },setValue,handleSubmit} = useForm({
    defaultValues: {
      barcode: dataSelect?.barcode || "",
      productName: dataSelect?.productName || "",
      categories: dataSelect?.categories || "",
      company: dataSelect?.company || "",
      priceUnity: dataSelect?.priceUnity || "",
    }

  });

  const { isPending, mutate: doInsert } = useMutation({
    mutationFn: insertar,
    mutationKey: "insert product",
    onError: (err) => console.log("El error", err.message),
    onSuccess: () => {
      queryClient.invalidateQueries(["products"]);
      cerrarFormulario()}
  });
  const handlesub = (data) => {
    doInsert(data);
  };
  const cerrarFormulario = () => {
    onClose();
  };

  const buscarProducto = async(barcode) =>{
    const data = await Openfoodfacts({ Barcode: barcode, estado: accion });
    if(data){
      setValue("productName",data.productName);
      setValue("categories",data.categories.split(",")[0]);
      setValue("company",data.company);
    }
  }

  async function insertar(data) {
    if (accion === "Editar") {
      const p ={
        _id: dataSelect._id,
        barcode: data.barcode,
        productName: data.productName,
        categories: data.categories,
        company: data.company,
        priceUnity: data.priceUnity,
      } 
      Swal.fire({
      title: "Quieres registrar los cambios?",
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Registrar",
      denyButtonText: `No guardar`,
      cancelButtonText:"Cancelar"
    }).then(async(result) => {
      if (result.isConfirmed){ 
        await updateProduct(p);
        Swal.fire("Producto Registrado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Los cambios no fueron registrados", "", "info");
      }
    });     
    } else {
      await addProduct(data);
      Swal.fire({
        title: "Producto Creado!",
        icon: "success",
        draggable: true
      });
    }
  }
  return (
    <Container>
      {isPending ? (
        <span>...Wait</span>
      ) : (
        <div className="sub-contenedor">
          <div className="headers">
            <section className="headers-title">
              <h1>
                {accion == "Editar"? "Editar Producto": "Registrar nuevo Producto"}
              </h1>
            </section>

            <section>
              <span onClick={onClose}><v.iconoX/></span>
            </section>
          </div>

          <form className="formulario" onSubmit={handleSubmit(handlesub)}>
            <section className="form-subcontainer">
              <article className="form-grid">
                
                <label htmlFor="barcode">Código de barras :</label>
                <InputText2 >
                  <input                     
                      
                      {...register("barcode", { required: true })}
                      onBlur={(e) => buscarProducto(e.target.value)}
                  />
                      {errors.barcode && <span>Campo requerido</span>}
                </InputText2>


                <label htmlFor="productName"> Nombre del producto :</label>
                <InputText2>
                  <input
                      
                      {...register("productName", { required: true })}
                  />
                      {errors.productName && <span>Campo requerido</span>}
                </InputText2>

                
                <label htmlFor="categories">Categoría del producto :</label>
                <InputText2>
                  <input
                      
                      {...register("categories", { required: true })}
                  />
                  {errors.categories && <span>Campo requerido</span>}
                </InputText2>


                <label htmlFor="company">Empresa :</label>
                <InputText2>
                  <input
                      
                      {...register("company", { required: true })}
                  />
                  {errors.company && <span>Campo requerido</span>}
                </InputText2>



                <label htmlFor="priceUnity">Precio unidad :</label>
                <InputText2>
                  <input
                      type="number"
                      placeholder="0"
                      {...register("priceUnity", { required: true })}
                  />
                  {errors.priceUnity && <span>Campo requerido</span>}
                </InputText2>
                
              </article>


              <Btnsave
                icono={<v.iconoguardar />}
                titulo="Guardar"
                bgcolor="#F9D70B"
              />
            </section>
          </form>
        </div>
      )}
    </Container>
  );
}
const Container = styled.div`
  transition: 0.5s;
  top: 0;
  left: 0;
  position: fixed;
  background-color: rgba(10, 9, 9, 0.5);
  display: flex;
  width: 100%;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  z-index: 1000;

    .sub-contenedor {
    position: relative;
    width: 500px;
    max-width: 85%;
    border-radius: 20px;
    background: ${({ theme }) => theme.bgtotal};
    box-shadow: -10px 15px 30px rgba(10, 9, 9, 0.4);
    padding: 13px 30px 20px 36px;
    z-index: 100;

    .headers {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;

    .headers-title {
      display: grid;
      grid-template-columns: 1fr;
      align-items: center;}

      h1 {
        font-size: 20px;
        font-weight: 500;
      }
      span {
        font-size: 20px;
        cursor: pointer;
      }
    }
    .form-grid{
      display:grid;
      grid-template-columns: 1fr;
      gap: 5px; 
      justify-items: start;
      max-width:500px;  
      padding-left: 90px;
    }
    .form-grid label{
      display:block;
      font-size: 14px;
      color: '#333';
    }
    .form-grid input{
      width:70%;
      padding:8px;
      border: 1px solid #ddd;
      border-radius: 8px;
      outline:none;
      transition:border 0.3s;
    }
    .form-grid input:focus{
      border-color: #1d4ed8;
    }
    .form-subcontainer button {
      display: block;
      margin: 10px auto 0; 
    }

  }
`;

