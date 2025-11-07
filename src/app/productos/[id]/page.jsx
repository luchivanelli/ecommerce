import Comment from "@/app/components/Comment";
import Progress from "@/app/components/Progress";
import StarRating from "@/app/components/StarRating";
import { numberFormat } from "@/app/utils/utils";
import chevron from "@/public/chevron.svg";
import Image from "next/image";
import Link from "next/link";

const ProductDetail = async ({params})=> {
  const {id} = await params

  const products = await import('@/public/data/products.json');

  // Buscar el producto correspondiente
  const product = products.productos.find(p => p.id.toString() === id);
  const specs = Object.entries(product.especificaciones)
  const comments = product.reseñas.comentarios

  //convertimos el objeto "estrellas" en un array y modificamos el primer valor
  const stars = Object.entries(product.reseñas.distribucion)
  stars.forEach(s => {
    s[0] = s[0].charAt(0) //Ej: de "5estrellas" a solo "5"
  })
  
  const handleWord = (word)=> {
    return word.charAt(0).toUpperCase() + word.slice(1)
  }
  
  return (
    <main className="p-6 max-w-[1200px] mx-auto">
      <section>
        <div className="text-[#616161] flex items-center h-[24px]">
          <Link href={"/productos"} className="font-medium">Productos</Link>
          <img src={chevron.src} alt="chevron icon" className="inline-block"/>
          <p className="text-black font-semibold">{product.nombre}</p>
        </div>

        <div className="flex items-center gap-12 mt-6">
          <div>
            <Image src={product.imagen} alt="image-product" priority width={700} height={400} className="min-w-[400px] h-auto max-h-[450px] object-cover"/>
          </div>
          <div>
            <div className="flex items-center gap-3">
              <h2 className="text-3xl font-semibold">{product.nombre}</h2>
              <p className="bg-[#508f82] text-white font-medium px-2 rounded-lg">{handleWord(product.categoria)}</p>
            </div>
            <p className="text-lg">{product.descripcion}</p>
      
            <div className="flex gap-2 items-center mt-3">
              <p className="font-medi[0.98]">{product.reseñas.promedio}</p>
              <StarRating rating={product.reseñas.promedio} />
            </div>
            <p className="mt-2 text-[#616161]"><b className="text-[#508f82]">{product.reseñas.totalReseñas}</b> personas dieron una reseña a este producto</p>
            
            <p className={`text-3xl mt-2 font-medium ${product.precioFinal != undefined ? "hidden" : null}`}>{`$ ${numberFormat(product.precio)}`}</p>        
            <div className={product.precioFinal == undefined ? "hidden" : "mt-6"}>
              <p className="line-through font-medium text-[#616161]">{`$ ${numberFormat(product.precio)}`}</p>
              <div className="flex items-center gap-2 flex-wrap-reverse">
                <p className="text-3xl font-medium">{`$ ${numberFormat(product.precioFinal)}`}</p>
                <p className="text-[#508f82] text-lg font-semibold">{`${product.descuento}% OFF`}</p>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-6">
              <button className="bg-[#508f82] w-full border-1 text-white font-medium py-2 px-3 rounded-xl cursor-pointer hover:scale-[0.98] transition-all">
                Comprar ahora
              </button>
              <button className="border-1 border-[#508f82] w-full text-[#508f82] font-medium py-2 px-3 rounded-xl cursor-pointer hover:scale-[0.98] transition-all">
                Agregar al carrito
              </button>
            </div>
          </div>
        </div>
      </section>

      <section>
        <article className="mt-12">
          <h3 className="text-2xl font-medium">Especificaciones</h3>
            <div className="grid grid-cols-2 mt-6">
              {
                specs.map(s => {
                  return (
                    <div key={s[0]} className="py-1.5">
                      <b>{handleWord(s[0])}</b>
                      <p className="border-b-1 border-[#c2c2c2] pb-3">{s[1]}</p>
                    </div>
                  )
                })
              }
            </div>
        </article>

        <article className="mt-12">
          <h3 className="text-2xl font-medium">Reseñas de clientes</h3>
          <div className="flex my-6 gap-12">
            <div className="flex justify-center flex-col items-center basis-[25%]">
              <p className="text-5xl font-semibold pb-2">{product.reseñas.promedio}</p>
              <StarRating rating={product.reseñas.promedio} />
              <p className="mt-2 text-[#616161]">Basado en <b className="text-[#508f82]">{product.reseñas.totalReseñas}</b> reseñas</p>
            </div>
            <div className="basis-[75%]">
              {
                stars.map(s => {
                  return (
                    <Progress key={s[0]} stars={s[0]} numberReviews={s[1]} totalReviews={product.reseñas.totalReseñas}/>
                  )
                })
              }
            </div>
          </div>

          <div className="pt-3">
            {comments.map(comment => {
              return (
                <Comment key={comment.usuario} comment={comment} />
              )
            })}
          </div>
        </article>
      </section>
    </main>
  )
}

export default ProductDetail