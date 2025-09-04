import styled from "styled-components";
import { v } from "../../../styles/variables";
import Swal from "sweetalert2";
import {
  InputText2,
  Btnsave,
  useInventoryStore,
} from "../../../index";
import { useForm } from "react-hook-form";
import { useMutation,useQueryClient } from "@tanstack/react-query";


export function RegistInventory({
  onClose,
  dataSelect,
  accion,
  dataCode
}) {

  const queryClient = useQueryClient();
  const { addInventory, updateInventory } = useInventoryStore();
  const {register,formState: { errors },handleSubmit,} = useForm({
    defaultValues: {
      product: dataCode?._id||"",
      quantityInitial: dataSelect?.quantityInitial||"",
      quantityAvailable: dataSelect?.quantityAvailable||"",
      price: dataSelect?.price || "",
      expDate:dataSelect?.expDate || "",
    }

  });

  const { isPending, mutate: doInsert } = useMutation({
    mutationFn: insertar,
    mutationKey: "insert Inventory",
    onError: (err) => console.log("El error", err.message),
    onSuccess: () => {
      queryClient.invalidateQueries(["inventory"]);
      cerrarFormulario()}
  });
  const handlesub = (data) => {
    doInsert(data);
  };
  const cerrarFormulario = () => {
    onClose();
  };

  async function insertar(data) {
    if (accion === "Editar") {
      const p ={
        _id:dataSelect._id,
        quantityInitial: data.quantityInitial,
        price: data.price,
        expDate: data.expDate,
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
        await updateInventory(p);
        Swal.fire("Inventario Registrado!", "", "success");
      } else if (result.isDenied) {
        Swal.fire("Los cambios no fueron registrados", "", "info");
      }
    });     
    } else {     
      const p ={
        product:dataCode[0]._id,
        quantityInitial: data.quantityInitial,
        quantityAvailable:data.quantityInitial,
        price: data.price,
        expDate: data.expDate,
      } 
      console.log(p)
      await addInventory(p);

      Swal.fire({
        title: "Inventario Creado!",
        icon: "success",
        draggable: true
      });
    }
  }
  return (
    <Container>
      {isPending ? (
        <span>...Espera</span>
      ) : (
        <div className="sub-contenedor">
          <div className="headers">
            <section className="headers-title">
              <h1>
                {accion == "Editar"? `Editar Inventario de ${dataSelect?.product?.productName} - ${dataSelect?.product?.company}`: `Registrar nuevo Inventario de ${dataCode?.[0].productName} - ${dataCode?.[0].company}`}
              </h1>
            </section>

            <section>
              <span onClick={onClose}><v.iconoX/></span>
            </section>
          </div>
      
          <form className="formulario" onSubmit={handleSubmit(handlesub)}>
            <section className="form-subcontainer">
              <article className="form-grid">
                <label htmlFor="quantityInitial">Cantidad del producto :</label>
                <InputText2>
                  <input
                      placeholder="Cantidad del producto"
                      {...register("quantityInitial", { required: true , valueAsNumber: true })}
                  />
                  {errors.quantityInitial && <span>Campo requerido</span>}
                </InputText2>


                <label htmlFor="price">Precio Pack :</label>
                <InputText2>
                  <input
                      placeholder="Precio Pack"
                      {...register("price", { required: true , valueAsNumber: true })}
                  />
                  {errors.price && <span>Campo requerido</span>}
                </InputText2>



                <label htmlFor="expDate">Fecha de Expiración :</label>
                <InputText2>
                  <input
                      type="date"
                      placeholder="Fecha de expiración"
                      {...register("expDate")}
                  />
                  {errors.expDate && <span>Campo requerido</span>}
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
    padding: 13px 36px 20px 36px;
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
      grid-template-columns: 1fr 1fr;
      gap:15px; 
      max-width:500px;  
    }
    .form-grid label{
      text-align:right;
      padding-bottom:15px;
    }
    .form-grid input{
    }
    .formulario {
      .form-subcontainer {
        gap: 20px;
        display: flex;
        flex-direction: column;
        .colorContainer {
          .colorPickerContent {
            padding-top: 15px;
            min-height: 50px;
          }
        }
      }
    }
  }
`;