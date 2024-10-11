"use client"
import React,{useEffect} from 'react'
import { useSession } from 'next-auth/react'

function page() {
    const session=useSession();
    useEffect(()=>{
        console.log(session);
    },[session]);
    console.log(session);
  return (
    <div className='w-full h-screen flex flex-col items-center justify-center'>
    <h1 className='text-3xl font-bold'>Welcome to Details Page</h1>


    <p className='font-bold text-white text-2xl mt-[2em]'>and You are</p>
    {
      JSON.stringify(session)
    }
    </div>
  )
}

export default page
