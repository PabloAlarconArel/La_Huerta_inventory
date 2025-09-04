import { useQuery } from "@tanstack/react-query";
import {
  ProductTemplate,
  Spinner1,
  fetchProducts
} from "../index";

export function Products() {

const { data, isLoading, error} = useQuery({
  queryKey: ["products"],
  queryFn: fetchProducts,
    })

if (isLoading){ return <Spinner1 />};

if (error) {return <div>Error al cargar los productos</div>};

return (
    <>
      <ProductTemplate />
    </>
)
}