"use client"
import Image from "next/image"
import { numberFormat } from "../utils/utils"
import { useRouter } from "next/navigation";

const CardProduct = ({ product }) => {
  const router = useRouter()

  const handleRouter = (url)=> {
    router.push(baseUrl + url)
  }
  const category = product.categoria.charAt(0).toUpperCase() + product.categoria.slice(1)
  return (
    <div className="shadow-md rounded-xl shadow-[#0000005b] max-w-[480px] basis-[calc(50%-8px)] lg:basis-[calc(25%-24px)] lg:min-w-[212px]">
      <div onClick={()=> handleRouter(`/productos/${product.id}`)} className="relative cursor-pointer h-[200px] lg:h-[300px] w-full">
        <Image src={product.imagen} alt="image-card" fill className="object-contain"/>
        <p className="bg-[#508f82] text-white font-medium py-0.5 px-3 inline-block rounded-tr-xl absolute right-0 text-sm lg:text-base">{category}</p>
        <div className="absolute inset-0 bg-gradient-to-t from-[#0000002f] to-transparent"></div>
      </div>

      <div className="p-2 lg:py-4 lg:px-6">
        <h3 onClick={()=> handleRouter(`/productos/${product.id}`)} className="text-sm lg:text-lg hover:underline underline-offset-2 cursor-pointer">{product.nombre}</h3>
        <p className={`text-lg lg:text-2xl mt-1 lg:mt-2 font-medium ${product.precioFinal != undefined ? "hidden" : null}`}>{`$ ${numberFormat(product.precio)}`}</p>
        
        <div className={product.precioFinal == undefined ? "hidden" : null}>
          <p className="text-xs lg:text-sm line-through mt-1 lg:mt-2 font-medium text-[#616161] inline-block">{`$ ${numberFormat(product.precio)}`}</p>
          <p className="text-[#508f82] font-semibold text-xs inline-block pl-1 lg:text-base lg:pl-2">{`${product.descuento}% OFF`}</p>
          <p className="text-lg lg:text-2xl font-medium">{`$ ${numberFormat(product.precioFinal)}`}</p>
        </div>

        <p className="lg:mt-2 text-[#616161] text-xs lg:text-sm"><b className="text-[#508f82]">{product.reseñas.totalReseñas}</b> personas dieron una reseña a este producto</p>
        <div className="flex flex-col gap-1 lg:gap-2 mt-3">
          <button className="text-xs lg:text-sm lg-text-base bg-[#508f82] w-full border-1 text-white font-medium py-1 lg:py-1.5 px-1 lg:px-3 rounded-xl cursor-pointer hover:scale-95 transition-all">
            Comprar ahora
          </button>
          <button className="text-xs lg:text-sm lg-text-base border-1 border-[#508f82] w-full text-[#508f82] font-medium py-1 lg:py-1.5 px-1 lg:px-3 rounded-xl cursor-pointer hover:scale-95 transition-all">
            Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}

export default CardProduct