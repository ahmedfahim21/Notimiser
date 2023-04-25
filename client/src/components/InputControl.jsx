import React from 'react'


const InputControl = (props) => {
  return (
    <div>    
      <input type={`${props.label}`} className='p-4 bg-[#2ABFFF] border-2 border-white m-2 rounded-lg text-white placeholder:text-white w-[500px]' {...props}/>
    </div>
  )
}

export default InputControl