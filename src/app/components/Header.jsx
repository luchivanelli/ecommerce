import logo from "@/public/logo.webp"
import Image from "next/image"
import Link from "next/link"
import { usePathname, useSearchParams } from "next/navigation";
import Searcher from "./Searcher";
import ButtonCart from "./ButtonCart";

const Header = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  let currentFullPath = ""
  if (searchParams.getAll("categoria").includes("ofertas")) {
    currentFullPath = "ofertas"
  } else if (pathname == "/") {
    currentFullPath = "inicio"
  } else if (pathname == "/productos") {
    currentFullPath = "productos"
  }

  return (
    <header className="min-h-[70px] -mt-[84px] lg:-mt-[70px] fixed z-50 bg-white p-2 flex flex-col gap-2 items-center w-full px-3 lg:px-6 text-lg">
      {/* header desktop */}
      <div className="flex justify-between w-full">
        <div className="flex gap-16 items-center w-full">
          <a href="/" className="flex items-center p-0">
            <Image src={logo} alt="logo" className="object-contain h-[34px] w-[34px] lg:h-[60px] lg:w-[60px]"/>
            <p className="font-bold text-[#508f82] text-xl lg:text-[26px]">LapTech</p>
          </a>

          <div className="gap-5 hidden lg:flex">
            <Link href={"/"} className={`hover:text-[#508f82] font-medium ${currentFullPath == "inicio" ? "text-[#508f82] underline underline-offset-2" : null}`}>Inicio</Link>
            <Link href={"/productos"} className={`hover:text-[#508f82] font-medium ${currentFullPath == "productos" ? "text-[#508f82] underline underline-offset-2" : null}`}>Productos</Link>
            <Link href={"/productos?categoria=ofertas"} className={`hover:text-[#508f82] font-medium ${currentFullPath == "ofertas" ? "text-[#508f82] underline underline-offset-2" : null}`}>Ofertas</Link>
          </div>
        </div>
        <div className="flex justify-end items-center w-full gap-2">
          <Searcher />
          <ButtonCart className={"hidden lg:inline-block"} size={24}/>
        </div>
      </div>

      {/* header mobile */}
      <div className="flex justify-between items-center w-full lg:hidden">
        <div className="gap-3 flex text-sm">
          <Link href={"/"} className={`hover:text-[#508f82] font-medium ${currentFullPath == "inicio" ? "text-[#508f82] underline underline-offset-2" : null}`}>Inicio</Link>
          <Link href={"/productos"} className={`hover:text-[#508f82] font-medium ${currentFullPath == "productos" ? "text-[#508f82] underline underline-offset-2" : null}`}>Productos</Link>
          <Link href={"/productos?categoria=ofertas"} className={`hover:text-[#508f82] font-medium ${currentFullPath == "ofertas" ? "text-[#508f82] underline underline-offset-2" : null}`}>Ofertas</Link>
        </div>
        <ButtonCart className={"lg:hidden inline-block"} size={18}/>
      </div>

    </header>
  )
}

export default Header