"use client"

import { useSearchParams, useRouter } from "next/navigation";
import InputCheckbox from "../components/InputCheckbox";
import { inputsCheckboxBrands, inputsCheckboxCategories } from "../utils/utils";

const Filters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleFilter = (type, value, e)=> {
    const params = new URLSearchParams(searchParams);
    params.delete("page")

    if (type === "marca" || type === "categoria") {
      if (e.target.checked) {
        params.append(type, value);
      } else {
        //obtenemos todos los parametros del mismo tipo
        const values = params.getAll(type);

        //filtramos el que queremos eliminar y creamos un nuevo array sin ese valor
        const newValues = values.filter(v => v !== value);

        //eliminamos todos los parametros del mismo tipo
        params.delete(type);

        //agregamos los valores del nuevo array
        newValues.forEach(v => params.append(type, v));
      }
    } else if (type === "precio") {
      if (value === "all") {
        params.delete(type); 
      } else {
        params.set(type, value);
      }
    }

    //modificamos la url con los nuevos parametros
    router.push(`/productos?${params.toString()}`);
  }

  const selectedPrice = searchParams.get("precio");

  return (
    <aside className="basis-[20%] min-w-[320px] px-3 lg:px-6">
      <div className="shadow-md rounded-xl p-3 lg:p-6 bg-[#508f821e] border-1 border-[#508f8281]">
        <h2 className=" text-lg lg:text-2xl font-medium lg:mb-4">Filtros</h2>
        <div className="mt-2">
          <h3 className="lg:text-lg font-medium">Marca</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {inputsCheckboxBrands.map(input => {
              const selectedMarcas = searchParams.getAll("marca");
              const isChecked = selectedMarcas.includes(input.name);
              return (
                <InputCheckbox key={input.name} name={input.name} label={input.label} type={"marca"} onChange={handleFilter} isChecked={isChecked}/>
              )
            })}
          </div>
        </div>

        <div className="mt-2">
          <h3 className="lg:text-lg font-medium">Precio</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            <p onClick={()=> handleFilter("precio", "menor")} className={` cursor-pointer text-sm lg:text-base ${selectedPrice === "menor" ? "underline underline-offset-2" : null}`}>Hasta $1.500.000</p>
            <p onClick={()=> handleFilter("precio", "medio")} className={` cursor-pointer text-sm lg:text-base ${selectedPrice === "medio" ? "underline underline-offset-2" : null}`}>De $1.500.000 a $3.000.000</p>
            <p onClick={()=> handleFilter("precio", "mayor")} className={` cursor-pointer text-sm lg:text-base ${selectedPrice === "mayor" ? "underline underline-offset-2" : null}`}>Más de $3.000.000</p>
            <p onClick={()=> handleFilter("precio", "all")} className=" cursor-pointer text-sm lg:text-base">Mostrar todos</p>
          </div>
        </div>

        <div className="mt-2">
          <h3 className="lg:text-lg font-medium">Categoría</h3>
          <div className="flex flex-wrap gap-x-4 gap-y-1">
            {inputsCheckboxCategories.map(input => {
              const selectedCategory = searchParams.getAll("categoria");
              const isChecked = selectedCategory.includes(input.name);
              return (
                <InputCheckbox key={input.name} name={input.name} label={input.label} type={"categoria"} onChange={handleFilter} isChecked={isChecked}/>
              )
            })}
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Filters