"use client"

import { dateFormat } from "../utils/utils"
import StarRating from "./StarRating"
import { ThumbsUp, ThumbsDown } from 'lucide-react';
import defaultAvatar from "@/public/user.png"

const Comment = ({comment})=> {
  return (
    <div className="py-6 border-b-1 border-[#c2c2c2]">
      <div className="flex gap-3 items-center">
        <img 
          src={comment.avatar} 
          alt="avatar" 
          className="rounded-full w-12"
          onError={(e) => {
            e.currentTarget.onerror = null // evita bucles infinitos
            e.currentTarget.src = defaultAvatar.src // asigna la imagen local
          }}
        />
        <div className="space-y-1">
          <p className="font-medium">{comment.usuario}</p>
          <StarRating rating={comment.estrellas} size={13}/>
        </div>
      </div>

      <p className="text-[#616161] my-3">{comment.comentario}</p>

      <div className="text-[#616161] text-sm flex gap-6">
        <p>{dateFormat(comment.fecha)}</p>
        <div className="flex items-center gap-1">
          <ThumbsUp color="#616161" size={16}/>
          <p>{comment.likes}</p>
        </div>
        <div className="flex items-center gap-1">
          <ThumbsDown color="#616161" size={16}/>
          <p>{comment.dislikes}</p>
        </div>
      </div>
    </div>
  )
}

export default Comment