import React from 'react'


const InputControl = (props) => {
  return (
    <div>    
      <input type={`${props.label}`} className='p-3 bg-white border-2 border-white my-1 rounded-lg text-white placeholder:text-[#2abfff] w-[100%]' {...props}/>
    </div>
  )
}

export default InputControl