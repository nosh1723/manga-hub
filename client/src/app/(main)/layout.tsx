'use client'
import Footer from '@/components/layout/footer'
import Header from '@/components/layout/header/header'
import Loading from '@/components/layout/loading'
import { LayoutProps } from '@/models'
import useHomeStore from '@/stores/home.store'
import { usePathname, useRouter } from 'next/navigation'
import { useEffect } from 'react'

const MainLayout = ({ children }: LayoutProps) => {
  const { isLoading, path } = useHomeStore()
  const router = useRouter()
  const pathName = usePathname()
  useEffect(() => {
    if (isLoading && path !== '') router.push(path)
  }, [path])
  return (
    <div>
      {isLoading ? <Loading /> :
        <>
          <Header isHeaderV2={pathName.includes('reading-manga')}/>
          {children}
          <Footer />
        </>
      }

    </div>
  )
}

export default MainLayout