import logo from "@/public/logo.webp"
import search from "@/public/search.svg"
import Image from "next/image"
import Link from "next/link"
import { ShoppingCart } from 'lucide-react';
import { usePathname, useSearchParams } from "next/navigation";

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let currentFullPath = ""
  if (searchParams.getAll("categoria").includes("ofertas")) {
    currentFullPath = "ofertas"
  } else if (pathname == "/") {
    currentFullPath = "inicio"
  } else {
    currentFullPath = "productos"
  }
  console.log(currentFullPath)

  return (
    <header className="min-h-[70px] p-2 flex flex-col gap-2 items-center w-full px-3 lg:px-6 text-lg">
      {/* header desktop */}
      <div className="flex justify-between w-full">
        <div className="flex gap-16 items-center w-full">
          <div className="flex items-center p-0">
            <Image src={logo} alt="logo" className="object-contain h-[34px] w-[34px] lg:h-[60px] lg:w-[60px]"/>
            <p className="font-bold text-[#508f82] text-xl lg:text-[26px]">LapTech</p>
          </div>

          <div className="gap-5 hidden lg:flex">
            <Link href={"/"} className={`hover:text-[#508f82] font-medium ${currentFullPath == "inicio" ? "text-[#508f82] underline underline-offset-2" : null}`}>Inicio</Link>
            <Link href={"/productos"} className={`hover:text-[#508f82] font-medium ${currentFullPath == "productos" ? "text-[#508f82] underline underline-offset-2" : null}`}>Productos</Link>
            <Link href={"/productos?categoria=ofertas"} className={`hover:text-[#508f82] font-medium ${currentFullPath == "ofertas" ? "text-[#508f82] underline underline-offset-2" : null}`}>Ofertas</Link>
          </div>
        </div>
        <div className="flex justify-end items-center w-full gap-2">
          <div className="relative flex items-center">
            <input 
              type="text" 
              placeholder="Buscar..."
              className="border-1 border-[#9b9b9b] rounded-xl pl-6 lg:pl-7 h-[26px] lg:h-[36px] pr-1 outline-0 text-sm lg:text-base w-[180px] lg:w-[250px]"/>
            <img src={search.src} alt="search" className="absolute left-1 w-4 lg:w-5"/>
          </div>
          <button className="gap-2 font-medium h-full py-1 px-3 rounded-xl cursor-pointer hover:scale-95 transition-all hidden lg:inline-block">
            <ShoppingCart color="#508f82" size={24} strokeWidth={3}/>
          </button>
        </div>
      </div>

      {/* header mobile */}
      <div className="flex justify-between items-center w-full lg:hidden">
        <div className="gap-3 flex text-sm">
          <Link href={"/"} className={`hover:text-[#508f82] font-medium ${currentFullPath == "inicio" ? "text-[#508f82] underline underline-offset-2" : null}`}>Inicio</Link>
          <Link href={"/productos"} className={`hover:text-[#508f82] font-medium ${currentFullPath == "productos" ? "text-[#508f82] underline underline-offset-2" : null}`}>Productos</Link>
          <Link href={"/productos?categoria=ofertas"} className={`hover:text-[#508f82] font-medium ${currentFullPath == "ofertas" ? "text-[#508f82] underline underline-offset-2" : null}`}>Ofertas</Link>
        </div>
        <button className="gap-2 font-medium h-full py-1 px-3 rounded-xl cursor-pointer hover:scale-95 transition-all">
          <ShoppingCart color="#508f82" size={18} strokeWidth={3}/>
        </button>
      </div>

    </header>
  )
}

export default Header