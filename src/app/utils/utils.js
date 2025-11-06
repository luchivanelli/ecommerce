export const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

export const categories = [
  {
    image: "https://img.freepik.com/foto-gratis/cuaderno-portatil-cafe-plantas-escritorio_9975-24557.jpg?t=st=1760737721~exp=1760741321~hmac=19576134643c1881492167ceb8b04a85e8419f9dcb5202bb9edaf516cb71054e&w=1060",
    title: "Laptops de oficina",
    description: "Ideales para tareas diarias y productividad.",
    url: `${baseUrl}/productos?categoria=oficina`
  },
  {
    image: "https://img.freepik.com/foto-gratis/jugador-alto-angulo-jugando-computadora-portatil_23-2149829167.jpg?t=st=1760737887~exp=1760741487~hmac=023b6ccd966eaa0129b81002e06969710d2961d6c32a1b6f8f4c0df34d8f3bb4&w=1480",
    title: "Laptops para gaming",
    description: "Potencia y rendimiento para juegos exigentes.",
    url: `${baseUrl}/productos?categoria=gamer`
  },
  {
    image: "https://img.freepik.com/foto-gratis/camara-fotografia-diseno-estudio-edicion-concepto_53876-23194.jpg?t=st=1760737950~exp=1760741550~hmac=bec40ae18776f8a6a4065e52961ba3c69565601b973e5a6c8ae17d831b5e7f9f&w=1060",
    title: "Laptops profesionales",
    description: "Para diseñadores, editores y creadores de contenido",
    url: `${baseUrl}/productos?categoria=diseño`
  },
]

export const inputsCheckboxBrands = [
  { name: "hp", label: "HP"},
  { name: "dell", label: "Dell"},
  { name: "lenovo", label: "Lenovo"},
  { name: "asus", label: "Asus"},
  { name: "acer", label: "Acer"},
  { name: "apple", label: "Apple"},
  { name: "msi", label: "MSI"},
  { name: "gigabyte", label: "Gigabyte"},
  { name: "razer", label: "Razer"},
  { name: "samsung", label: "Samsung"},
  { name: "lg", label: "LG"},
  { name: "microsoft", label: "Microsoft"},
  { name: "alienware", label: "Alienware"},
]

export const inputsCheckboxCategories = [
  { name: "ofertas", label: "Ofertas"},
  { name: "oficina", label: "Oficina"},
  { name: "gamer", label: "Gamer"},
  { name: "diseño", label: "Diseño"},
]

export const numberFormat = (number) => {
  return new Intl.NumberFormat('es-AR').format(number)
}

export const dateFormat = (date)=> {
  const formattedDate = new Date(date).toLocaleDateString("es-ES", {
    day: "numeric",
    month: "long",
    year: "numeric"
  });

  return formattedDate.toLowerCase()
}