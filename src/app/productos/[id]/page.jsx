import CardProduct from "@/app/components/CardProduct";
import Comment from "@/app/components/Comment";
import Progress from "@/app/components/Progress";
import StarRating from "@/app/components/StarRating";
import { numberFormat } from "@/app/utils/utils";
import chevron from "@/public/chevron.svg";
import Image from "next/image";
import Link from "next/link";
import ButtonAddCart from "@/app/components/ButtonAddCart";
import { Toaster } from "sonner";
import ButtonBuyNow from "@/app/components/ButtonBuyNow";

const ProductDetail = async ({params})=> {
  const {id} = await params
  const products = await import('@/public/data/products.json');

  // Buscar el producto correspondiente
  const product = products.productos.find(p => p.id.toString() === id);

  const specs = Object.entries(product.especificaciones)
  const comments = product.reseñas.comentarios

  let relatedProducts = products.productos.filter(p => p.categoria == product.categoria && p.id != product.id)
  relatedProducts = relatedProducts.slice(0, 4)

  //convertimos el objeto "estrellas" en un array y modificamos el primer valor
  const stars = Object.entries(product.reseñas.distribucion)
  stars.forEach(s => {
    s[0] = s[0].charAt(0) //Ej: de "5estrellas" a solo "5"
  })
  
  const handleWord = (word)=> {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
  
  return (
    <main className="p-3 lg:p-6 max-w-[1200px] mx-auto">
      <section>
        <div className="text-[#616161] flex items-center h-[24px] text-xs lg:text-base">
          <Link href={"/productos"} className="font-medium">Productos</Link>
          <img src={chevron.src} alt="chevron icon" className="inline-block"/>
          <p className="text-black font-semibold">{product.nombre}</p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-6 lg:gap-12 mt-3 lg:mt-6">
          <div>
            <Image src={product.imagen} alt="image-product" priority width={700} height={400} className="max-w-[250px] max-h-auto lg:min-w-[400px] h-auto lg:max-h-[450px] object-cover"/>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-lg lg:text-3xl font-semibold">{product.nombre}</h2>
              <p className="bg-[#508f82] text-sm lg:text-base text-white font-medium px-2 rounded-lg">{handleWord(product.categoria)}</p>
            </div>
            <p className="text-sm lg:text-lg">{product.descripcion}</p>
      
            <div className="flex gap-2 items-center mt-1 lg:mt-3">
              <p className="text-sm lg:text-base">{product.reseñas.promedio}</p>
              <StarRating rating={product.reseñas.promedio}/>
            </div>
            <p className="mt-2 text-[#616161] text-sm lg:text-base"><b className="text-[#508f82]">{product.reseñas.totalReseñas}</b> personas dieron una reseña a este producto</p>
            
            <p className={`text-xl lg:text-3xl mt-2 font-medium ${product.precioFinal != undefined ? "hidden" : null}`}>{`$ ${numberFormat(product.precio)}`}</p>        
            <div className={product.precioFinal == undefined ? "hidden" : "mt-3 lg:mt-6"}>
              <p className="line-through text-sm lg:text-base font-medium text-[#616161] inline-block">{`$ ${numberFormat(product.precio)}`}</p>
              <p className="text-[#508f82] text-sm lg:text-lg pl-2 lg:pl-3 font-semibold inline-block">{`${product.descuento}% OFF`}</p>
              <p className="text-xl lg:text-3xl font-medium">{`$ ${numberFormat(product.precioFinal)}`}</p>
            </div>

            <div className="flex flex-col gap-1 lg:gap-2 mt-3 lg:mt-6">
              <ButtonBuyNow product={product} className="py-2 px-3"/>
              <ButtonAddCart product={product} className="py-2 px-3"/>
            </div>
          </div>
        </div>
      </section>

      <section>
        <article className="mt-6 lg:mt-12">
          <h3 className="text-lg lg:text-2xl font-medium">Especificaciones</h3>
            <div className="grid grid-cols-2 mt-2 lg:mt-6">
              {
                specs.map(s => {
                  return (
                    <div key={s[0]} className="py-1.5 text-sm lg:text-base">
                      <b>{handleWord(s[0])}</b>
                      <p className="border-b-1 border-[#c2c2c2] pb-3">{s[1]}</p>
                    </div>
                  )
                })
              }
            </div>
        </article>

        <article className="mt-6 lg:mt-12">
          <h3 className="text-lg lg:text-2xl font-medium">Reseñas de clientes</h3>
          <div className="flex flex-col lg:flex-row my-3 lg:my-6 gap-6 lg:gap-12">
            <div className="flex justify-center flex-col items-center lg:basis-[25%]">
              <p className="text-3xl lg:text-5xl font-semibold lg:pb-2">{product.reseñas.promedio}</p>
              <StarRating rating={product.reseñas.promedio} />
              <p className="lg:mt-2 text-[#616161] text-sm lg:text-base">Basado en <b className="text-[#508f82]">{product.reseñas.totalReseñas}</b> reseñas</p>
            </div>
            <div className="lg:basis-[75%]">
              {
                stars.map(s => {
                  return (
                    <Progress key={s[0]} stars={s[0]} numberReviews={s[1]} totalReviews={product.reseñas.totalReseñas}/>
                  )
                })
              }
            </div>
          </div>

          <div className="lg:pt-3">
            {comments.map(comment => {
              return (
                <Comment key={comment.usuario} comment={comment} />
              )
            })}
          </div>
        </article>

        <article className="w-full mt-6 lg:mt-12">
          <h3 className="text-lg lg:text-2xl font-medium">Productos relacionados</h3>
          <div className="flex flex-wrap justify-between gap-3 lg:gap-6 py-6">
            {relatedProducts.map(p => {
              return (
                <CardProduct key={p.id} product={p}/>
              )
            })}
          </div>
        </article>
      </section>
      <Toaster richColors
        toastOptions={{
          className: "p-2 max-w-[300px] lg:max-w-[400px]",
          titleClassName: "text-sm lg:text-base",
          descriptionClassName: "text-xs lg:text-base",
          actionClassName: "text-base"
        }}
      />
    </main>
  )
}

export default ProductDetail