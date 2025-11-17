import CardProduct from "../components/CardProduct";
import Filters from "../components/Filters";
import Pagination from "../components/Pagination";
import { Toaster } from 'sonner'

const ProductsPage = async ({ searchParams }) => {
  //esperar los searchParams
  const params = await searchParams;
  
  const products = await import('@/public/data/products.json');

  // Función para filtrar productos según los parámetros
  const filterProducts = (products, params) => {
    let filtered = [...products.productos];

    // Filtrar por marca
    const brands = params.marca ? (Array.isArray(params.marca) ? params.marca : [params.marca]) : [];
    if (brands.length > 0) {
      filtered = filtered.filter(product => 
        brands.some(brand => product.marca?.toLowerCase() === brand.toLowerCase())
      );
    }

    // Filtrar por categoría
    const categories = params.categoria ? (Array.isArray(params.categoria) ? params.categoria : [params.categoria]) : [];
    if (categories.length > 0) {
      filtered = filtered.filter(product => {
        return categories.some(cat => {
          if (cat.toLowerCase() === "ofertas") {
            return product.descuento > 0
          }
          return product.categoria?.toLowerCase() === cat.toLowerCase();
        });
      });
    }

    // Filtrar por precio
    if (params.precio) {
      switch(params.precio) {
        case "menor":
          filtered = filtered.filter(product => product.precio <= 1500000);
          break;
        case "medio":
          filtered = filtered.filter(product => product.precio > 1500000 && product.precio <= 3000000);
          break;
        case "mayor":
          filtered = filtered.filter(product => product.precio > 3000000);
          break;
      }
    }

    return filtered;
  };

  const filteredProducts = filterProducts(products, params);

  // PAGINACIÓN
  const PRODUCTS_PER_PAGE = 12; // productos por página
  const currentPage = parseInt(params.page) || 1; // página actual (default: 1)
  const totalPages = Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE);

  // Calcular índices para slice
  const startIndex = (currentPage - 1) * PRODUCTS_PER_PAGE;
  const endIndex = startIndex + PRODUCTS_PER_PAGE;
  
  // Productos de la página actual
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return (
    <div className="flex flex-col lg:flex-row lg:py-2 overflow-hidden">
      <Filters />
      <main id="main-products" className="basis-[80%] overflow-auto h-[calc(100vh-120px)]">
        <div className="flex my-4 lg:my-0 px-3 lg:p-0 flex-wrap gap-3 lg:gap-6">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map(product => <CardProduct key={product.nombre} product={product} />)
          ) : (
            <p className="lg:text-xl text-center w-full">No se encontraron productos</p>
          )}
        </div>
        
        {/* Componente de paginación */}
        {filteredProducts.length > 0 && (
          <Pagination 
            currentPage={currentPage} 
            totalPages={totalPages}
            totalProducts={filteredProducts.length}
          />
        )}
      </main>
      <Toaster richColors
        toastOptions={{
          className: "p-2 max-w-[300px] lg:max-w-[400px]",
          titleClassName: "text-sm lg:text-base",
          descriptionClassName: "text-xs lg:text-base",
          actionClassName: "text-base"
        }}
      />
    </div>
  );
};

export default ProductsPage