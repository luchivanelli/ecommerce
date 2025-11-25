"use client"

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Info } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import { CartContext } from '../providers/CartProvider';
import { numberFormat } from '../utils/utils';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';

// Define el esquema de validación
const checkoutSchema = z.object({
  fullname: z.string().min(3, 'El nombre debe tener al menos 3 caracteres'),
  dni: z.string()
    .min(7, 'DNI inválido')
    .max(8, 'DNI inválido')
    .regex(/^\d+$/, 'Solo números'),
  address: z.string().min(5, 'La dirección debe tener al menos 5 caracteres'),
  city: z.string().min(3, 'La ciudad debe tener al menos 3 caracteres'),
  postalCode: z.string().min(2, 'El código postal debe tener al menos 2 caracteres'),
  country: z.string().min(4, 'El país debe tener al menos 4 caracteres'),
  paymentMethod: z.enum(['credit-debit-card', 'paypal', 'bank-transfer']),
  cardName: z.string().optional().or(z.literal('')),
  cardNumber: z.string().optional().or(z.literal('')),
  expiryDate: z.string().optional().or(z.literal('')),
  cvv: z.string().optional().or(z.literal('')),
}).superRefine((data, ctx) => {
  // Solo validar campos de tarjeta si el método es tarjeta
  if (data.paymentMethod === 'credit-debit-card') {
    if (!data.cardName || data.cardName.length < 3) {
      ctx.addIssue({
        code: "custom",
        message: 'El nombre del titular debe tener al menos 3 caracteres',
        path: ['cardName'],
      });
    }
    
    if (!data.cardNumber || data.cardNumber.length !== 16) {
      ctx.addIssue({
        code: "custom",
        message: 'El número de tarjeta debe tener 16 dígitos',
        path: ['cardNumber'],
      });
    }
    
    if (!data.expiryDate || !/^(0[1-9]|1[0-2])\/20\d{2}$/.test(data.expiryDate)) {
      ctx.addIssue({
        code: "custom",
        message: 'Formato inválido. Usa MM/AAAA',
        path: ['expiryDate'],
      });
    }
    
    if (!data.cvv || data.cvv.length !== 3) {
      ctx.addIssue({
        code: "custom",
        message: 'El CVV debe tener 3 dígitos',
        path: ['cvv'],
      });
    }
  }
});

const CheckoutPage = ()=> {
  const {clearCart, cart, buyNowProduct, setBuyNowProduct} = useContext(CartContext)
  const router = useRouter()

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: 'credit-debit-card'
    }
  });

  const paymentMethod = watch('paymentMethod');

  const productsToShow = buyNowProduct
  ? [buyNowProduct]     // si existe buyNowProduct = checkout rápido
  : cart;               // si no existe = checkout normal

  let subtotal
  if (!buyNowProduct) {
    subtotal = cart.reduce((acc, product) => {
    if (product.precioFinal) {
        return acc + (product.precioFinal * product.quantity)
      } else {
        return acc + (product.precio * product.quantity)
      }
    }, 0)
  } else {
    if (buyNowProduct.precioFinal) {
      subtotal = buyNowProduct.precioFinal * buyNowProduct.quantity
    } else {
      subtotal = buyNowProduct.precio * buyNowProduct.quantity
    }
  }

  const taxes = Math.round(subtotal * 0.01)

  const onSubmit = (data) => {
    if (data.cardNumber.slice(-1) == 0 && data.paymentMethod == "credit-debit-card") {
      router.push("/checkout/error")
    } else {
      router.push("/checkout/exito")

      if (!buyNowProduct) {
        clearCart()
      }

      setBuyNowProduct(null)
    }
  };

  return (
    <main className="p-3 lg:p-6 max-w-[1200px] mx-auto">
      <h2 className="text-2xl lg:text-3xl font-semibold mb-3">Checkout</h2>
      <p className='text-sm lg:text-base'>Este proceso de compra es solo una <b>simulación</b>.</p>
      <p className='text-sm lg:text-base'><b>No ingreses datos reales</b>, especialmente información sensible como tu dirección exacta, número de tarjeta o documentos personales.</p>
      <p className='text-sm lg:text-base'>Utilizá <b>datos ficticios</b> para probar el funcionamiento del sistema.</p>
      
      <h3 className="col-span-2 text-xl font-medium mt-6 pb-3 border-b-1 border-[#508f8281]">Detalle de compra</h3>
      <div className="lg:pt-3">
        {productsToShow.map(product => {
          return (
            <article key={product.id} className="shadow-md flex flex-row justify-between items-center my-3 border-1 border-[#508f8281] bg-[#508f821e] rounded-xl h-auto lg:h-[80px] relative">
              <section className="flex items-center gap-3 lg:gap-6 mx-2 lg:mx-3">
                <Image src={product.imagen} height={100} width={100} alt="Image" className="w-[50px] h-[50px] lg:w-[60px] lg:h-[60px] object-contain my-2 lg:my-3 rounded-xl border-1 border-[#508f8281] bg-white"/>
                <div>
                  <h3 className="font-semibold text-sm lg:text-lg leading-4">{product.nombre}</h3>
                  <p className='font-semibold text-xs lg:text-base'>x{product.quantity}</p>
                </div>
              </section>
              <section className="flex flex-col-reverse md:flex-row items-end md:items-center md:gap-4 lg:gap-6 mx-3">
                <p className="text-base lg:text-xl font-medium w-[110px] lg:w-[130px] text-end">{`$ ${numberFormat(product.precioFinal ? product.precioFinal * product.quantity : product.precio * product.quantity)}`}</p>
              </section>
            </article>
          )
        })}
      </div>
      <div className='flex items-center justify-end gap-2 lg:mx-3'>
        <p className='text-sm lg:text-lg font-medium'>Total de compra + impuestos + <b className='text-[#508f82]'>envío gratis</b></p>
        <ArrowRight />
        <p className='font-semibold text-base lg:text-xl whitespace-nowrap'>$ {numberFormat(subtotal + taxes)}</p>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="mb-6 gap-3 lg:gap-6 grid grid-cols-2 text-sm lg:text-base">
        <h3 className="col-span-2 text-xl font-medium mt-6 pb-3 border-b-1 border-[#508f8281]">Información de compra</h3>
        <div className="col-span-2">
          <label htmlFor="fullname" className="font-medium">Nombre completo <span className="text-[#508f82]">*</span></label>
          <input {...register('fullname')} type="text" id="fullname" placeholder="Ingresa tu nombre completo" className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md block w-full px-2 py-1.5"/>
          {errors.fullname && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.fullname.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="dni" className="font-medium">DNI <span className="text-[#508f82]">*</span></label>
          <input {...register('dni')} type="number" id="dni" placeholder="Ingresa tu DNI" className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md block w-full px-2 py-1.5"/>
          {errors.dni && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.dni.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="address" className="font-medium">Dirección <span className="text-[#508f82]">*</span></label>
          <input {...register('address')} type="text" id="address" placeholder="Ingresa tu dirección" className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md block w-full px-2 py-1.5"/>
          {errors.address && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.address.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="city" className="font-medium">Ciudad <span className="text-[#508f82]">*</span></label>
          <input {...register('city')} type="text" id="city" placeholder="Ingresa tu ciudad" className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md block w-full px-2 py-1.5"/>
          {errors.city && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.city.message}</p>
          )}
        </div>
        <div>
          <label htmlFor="postalCode" className="font-medium">Código postal <span className="text-[#508f82]">*</span></label>
          <input {...register('postalCode')} type="text" id="postalCode" placeholder="Ingresa tu código postal" className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md block w-full px-2 py-1.5"/>
          {errors.postalCode && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.postalCode.message}</p>
          )}
        </div>
        <div className="col-span-2">
          <label htmlFor="country" className="font-medium">País <span className="text-[#508f82]">*</span></label>
          <input {...register('country')} type='text' id="country" placeholder='Ingresa tu país' className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md block w-full px-2 py-1.5"></input>
          {errors.country && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.country.message}</p>
          )}
        </div>

        <h3 className="col-span-2 text-xl font-medium py-3 border-b-1 border-[#508f8281]">Método de pago</h3>
        <div className='col-span-2 flex items-center gap-2 rounded-md p-2 lg:p-3 shadow-md border-[#508f821e] border-1 bg-[#508f8281]'>
          <Info color='#508f82' className='min-w-[18px] lg:min-w-[20px]'/>
          <p className='text-xs lg:text-base'><b>Tip: </b>Las tarjetas que terminen en 0 simularán un error. Cualquier otro número o método de pago será exitoso.</p>
        </div>

        <div className="flex flex-col gap-3 col-span-2">
          <div className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md w-full px-2 py-1 lg:py-1.5 flex items-center">
            <input {...register('paymentMethod')} type="radio" value="credit-debit-card" id="credit-debit-card" className="m-3"/>
            <label htmlFor="credit-debit-card" className="cursor-pointer">Tarjeta de crédito / débito</label>
          </div>
          <div className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md w-full px-2 py-1 lg:py-1.5 flex items-center">
            <input {...register('paymentMethod')} type="radio" value="paypal" id="paypal" className="m-3"/>
            <label htmlFor="paypal" className="cursor-pointer">Paypal</label>
          </div>
          <div className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md w-full px-2 py-1 lg:py-1.5 flex items-center">
            <input {...register('paymentMethod')} type="radio" value="bank-transfer" id="bank-transfer" className="m-3"/>
            <label htmlFor="bank-transfer" className="cursor-pointer">Transferencia bancaria</label>
          </div>
        </div>

        <div className={`${paymentMethod != "credit-debit-card" ? "hidden" : "col-span-2"}`}>
          <label htmlFor="cardName" className="font-medium">Nombre completo del titular <span className="text-[#508f82]">*</span></label>
          <input {...register('cardName')} type="text" id="cardName" placeholder="Ingresa el nombre completo" className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md block w-full px-2 py-1.5"/>
          {errors.cardName && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.cardName.message}</p>
          )}
        </div>
        <div className={`${paymentMethod != "credit-debit-card" ? "hidden" : "col-span-2"}`}>
          <label htmlFor="cardNumber" className="font-medium">Número de tarjeta <span className="text-[#508f82]">*</span></label>
          <input {...register('cardNumber')} type="number" id="cardNumber" placeholder="Ingresa tu número de trajeta" className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md block w-full px-2 py-1.5"/>
          {errors.cardNumber && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.cardNumber.message}</p>
          )}
        </div>
        <div className={`${paymentMethod != "credit-debit-card" ? "hidden" : null}`}>
          <label htmlFor="expiryDate" className="font-medium">Fecha de vencimiento <span className="text-[#508f82]">*</span></label>
          <input {...register('expiryDate')} type="text" id="expiryDate" placeholder="MM/AAAA" className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md block w-full px-2 py-1.5"/>
          {errors.expiryDate && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.expiryDate.message}</p>
          )}
        </div>
        <div className={`${paymentMethod != "credit-debit-card" ? "hidden" : null}`}>
          <label htmlFor="cvv" className="font-medium">CVV <span className="text-[#508f82]">*</span></label>
          <input {...register('cvv')} type="number" id="cvv" placeholder="Ingresa CVV" className="shadow-md bg-[#508f821e] mt-1 border-1 border-[#508f8281] rounded-md block w-full px-2 py-1.5"/>
          {errors.cvv && (
            <p className="text-red-500 text-xs lg:text-sm mt-1">{errors.cvv.message}</p>
          )}
        </div>

        <button type="submit" className="col-span-2 py-2 lg:py-3 text-sm lg:text-base w-full rounded-md bg-[#508f82] text-white mt-1 lg:mt-3 cursor-pointer hover:scale-[99%] transition-all">Realizar pedido</button>
      </form>
    </main>
  )
}

export default CheckoutPage