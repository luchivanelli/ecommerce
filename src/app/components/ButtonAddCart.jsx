"use client"

import { useContext } from "react"
import { CartContext } from "../providers/CartProvider"
import { toast } from 'sonner'

const ButtonAddCart = ({product, className = "py-1 lg:py-1.5 px-1 lg:px-3"})=> {
  const {addToCart} = useContext(CartContext)

  const handleAddProduct = (product)=> {
    addToCart(product)
    toast.success("", {
      title: "¡Listo!",
      description: "Producto agregado correctamente",
      style: {color: "#508f82", backgroundColor: "#fff"}
    }
  )}

  return (
    <div>
      <button onClick={()=> handleAddProduct(product)} className={`${className} text-xs lg:text-sm lg-text-base border-1 border-[#508f82] w-full text-[#508f82] font-medium rounded-xl cursor-pointer hover:scale-95 transition-all`}>
        Agregar al carrito
      </button>
    </div>
  )
}

export default ButtonAddCart