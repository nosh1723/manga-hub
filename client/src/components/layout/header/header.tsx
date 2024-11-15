'use client'

import useAuthStore from '@/stores/auth.store'
import Link from 'next/link'
import AvatarDropdown from './avatar-dropdown'
import SearchBarHeader from './search-bar-header'
import useWindowSize from '@/hooks/use-window-size'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Button } from '../../ui/button'
import { MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { SheetSide } from './top-sheet'

type Props = {
  isHeaderV2?: boolean
}

const Header = ({ isHeaderV2 }: Props) => {
  const router = useRouter()
  const { width } = useWindowSize()
  const { currentUser } = useAuthStore()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoading(false)
    }, 200)
    return () => clearTimeout(time)
  }, [])

  if (isLoading) {
    return <></>
  }
  return (
    <motion.header
      key={'header'}
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      className={`${isHeaderV2 ? 'relative' : 'sticky'} top-0 z-40 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-[#333333] border-b-[1px]`}>
      <nav className='container px-4 h-12 md:h-14 flex items-center' >
        <Link href={'/'}><h1 className='text-lg md:text-xl font-medium'>MangaHub</h1></Link>

        <div className='flex flex-1 gap-3 md:gap-5 justify-end items-center'>
          {width! < 640 ? 
          <SheetSide/> : <SearchBarHeader />} 
          {currentUser ? <AvatarDropdown currentUser={currentUser} /> :
            <Button
              className={`border border-[--dark-cus-800] bg-[--dark-cus-700] hover:bg-[--dark-cus-800] hover:bg-opacity-60 text-white ${currentUser ? "hidden" : "block"}`}
              onClick={() => router.push('/login')}
            >Login
            </Button>
          }

        </div>
      </nav >
    </motion.header >
  )
}

export default Header