import React from 'react'
import { Link } from 'react-router-dom'

const NotFound = () => {
  return (
    <div className='bg-primary w-full min-h-screen flex flex-col items-center justify-center'>
      <h1 className='text-7xl text-white font-black'>404</h1>
      <p className='text-2xl text-center text-white font-medium mt-10'>Vous vous êtes perdu ? Il n'y a rien à voir ici.</p>
      <div className="flex justify-end mt-2">
        <Link
          to="/"
          className="text-lg text-white font-medium bg-black px-4 py-1 mt-5"
        >
          Retour à l'accueil
        </Link>
      </div>
    </div>
  )
}

export default NotFound