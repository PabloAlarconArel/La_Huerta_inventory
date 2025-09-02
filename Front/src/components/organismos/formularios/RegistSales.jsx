import { 
    Btnsave,
    useSaleStore        
} from "../../../index";
import { useMutation } from "@tanstack/react-query";


export function RegistSales({
    list,
    setList}){

    const{addSale}=useSaleStore()
    const saleProducts=list.map(item =>{
        return{
            product:item._id,
            quantity:item.quantity,
            price:item.priceUnity
        }
    })

    const mutation = useMutation({
        mutationFn: (newSale)=> addSale(newSale),
        onError: (err) => console.log("El error", err.message),
        onSuccess: (data) => {
            console.log("Venta registrada correctamente:", data);
            setList([])}
    });



    const registIn=()=>{
        if(!saleProducts.length){
            return
        }
        mutation.mutate({products:saleProducts});  
        console.log(saleProducts) 
}



    return(
        <div className="buttomSave">
        <Btnsave
            funcion={registIn}
            bgcolor={'#f39c12'}
            color= {"blank"}
            titulo="Pagar"
        />
        </div>

    )
}