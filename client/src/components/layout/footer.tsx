import Link from 'next/link'
import React from 'react'

type Props = {}

const Footer = (props: Props) => {
  return (
    <div className='border-t-[#333333] border-t-[1px]'>
      <div className='container py-10'>
        <Link href={'/'}>
          <h2 className='text-xl font-medium'>MangaHub</h2>
        </Link>
      </div>
    </div>
  )
}

export default Footer