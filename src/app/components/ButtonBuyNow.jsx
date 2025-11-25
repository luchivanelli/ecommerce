"use client"

import { useRouter } from "next/navigation"
import { useContext } from "react"
import { CartContext } from "../providers/CartProvider"

const ButtonBuyNow = ({product, className = "py-1 lg:py-1.5 px-1 lg:px-3"})=> {
  const router = useRouter()
  const {setBuyNowProduct} = useContext(CartContext)

  const handleButton = ()=> {
    product = {...product, quantity: 1}
    setBuyNowProduct(product)
    router.push("/checkout")
  }

  return (
    <div>
      <button onClick={handleButton} className={`${className} text-xs lg:text-sm lg-text-base bg-[#508f82] w-full border-1 text-white font-medium rounded-xl cursor-pointer hover:scale-95 transition-all`}>
        Comprar ahora
      </button>
    </div>
  )
}

export default ButtonBuyNow