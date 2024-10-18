'use client'

import useAuthStore from '@/stores/auth.store'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import AvatarDropdown from '../common/avatar-dropdown'
import { Search } from '../common/search'
import { Button } from '../ui/button'

type Props = {}

const Header = (props: Props) => {
  const router = useRouter()
  const { currentUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false)
    }, 200)
    return () => clearTimeout(time)
  }, [])

  return (
    <header className='sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-[#333333] border-b-[1px]'>
      < nav className='container h-14 flex items-center' >
        <Link href={'/'}><h1 className='text-xl font-medium'>MangaHub</h1></Link>

        <div className='flex flex-1 gap-5 justify-end'>
          <Search className='w-[18rem]' />
          {currentUser ? <AvatarDropdown currentUser={currentUser} /> :
            <Button
              className={`border border-[--dark-cus-800] bg-[--dark-cus-700] hover:bg-[--dark-cus-800] hover:bg-opacity-60 text-white ${currentUser ? "hidden" : "block"}`}
              onClick={() => router.push('/login')}
            >Login
            </Button>
          }

        </div>
      </nav >
    </header >
  )
}

export default Header