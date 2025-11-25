import bgLaptop from "@/public/bg-laptop.jpg"
import Image from "next/image";
import CardCategory from "./components/CardCategory";
import CardProduct from "./components/CardProduct";
import { categories } from "./utils/utils";
import Footer from "./components/Footer";
import Link from "next/link";
import { Toaster } from "sonner";

const Home = async () => {
  const products = await import('@/public/data/products.json');

  const featuredProducts = products.productos.filter(product => product.reseñas.totalReseñas > 120)

  return (
    <main className="px-3 lg:px-6">
      <section id="section-home-1" className="h-[50vh] relative shadow-md rounded-xl shadow-[#0000005b]">
        <div className="absolute rounded-xl inset-0 bg-gradient-to-t from-black/90 to-[#ffffff63]"></div>
        <Image src={bgLaptop} alt="bg-section" className="rounded-xl h-full object-cover object-[50%_70%]"/>
        <div className="absolute bottom-10 lg:bottom-[15%] left-6 right-6 lg:left-20 lg:right-20">
          <h1 className="text-3xl lg:text-6xl font-bold text-white mb-2">Ofertas exclusivas en laptops</h1>
          <p className="text-white font-medium text-lg lg:text-2xl">Descubre las mejores laptops a precios inigualables</p>
          <p className="text-white font-medium text-lg lg:text-2xl mb-7">¡Solo por tiempo limitado!</p>
          <Link href={"/productos?categoria=ofertas"} className="bg-[#508f82] text-white lg:text-xl font-medium py-2 px-4 rounded-xl hover:scale-95 transition-all">Ver ofertas</Link>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-center text-2xl lg:text-start lg:text-3xl font-bold text-[#508f82]">Categorías destacadas</h2>
        <div className="flex flex-col items-center lg:flex-row lg:justify-between lg:items-start gap-6 my-4">
          {categories.map(categories => {
            return (
              <CardCategory 
                key={categories.title} 
                image={categories.image} 
                title={categories.title} 
                description={categories.description}
                url={categories.url} />
            )
          })}
        </div>
      </section>

      <section className="mt-10 lg:mt-6">
        <h2 className="text-center text-2xl lg:text-start lg:text-3xl font-bold text-[#508f82]">Productos populares</h2>
        <div className="flex justify-center xl:justify-between my-4 flex-wrap gap-3 lg:gap-6">
          {featuredProducts.map(product => {
            return (
              <CardProduct key={product.nombre} product={product} />
            )
          })}
        </div>
      </section>
      <Toaster richColors
        toastOptions={{
          className: "p-2 max-w-[300px] lg:max-w-[400px]",
          titleClassName: "text-sm lg:text-base",
          descriptionClassName: "text-xs lg:text-base",
          actionClassName: "text-base"
        }}
      />
      <Footer />
    </main>
)};

export default Home;

