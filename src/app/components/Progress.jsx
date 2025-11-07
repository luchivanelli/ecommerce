const Progress = ({stars, numberReviews, totalReviews})=> {
  const percentage = Math.round((numberReviews / totalReviews) * 100) + "%"

  return (
    <div className="flex gap-2 lg:gap-3 justify-center items-center py-0.5 text-sm lg:text-base">
      <p className="w-3">{stars}</p>
      <div className="w-full bg-gray-200 rounded-full h-2.5">
        <div className="bg-[#508f82] h-2.5 rounded-full" style={{ width: percentage }}></div>
      </div>
      <p className="w-[110px]">{numberReviews} {numberReviews > 1 ? "reseñas" : "reseña"}</p>
    </div>
  )
}

export default Progress