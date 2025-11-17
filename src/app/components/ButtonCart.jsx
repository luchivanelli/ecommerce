"use client"

import { useContext } from "react"
import { CartContext } from "../providers/CartProvider"
import { ShoppingCart } from 'lucide-react';
import { useRouter } from "next/navigation";

const ButtonCart = ({className, size})=> {
  const {itemCount} = useContext(CartContext)
  const router = useRouter()

  return (
    <button onClick={()=> router.push("/carrito")} className={`${className} relative gap-2 font-medium h-full py-1 px-3 rounded-xl cursor-pointer hover:scale-95 transition-all`}>
      <ShoppingCart color="#508f82" size={size} strokeWidth={3}/>
      <span className="absolute top-0 lg:top-2 right-0 text-[8px] lg:text-xs bg-[#508f82] text-white px-1 rounded-xl">{itemCount}</span>
    </button>
  )
}

export default ButtonCart