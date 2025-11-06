import { DotLoader } from "react-spinners"

const Loader = () => {
  return (
    <div className="bg-[#508f82] h-screen w-full flex justify-center items-center loader">
      <DotLoader color="#fff"/>
    </div>
  )
}

export default Loader