import React from 'react'

const Button = ({children}) => {
  return (
    <button className='bg-brand rounded-lg px-3 py-2 text-darktext font-semibold'>
        {children}
    </button>
  )
}

export default Button