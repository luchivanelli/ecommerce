"use client"

import Image from "next/image"
import { useRouter } from "next/navigation";

const CardCategory = ({image, title, description, url})=> {
  const router = useRouter();

  return (
    <div onClick={()=> router.push(url)} className="card-category cursor-pointer group">
      <div className="relative min-w-[300px] lg:w-full shadow-md rounded-xl shadow-[#0000005b] overflow-hidden transform transition-all duration-300 group-hover:scale-100 ">
        <Image 
          src={image} 
          width={1000} 
          height={200} 
          alt="image-card" 
          className="h-[200px] lg:h-[300px] lg:w-[600px] min-w-[300px] object-cover object-center rounded-xl transform transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <h3 className="lg:text-xl font-bold text-[#508f82] mt-2 lg:mt-4 transform transition-all duration-500 group-hover:translate-x-2 group-hover:text-[#3d7266]">{title}</h3>
      <p className="lg:text-xl transform transition-all duration-300 group-hover:translate-x-2 group-hover:opacity-80">{description}</p>
    </div>
  )
}

export default CardCategory