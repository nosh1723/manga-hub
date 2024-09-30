'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { Search } from '../common/search'
import { Button } from '../ui/button'

type Props = {}
type NavList = {
  name: string,
  path: string
}

const Header = (props: Props) => {
  const router = useRouter()
  const pathName = usePathname()
  
  const navList: NavList[] = [
    {name: "Home", path: "/"},
    {name: "Manga", path: "/manga"},
    {name: "Anime", path: "/anime"},
    {name: "Note", path: "/note"},
    {name: "More", path: ""},
  ]
  return (
    <header className='sticky top-0 z-50 border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b-[#333333] border-b-[1px]'>
      <nav className='container h-14 flex items-center'>
        <Link href={'/'}><h1 className='text-xl font-medium'>MangaHub</h1></Link>

        <div className='flex gap-5 ml-10 text-sm text-[--gray-cus-300]'>
          {navList.map((i: NavList, index: number) => (
            <Link key={index} href={i.path} className={`hover:text-[#e9e9e9] ${pathName === i.path ? 'text-[#e9e9e9]' : ''}`}>{i.name}</Link>
          ))}
        </div>
        <div className='flex flex-1 gap-5 justify-end'>
          <Search className='w-[18rem]' />
          <Button
            className='border border-[--dark-cus-800] bg-[--dark-cus-700] hover:bg-[--dark-cus-800] hover:bg-opacity-60'
            onClick={() => router.push('/login')}
          >Login
          </Button>
        </div>
      </nav>
    </header>
  )
}

export default Header