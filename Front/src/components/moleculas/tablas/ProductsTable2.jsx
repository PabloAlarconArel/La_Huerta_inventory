import DataTable,{createTheme} from 'react-data-table-component';
import {
  ContentAccionesTabla,
  useProductStore,
  useThemeStore,
} from "../../../index";
import Swal from "sweetalert2";

export function ProductsTable2( 
    {
  data,
  SetopenRegistro,
  setdataSelect,
  setAccion}

) {
    const { theme } = useThemeStore();
    const { deleteProduct } = useProductStore();
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
                await deleteProduct( id );
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
            name: 'Código de Barras',
            selector: row => row.barcode,
        },
        {
            name: 'Nombre del Producto',
            selector: row => row.productName.charAt(0).toUpperCase() + row.productName.slice(1),
        },
        {
            name: 'Categoría',
            selector: row => row.categories.charAt(0).toUpperCase() + row.categories.slice(1),
        },
        {
            name: 'Empresa',
            selector: row => row.company.charAt(0).toUpperCase() + row.company.slice(1),
        },
        {
            name: 'Precio Unitario',
            selector: row =>row.priceUnity.toLocaleString('es-CL',{
                style: 'currency',
                currency: 'CLP',
                minimumFractionDigits: 0
            }
        )
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
			data={data}
            pagination	
            paginationComponentOptions={paginationOptions}
            noDataComponent={<div>No hay Productos registrados</div>}	
            theme={theme === "light" ? "customLight" : "customDark"}
            customStyles={customStyles}
		/>
	);
};