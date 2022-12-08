import { Navbar } from 'flowbite-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import regrootLogo from '../public/regroot-logo.svg'
import Button from './Button'

const Header = () => {
  return (
   <nav className='sticky top-0 z-50 flex flex-row items-center justify-between w-full h-24 px-5 py-2 bg-brandbg'>
    <div className='w-48'>
        <Image width={200} src={regrootLogo}/>
    </div>
    <div className='flex-row items-center hidden gap-8 font-light text-white md:flex justify-evenly'>
        <Link className='hover:text-brand' href="/">Home</Link>
        <Link className='hover:text-brand' href="/">About</Link>
        <Link className='hover:text-brand' href="/">FAQ</Link>
    </div>
    <Button>List a Job</Button>
   </nav>
  )
}

export default Header