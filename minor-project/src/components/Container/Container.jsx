import React from 'react'

function Container({children}) {
  return (
    <div className='w-full px-2 lg:px-10 bg-rose-50/30'>
      {children}
    </div>
  )
}

export default Container