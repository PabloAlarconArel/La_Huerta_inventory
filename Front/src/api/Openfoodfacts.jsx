export async function Openfoodfacts ({
    Barcode,
    estado
}){
if(estado === "Editar")return

if (!Barcode) return;

const url = `https://world.openfoodfacts.org/api/v0/product/${Barcode}.json`;

try {
    const response = await fetch(url);
    const result = await response.json();

    if (result.status === 1) {
    const product = result.product;

    return {
        productName: product.product_name || "",
        categories: product.categories || "",
        company: product.brands || "",
    }

    } else {
    return null;
    }
} catch (error) {
    console.error("Error en API:", error);
    return null;   
}
};

