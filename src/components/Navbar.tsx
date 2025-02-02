"use client";

import Link from 'next/link';
import React from 'react'

function Navbar() {
  return (
    <div className='flex w-full h-full p-2'>
        <div className='flex w-2/3 h-full pl-2'>
            <Link href='/' className='flex items-center justify-center w-max p-2 font-extrabold text-xl hover:bg-pink-300 rounded-md'>
                IMTOPD
            </Link>
        </div>
        <div className='flex w-1/2 h-full justify-end gap-2 items-center'>
            <Link href='/signup' className='flex h-max px-3 py-1 items-center justify-center hover:bg-pink-300 rounded-md font-bold text-lg hover:shadow-inner'>SignUp</Link>
            <Link href='/signin' className='flex h-max px-3 py-1 items-center justify-center hover:bg-pink-300 rounded-md font-bold text-lg hover:shadow-inner'>SignIn</Link>
        </div>
    </div>
  )
}

export default Navbar