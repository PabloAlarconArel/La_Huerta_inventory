import DataTable from "react-data-table-component";
import { AccionTabla, v} from "../../../index.js";

export function SalesTable({data,setList})
{


    const customStyles = {
        rows: {
            style: {
            fontSize: "12px",
            fontFamily: "Roboto, sans-serif",
            },
        },

        headCells: {
            style: {
            backgroundColor: "#000000a2",
            color: "white", 
            fontSize: "14px",
            fontWeight: "bold",
            },
        },
        };

    const handleDelete = (id)=> {
          setList(prevList => prevList.filter(item => item._id !== id));
    }

    const fillData =[...data];

    while (fillData.length < 10) {
        fillData.push({ id: `empty-${fillData.length}`,
                        barcode: '', 
                        productName: '', 
                        priceUnity: '',
                        });
    };
    const columns = [
        {
            name: " ",
            cell: row => {

                    if (!row.productName || !row.priceUnity || !row.quantity) {
                    return "";
                } 
                return(
                    <AccionTabla 
                        funcion={() =>handleDelete(row._id)}
                        fontSize="20px" 
                        color="#ff1e00ff" 
                        icono={<v.iconoEliminar/>}                         
                    />);                                        
            },
            grow:0.2,
            
        },
        {
            name:"Cantidad",
            selector: row => row.quantity || "",
            grow:0.5,

        },
        {
            name:"Código de Barras",
            selector: row => row.barcode || "",
            grow:3,
        },
        {
            name:"Nombre Producto",
            selector: row => row.productName?.charAt(0).toUpperCase() + row.productName?.slice(1)|| "",
            grow:3,

        },
        
        {
            name:"Precio Unitario",
            selector: row => row.priceUnity?.toLocaleString('es-CL', {
                style: 'currency',
                currency: 'CLP',
                minimumFractionDigits: 0
            })|| "",
            grow:3,
            
        },
        {
            name:"Subtotal",
            selector: row =>{
                if (!row.productName || !row.priceUnity || !row.quantity) {
                    return "";
                } 
                 const quantity = Number(row.quantity);
                 const price = Number(row.priceUnity);
                 const subtotal = quantity * price;
                
                return subtotal.toLocaleString('es-CL', {
                style: 'currency',
                currency: 'CLP',
                minimumFractionDigits: 0
            }) },
            grow:1,
        
        }
        
        
    ]

    return(
        <DataTable
            columns={columns}
            data={fillData}
            noDataComponent={null}
            noHeader
            dense
            striped
            customStyles={customStyles}
        />
    );
}