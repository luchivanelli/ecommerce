import { Ban } from 'lucide-react';

const ErrorPage = ()=> {
  return (
    <main className='p-3 lg:p-6 max-w-[1000px] mx-auto'>
      <div className='bg-[#e021311f] border-1 border-[#e0213149] rounded-md p-6 flex flex-col items-center'>
        <div className='flex justify-center mb-4'>
          <Ban color='#e02130' className='w-[36px] h-[36px] lg:w-[48px] lg:h-[48px] p-2 lg:p-3 inline-block bg-[#e0213149] rounded-full'/>
        </div>
        <h2 className="text-2xl lg:text-3xl font-semibold mb-3">Error al procesar el pago</h2>
        <p className='text-sm lg:text-base'>Lo sentimos, no hemos podido procesar tu pago. Por favor inténtelo de nuevo</p>
        <a href='/productos' className='text-sm lg:text-base bg-[#e021311f] border-1 border-[#e0213149] rounded-md font-medium py-2 px-4 mt-4 cursor-pointer hover:scale-[99%] transition-all'>Reintentar</a>
      </div>
    </main>
  )
}

export default ErrorPage