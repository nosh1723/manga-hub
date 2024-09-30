import { Button } from '@/components/ui/button'
import { ClockIcon } from '@radix-ui/react-icons'
import Image from 'next/image'
import Link from 'next/link'

type Props = {}

const DetailsManga = (props: Props) => {
    return (
        <div className='container px-40 mx-auto mt-14 flex flex-col items-center mb-20'>
            <div className='bg-gray-200 w-[1200px] rounded-t-lg'>
                <div className='relative w-full min-h-[730px]'>
                    <div className='absolute w-full h-[563px] z-10 bg-banner__main top-0 left-0'></div>
                    <Image
                        src='/image/sakamoto.jpg'
                        width={1200}
                        height={563}
                        alt='bg manga'
                        className='w-full rounded-t-lg absolute z-0'
                        objectFit='cover'
                    />
                    <div className='absolute z-20 left-10 bottom-5 flex'>
                        <Image
                            src='/image/sakamotox.jpg'
                            width={190}
                            height={270}
                            alt='bg card manga'
                            className='rounded-lg '
                        />
                        <div className='ml-4'>
                            <div className='mt-20'>
                                <span className='text-sm'>Suzuki Yuto</span>
                                <h2 className='font-bold text-xl line-clamp-1'>Sakamoto Days (FULL HD)</h2>
                            </div>
                            <div className='mt-3'>
                                <div className='flex items-center gap-1 text-black font-medium'>
                                    <ClockIcon width={17} height={17} className='-mt-[2px]' />
                                    <span>10 hours ago</span>
                                </div>
                                <div className='w-[900px] flex flex-wrap items-center gap-2 mt-2'>
                                    {[...Array(6)].map((i, index) => (<div key={index} className='flex-none px-3 bg-[--gray-cus-100] rounded-2xl text-black text-sm'>manga</div>))}

                                </div>
                                <div className='flex mt-3 gap-2'>
                                    <Button variant={'purple'} className='w-max px-5 py-[6px] text-sm h-auto'>Follow</Button>
                                    <Button variant={'gray'} className='w-max px-5 py-[6px] text-sm h-auto'>Start Reading</Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='w-[1200px] bg-white rounded-b-lg px-5 py-7 flex gap-8 text-black'>
                <div className='flex-[3]'>
                    <div className='p-4 bg-gray-200 rounded-md text-[--gray-cus-400] text-sm'>
                        <p className=''>Sakamoto Days kể về một sát thủ lừng lẫy trong thế giới ngầm là Sakamoto Taro. Tay nghề và sức mạnh của Sakamoto từng khiến cho mọi kẻ thù phải run sợ và không hề có địch thủ. Thế nhưng một ngày, anh lại gặp được một người phụ nữ và trót yêu cô ấy. Với lời thề sẽ không giết người nữa, Sakamoto từ bỏ làm sát thủ, kết hôn và có con. Kết cục, anh trở thành một người đàn ông có thân hình béo ú làm chủ cửa hàng tạp hóa.
                            Ngỡ rằng việc Sakamoto nghỉ hưu sẽ có một cuộc sống yên bình bên gia đình, nhưng hết sát thủ này đến sát thủ khác được thuê đến để lấy tính mạng của anh. Điều này đã đe dọa sự an toàn của vợ và con Sakamoto. Để có thể bảo vệ gia đình, Sakamoto đã phải bí mật chống chọi với các sát thủ và vẫn phải giữ lời hứa với vợ khi xưa là không được giết người. </p>
                    </div>
                    <div className='flex flex-col gap-1 mt-10'>
                        {[...Array(10)].map((i, index) => {
                            return <Link key={index} href={'/reading-manga'} className={`px-4 py-2 ${index % 2 === 0 ? "bg-gray-50" : "bg-gray-100"} flex items-center gap-3 hover:opacity-70`}>
                            <h3 className='uppercase text-md font-bold'>chap {index + 1}</h3>
                            <div className='flex flex-col'>
                                <h4 className='font-medium'>Title</h4>
                                <div className='text-sm text-[--gray-cus-400]'><span>10 hours ago</span> {" - "} <span>2.4k reads</span></div>
                            </div> 
                        </Link>
                        })}
                    </div>
                </div>
                <div className='flex-[1]'>
                    <h2 className='text-gray-600 uppercase font-medium'>Same author</h2>
                    <div className='flex flex-col mt-3'>
                        <div className='flex gap-2'>
                            <Image 
                                src={'/image/sakamotox.jpg'}
                                width={40}
                                height={50}
                                alt='bg manga same author'
                                className='rounded-md'
                            />
                            <div className='text-gray-600 text-sm font-medium'>
                                <h4>Blue lock</h4>
                                <div>
                                    <span>C. 200</span> {" - "}
                                    <span>10 months ago</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DetailsManga