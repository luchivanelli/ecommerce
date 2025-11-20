const SuccessPage = ()=> {
  return (
    <main className='p-3 lg:p-6 max-w-[1000px] mx-auto'>
      <div className='bg-[#508f821e] border-1 border-[#508f8281] rounded-md p-6 flex flex-col items-center'>
        <h2 className="text-2xl lg:text-3xl font-semibold mb-3">¡Pedido realizado con éxito!</h2>
        <p className='text-sm lg:text-lg font-semibold mb-2'>Tu compra se completó exitosamente</p>
        <p className='text-sm lg:text-base'>Agradecemos que hayas utilizado nuestra web y esperamos que la experiencia haya sido clara, rápida y sencilla.</p>
        <p className='text-sm lg:text-base'>Si tenés sugerencias o encontraste algún problema, me encantaría saberlo para seguir mejorando</p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <a href='mailito:lucianavanelli13@gmail.com' target="_blank" rel="noopener noreferrer" className='text-sm lg:text-base bg-[#508f821e] border-1 border-[#508f8281] rounded-md font-medium py-2 px-4 cursor-pointer hover:scale-[99%] transition-all'>Contáctame</a>
          <a href='/productos' className='text-sm lg:text-base bg-[#508f821e] border-1 border-[#508f8281] rounded-md font-medium py-2 px-4 cursor-pointer hover:scale-[99%] transition-all'>Volver a la tienda</a>
        </div>
      </div>
    </main>
  )
}

export default SuccessPage