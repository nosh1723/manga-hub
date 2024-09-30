import { LayoutProps } from '@/models'
import Image from 'next/image'
import React from 'react'
import Link from 'next/link'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

type Props = {}

const MainLayout = ({children}: LayoutProps) => {
  return (
    <div>
        <Header />
        {children}
        <Footer />
    </div>
  )
}

export default MainLayout