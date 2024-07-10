import React from 'react'
import  CardDefault  from './CardDefault'

export default function Projects() {
  return (
    <div className='h-screen w-full bg-home-black flex flex-col justify-center items-center'>

    <div className='w-11/12 flex flex-wrap'>
      <CardDefault/>
      <CardDefault/>
      <CardDefault/>
    </div>

    </div>
  )
}
