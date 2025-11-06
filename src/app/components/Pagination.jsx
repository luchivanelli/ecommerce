"use client"

import { useSearchParams, useRouter } from "next/navigation";

const Pagination = ({ currentPage, totalPages, totalProducts }) => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handlePageChange = (page) => {
    const productsMain = document.getElementById("main-products")
    productsMain.scrollTo({
      top: 0,
      behavior: 'smooth'
    })

    const params = new URLSearchParams(searchParams);
    
    if (page === 1) {
      // Eliminar el parámetro page si es la primera página
      params.delete("page");
    } else {
      params.set("page", page.toString());
    }
    
    router.push(`/productos?${params.toString()}`);
  };

  // Generar array de páginas a mostrar
  const getPageNumbers = () => {
    const pages = []; 
    for (let i = 1; i <= totalPages; i++) {
      pages.push(i);
    }
    
    return pages;
  };

  if (totalPages <= 1) return null;

  return (
    <div className="flex flex-wrap lg:flex-nowrap justify-center items-center px-3 gap-2 mt-8 mb-4 text-xs lg:text-base">
      <div className="flex gap-2">
        {/* Botón Anterior */}
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
            currentPage === 1
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#508f82] text-white hover:bg-[#3d7066]"
          }`}
        >
          Anterior
        </button>

        {/* Números de página */}
        <div className="flex gap-2">
          {getPageNumbers().map((page, index) => (
            page === "..." ? (
              <span key={`ellipsis-${index}`} className="px-3 py-2 text-gray-600">
                ...
              </span>
            ) : (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
                  currentPage === page
                    ? "bg-[#508f82] text-white"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                {page}
              </button>
            )
          ))}
        </div>

        {/* Botón Siguiente */}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className={`px-4 py-2 rounded-lg font-medium transition-colors cursor-pointer ${
            currentPage === totalPages
              ? "bg-gray-300 text-gray-500 cursor-not-allowed"
              : "bg-[#508f82] text-white hover:bg-[#3d7066]"
          }`}
        >
          Siguiente
        </button>
      </div>

      {/* Información adicional */}
      <span className="ml-4 text-gray-600">
        Mostrando {((currentPage - 1) * 12) + 1}-{Math.min(currentPage * 12, totalProducts)} de {totalProducts}
      </span>
    </div>
  );
};

export default Pagination;