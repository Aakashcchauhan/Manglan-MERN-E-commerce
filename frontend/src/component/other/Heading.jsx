import React from 'react'

const Heading = ({ heading, paragraph }) => {
  return (
    <div className="mt-15 bg-gray-100 w-full py-8 flex flex-col justify-center items-center text-gray-800 border-b border-gray-300 shadow-sm">
      <h4 className="text-xs tracking-widest mb-1 font-medium text-gray-600">{paragraph}</h4>
      <h1 className="text-3xl font-bold tracking-tight">{heading}</h1>
    </div>
  )
}

export default Heading