"use client"

import { useContext } from "react"
import { CartContext } from "../providers/CartProvider"
import Image from "next/image"
import { numberFormat } from "../utils/utils"
import { CirclePlus, CircleMinus, Trash2 } from 'lucide-react';
import { useRouter } from "next/navigation"

const CartPage = ()=> {
  const router = useRouter()
  const {cart, removeFromCart, updateQuantity} = useContext(CartContext)

  const subtotal = cart.reduce((acc, product) => {
    if (product.precioFinal) {
      return acc + (product.precioFinal * product.quantity)
    } else {
      return acc + (product.precio * product.quantity)
    }
  }, 0)

  const taxes = Math.round(subtotal * 0.01)

  return (
    <div className="mt-3 lg:mt-12 px-3 lg:px-6 flex flex-col lg:flex-row gap-1 lg:gap-8">
      <main className="basis-[70%]">
        <h2 className="text-2xl lg:text-3xl font-semibold">Tu carrito</h2>
        <p className={`${cart.length != 0 ? "hidden" : "text-xl font-medium"}`}>Tu carrito está vacío. <a href="/productos" className="cursor-pointer text-[#508f82]">¡Explorá nuestros productos haciendo click aquí!</a></p>
        <div className="lg:pt-3">
          {cart.map(product => {
            return (
              <article key={product.id} className="shadow-md flex flex-row justify-between items-center my-3 border-1 border-[#508f8281] bg-[#508f821e] rounded-xl h-auto lg:h-[120px] relative">
                <section className="flex items-center gap-3 lg:gap-6 mx-3">
                  <Image src={product.imagen} height={100} width={100} alt="Image" className="w-[60px] h-[60px] lg:w-[100px] lg:h-[100px] object-contain my-3 rounded-xl border-1 border-[#508f8281] bg-white"/>
                  <div>
                    <h3 className="font-semibold text-sm lg:text-lg leading-4">{product.nombre}</h3>
                    <p className={`${product.precioFinal ? "hidden" : "text-[#616161] whitespace-nowrap text-sm lg:text-lg font-medium"}`}>{`$ ${numberFormat(product.precio)}`}</p>
                    {product.precioFinal && (
                      <div className="flex flex-col md:flex-row md:gap-3 md:items-center">
                        <p className="text-[#616161] whitespace-nowrap text-sm lg:text-lg font-medium">{`$ ${numberFormat(product.precioFinal)}`}</p>
                        <div className="flex gap-3">
                          <p className="text-[#616161] whitespace-nowrap font-medium text-xs lg:text-sm line-through">{`$ ${numberFormat(product.precio)}`}</p>
                          <span className="text-xs lg:text-sm -ml-1.5 font-semibold text-[#508f82]">{`${product.descuento}%`}</span>
                        </div>
                      </div>
                    )}
                  </div>
                </section>
                <section className="flex flex-col-reverse md:flex-row items-end md:items-center md:gap-4 lg:gap-6 mx-3 lg:mx-6">
                  <div className="flex gap-2 md:gap-4 items-center">
                    <CircleMinus onClick={()=> updateQuantity(product.id, product.quantity - 1)} className="w-[16px] lg:w-[20px] cursor-pointer hover:scale-105" stroke="#508f82"/>
                    <p className="text-sm lg:text-base font-medium">{product.quantity}</p>
                    <CirclePlus onClick={()=> updateQuantity(product.id, product.quantity + 1)} className="w-[16px] lg:w-[20px] cursor-pointer hover:scale-105" stroke="#508f82"/>
                  </div>
                  <p className="text-base lg:text-xl font-medium w-[120px] lg:w-[130px] text-end">{`$ ${numberFormat(product.precioFinal ? product.precioFinal * product.quantity : product.precio * product.quantity)}`}</p>
                  <div onClick={()=> removeFromCart(product.id)} className="flex items-center gap-1">
                    <p className="text-xs lg:hidden">Eliminar</p>
                    <Trash2 className="w-[14px] md:w-[16px] lg:w-[20px] cursor-pointer hover:scale-105"/>
                  </div>
                </section>
              </article>
            )
          })}
        </div>
      </main>
      <aside className={`basis-[30%] py-3 ${cart.length == 0 ? "hidden" : null}`}>
        <section className="shadow-md border-1 border-[#508f8281] bg-[#508f821e] rounded-xl p-3 lg:p-6 space-y-1 lg:space-y-3">
          <h3 className="font-semibold text-xl lg:text-2xl">Resumen del pedido</h3>
          <div className="flex items-center justify-between gap-3 text-sm lg:text-base">
            <p className="text-[#616161] font-medium">Subtotal</p>
            <p>{`$ ${numberFormat(subtotal)}`}</p>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm lg:text-base">
            <p className="text-[#616161] font-medium">Envío</p>
            <p className="text-[#508f82] font-semibold">Gratis</p>
          </div>
          <div className="flex items-center justify-between gap-3 text-sm lg:text-base">
            <p className="text-[#616161] font-medium">Impuestos</p>
            <p>{`$ ${numberFormat(taxes)}`}</p>
          </div>
          <div className="flex items-center justify-between gap-3 pt-3 border-t-1 border-[#508f8281]">
            <p className="font-semibold text-lg lg:text-xl">Total</p>
            <p className="font-semibold text-lg lg:text-xl">{`$ ${numberFormat(taxes + subtotal)}`}</p>
          </div>
          <button onClick={()=> router.push("/checkout")} className="py-2 lg:py-3 text-sm lg:text-base w-full rounded-xl bg-[#508f82] text-white mt-1 lg:mt-3 cursor-pointer hover:scale-[99%] transition-all">Continuar con el pago</button>
        </section>
      </aside>
    </div>
  )
}

export default CartPage