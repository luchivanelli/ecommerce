"use client"

import { useState } from "react"
import search from "@/public/search.svg"
import products from "@/public/data/products.json"
import { useRouter } from "next/navigation"

const Searcher = () => {
  //estado para el valor del input
  const [query, setQuery] = useState("")

  //estado para resultados de la busqueda
  const [results, setResults] = useState([])

  //estado para visualizacion del dropdown de busquedas
  const [showResults, setShowResults] = useState(false)

  const router = useRouter()

  const handleSearch = (value) => {
    //actualizamos valor en input
    setQuery(value)
    
    //si no hay nada escrito en el input, limpiamos array de resultados y ocultamos dropdown
    if (value.trim() === "") {
      setResults([])
      setShowResults(false)
      return
    }

    //filtramos productos
    const filtered = products.productos.filter(product => product.nombre.toLowerCase().includes(value.toLowerCase()))
    
    //actualizamos estado y mostramos productos
    setResults(filtered)
    setShowResults(true)
  }

  return (
    <div className="relative flex items-center">
      <input 
        type="text" 
        placeholder="Buscar..."
        value={query}
        onChange={(e) => handleSearch(e.target.value)}
        onFocus={() => query && setShowResults(true)}
        className="border-1 border-[#9b9b9b] rounded-xl pl-6 lg:pl-7 h-[26px] lg:h-[36px] pr-1 outline-0 text-sm lg:text-base w-[180px] lg:w-[250px]"
      />
      <img src={search.src} alt="search" className="absolute left-1 w-4 lg:w-5"/>
      
      {/* Dropdown con resultados */}
      {showResults && results.length > 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
          {results.map((product) => (
            <div 
              key={product.id} 
              className="p-2 hover:bg-gray-200 cursor-pointer text-xs lg:text-base"
              onClick={() => {
                router.push(`/productos/${product.id}`) // Navegar al producto
                setShowResults(false) // Ocultar dropdown
                setQuery("") // Limpiar buscador
              }}
            >
              {product.nombre}
            </div>
          ))}
        </div>
      )}

      {/* Dropdown sin resultados encontrados */}
      {showResults && results.length == 0 && (
        <div className="absolute top-full mt-1 w-full bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50">
          <div className="p-2 hover:bg-gray-100 text-xs lg:text-base">No se encontraron productos</div>
        </div>
      )}
    </div>
  )
}

export default Searcher