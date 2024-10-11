"use client"
import {signIn,signOut} from 'next-auth/react';

export default function Home() {
  return (
    <div className='flex flex-col items-center justify-center h-screen'>
    <br/>
    <button onClick={()=>signIn()} className='bg-white text-black p-1 w-[10em]'>sign in</button>
    <br />
    <button onClick={()=>signOut()} className='bg-white text-black p-1 w-[10em]'>sign out</button>
    <br/>
    
    </div>
  )
}
