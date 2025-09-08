import DataTable,{createTheme} from 'react-data-table-component';
import {
  ContentAccionesTabla,
  useInventoryStore,
  useThemeStore,
} from "../../../index";
import Swal from "sweetalert2";
import dayjs from "dayjs";

export function InventoryTable( 
    {
  data,
  SetopenRegistro,
  setdataSelect,
  setAccion}

) {
    const { theme } = useThemeStore();
    const { deleteInventory } = useInventoryStore();
    const paginationOptions = {
        rowsPerPageText: 'Filas por página',
        rangeSeparatorText: 'de',
        selectAllRowsItem: true,    
        selectAllRowsItemText: 'Todos',
    };

    const customStyles = {
        rows: {
            style: {
            fontSize: "14px",
            fontFamily: "Roboto, sans-serif",
            },
        },
        headCells: {
            style: {
            backgroundColor: "#1e40af",
            color: "white", 
            fontSize: "16px",
            fontWeight: "bold",
            },
        },
        };

    // Tema claro
    createTheme("customLight", {
    text: {
        primary: "#000",
        secondary: "#555",
    },
    background: {
        default: "#fff",
    },
    divider: {
        default: "#ddd",
    },
    }, "light");

    // Tema oscuro
    createTheme("customDark", {
    text: {
        primary: "#fff",
        secondary: "#bbb",
    },
    background: {
        default: "#2d2d2d",
    },
    divider: {
        default: "#444",
    },
    }, "dark");

    function eliminar(id) {
        Swal.fire({
            title: "¿Estás seguro(a)?",
            text: "Una vez eliminado, ¡no podrá recuperar este registro!",
            icon: "warning",
            showCancelButton: true,
            cancelButtonText: "Cancelar",
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Si, eliminar",
        }).then(async (result) => {
            if (result.isConfirmed) {
                await deleteInventory( id );
                Swal.fire({
                title: "Eliminado!",
                text: "Producto ha sido borrado.",
                icon: "success"
                });
            }
            });
        }
    function editar(data) {
        SetopenRegistro(true);
        setdataSelect(data);
        setAccion("Editar");
        }

    const columns = [
        {
            name:'Código',
            selector:row => row.product?.barcode || '',
        },
        {
            name: 'Producto',
            selector: row => row.product?.productName?.charAt(0).toUpperCase() + row.product?.productName?.slice(1) || '',
        },
        {
            name: 'Categoría',
            selector: row => row.product?.categories?.charAt(0).toUpperCase() + row.product?.categories?.slice(1) ||'',
        },
        {
            name: 'Empresa',
            selector: row => row.product?.company?.charAt(0).toUpperCase() + row.product?.company?.slice(1)||'',
        },
        {
            name: 'Cantidad',
            selector: row => row.quantityInitial||'',
        },
        {
            name: 'Precio Pack',
            selector: row => row.price.toLocaleString('es-CL',{
                style: 'currency',
                currency: 'CLP',
                minimumFractionDigits: 0
            }
            )||'',
        },
        {
            name: 'Fecha registrada ',
            selector: row => dayjs(row?.createdAt).format("DD/MM/YY HH:mm") ||'',
        },
        
        {
            name: 'Acciones',
            cell: row =>( 
                <ContentAccionesTabla
                        funcionEditar={() => editar(row)}
                        funcionEliminar={() => eliminar(row._id)}
                        />)
        },
    ];

    return (
        <DataTable
            columns={columns}
            data={data || []}
            pagination	
            paginationRowsPerPageOptions={[7, 14, 21, 28, 35]}	
            paginationPerPage={7}
            paginationComponentOptions={paginationOptions}
            noDataComponent={<div>No hay Productos registrados</div>}	
            theme={theme === "light" ? "customLight" : "customDark"}
            customStyles={customStyles}
            responsive
        />
    );
};