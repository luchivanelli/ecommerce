const InputCheckbox = ({ name, label, type, onChange, isChecked}) => {
  return (
    <div className="space-x-1 lg:space-x-2 flex">
      <input 
        type="checkbox" 
        name={name} 
        id={name} 
        onChange={(e)=> onChange(type, name, e)} 
        checked={isChecked}
        className="accent-[#508f82] cursor-pointer w-3 lg:w-3.5"/>
      <label htmlFor={name} className={`text-white cursor-pointer text-sm lg:text-base ${isChecked ? "underline underline-offset-2" : null}`}>{label}</label>
    </div>
  )
}

export default InputCheckbox